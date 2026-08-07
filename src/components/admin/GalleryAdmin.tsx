"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Category = {
  category_id: string;
  category_name: string;
};

type GalleryItem = {
  id: string;
  title: string;
  image_url: string;
  category_id: string;
  category: { category_name: string } | null;
};

type FormState = {
  title: string;
  categoryId: string;
};

const EMPTY_FORM: FormState = { title: "", categoryId: "" };

const STORAGE_PUBLIC_PREFIX = "/storage/v1/object/public/gallery/";

function storagePathFromUrl(url: string): string | null {
  const index = url.indexOf(STORAGE_PUBLIC_PREFIX);
  if (index === -1) return null;
  return url.slice(index + STORAGE_PUBLIC_PREFIX.length);
}

export function GalleryAdmin() {
  const supabase = useMemo(() => createClient(), []);
  const [categories, setCategories] = useState<Category[]>([]);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loadStatus, setLoadStatus] = useState<"loading" | "error" | "ready">(
    "loading"
  );

  const [formOpen, setFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [file, setFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setFilePreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setFilePreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const loadAll = async () => {
    setLoadStatus("loading");
    const [categoriesRes, itemsRes] = await Promise.all([
      supabase.from("category").select("category_id, category_name"),
      supabase
        .from("gallery")
        .select("id, title, image_url, category_id, category(category_name)")
        .order("created_at", { ascending: false }),
    ]);

    if (categoriesRes.error || itemsRes.error) {
      setLoadStatus("error");
      return;
    }

    setCategories(categoriesRes.data ?? []);
    setItems((itemsRes.data as unknown as GalleryItem[]) ?? []);
    setLoadStatus("ready");
  };

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openCreateForm = () => {
    setEditingItem(null);
    setForm(EMPTY_FORM);
    setFile(null);
    setFormError(null);
    setFormOpen(true);
  };

  const openEditForm = (item: GalleryItem) => {
    setEditingItem(item);
    setForm({ title: item.title, categoryId: item.category_id });
    setFile(null);
    setFormError(null);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingItem(null);
    setForm(EMPTY_FORM);
    setFile(null);
    setFormError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!form.title.trim() || !form.categoryId) {
      setFormError("Please fill in the title and category.");
      return;
    }
    if (!editingItem && !file) {
      setFormError("Please choose a photo to upload.");
      return;
    }

    setSaving(true);

    let imageUrl = editingItem?.image_url ?? "";
    if (file) {
      const path = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(path, file);

      if (uploadError) {
        setFormError(uploadError.message);
        setSaving(false);
        return;
      }

      imageUrl = supabase.storage.from("gallery").getPublicUrl(path).data
        .publicUrl;
    }

    const payload = {
      title: form.title.trim(),
      category_id: form.categoryId,
      image_url: imageUrl,
    };

    const { error } = editingItem
      ? await supabase.from("gallery").update(payload).eq("id", editingItem.id)
      : await supabase.from("gallery").insert(payload);

    setSaving(false);

    if (error) {
      setFormError(error.message);
      return;
    }

    closeForm();
    loadAll();
  };

  const handleDelete = async (item: GalleryItem) => {
    if (!window.confirm(`Delete "${item.title}" from the gallery?`)) return;

    setDeletingId(item.id);

    const path = storagePathFromUrl(item.image_url);
    if (path) {
      // Best-effort: seeded rows point at external URLs with no matching
      // storage object, so this silently no-ops for those.
      await supabase.storage.from("gallery").remove([path]);
    }

    const { error } = await supabase.from("gallery").delete().eq("id", item.id);
    setDeletingId(null);

    if (!error) {
      setItems((rows) => rows.filter((row) => row.id !== item.id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Photos shown here appear in the site&rsquo;s public gallery.
        </p>
        <button
          onClick={openCreateForm}
          className="flex items-center gap-2 rounded-full bg-salon-dark px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-black"
        >
          <Plus size={16} /> Add Photo
        </button>
      </div>

      {formOpen && (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-salon-dark">
              {editingItem ? "Edit Photo" : "New Photo"}
            </h2>
            <button
              type="button"
              onClick={closeForm}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          </div>

          {formError && (
            <div
              role="alert"
              className="mb-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {formError}
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                required
                className="w-full rounded-lg border border-gray-200 p-2.5 focus:border-salon-gold focus:outline-none"
                placeholder="Balayage Finish"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                value={form.categoryId}
                onChange={(e) =>
                  setForm((f) => ({ ...f, categoryId: e.target.value }))
                }
                required
                className="w-full rounded-lg border border-gray-200 p-2.5 focus:border-salon-gold focus:outline-none"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((c) => (
                  <option key={c.category_id} value={c.category_id}>
                    {c.category_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Photo{editingItem ? " (leave empty to keep current)" : ""}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                className="w-full rounded-lg border border-gray-200 p-2 text-sm focus:border-salon-gold focus:outline-none"
              />
            </div>
          </div>

          {(filePreviewUrl || editingItem?.image_url) && (
            <div className="mt-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={filePreviewUrl ?? editingItem!.image_url}
                alt="Preview"
                className="h-32 w-32 rounded-lg object-cover"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="mt-5 rounded-full bg-salon-dark px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? "Saving…"
              : editingItem
                ? "Save Changes"
                : "Add Photo"}
          </button>
        </form>
      )}

      {loadStatus === "loading" && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div
              key={idx}
              className="aspect-square animate-pulse rounded-2xl bg-gray-100"
            />
          ))}
        </div>
      )}

      {loadStatus === "error" && (
        <p className="text-sm text-red-600">
          Couldn&apos;t load the gallery right now. Please refresh.
        </p>
      )}

      {loadStatus === "ready" && items.length === 0 && (
        <p className="text-sm text-gray-500">No photos yet.</p>
      )}

      {loadStatus === "ready" && items.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square overflow-hidden rounded-2xl border border-gray-100"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image_url}
                alt={item.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-between bg-black/0 p-3 opacity-0 transition-all duration-200 group-hover:bg-black/50 group-hover:opacity-100">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => openEditForm(item)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-700 hover:text-salon-dark"
                    aria-label={`Edit ${item.title}`}
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    disabled={deletingId === item.id}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-700 hover:text-red-600 disabled:cursor-wait disabled:opacity-60"
                    aria-label={`Delete ${item.title}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <div>
                  <p className="truncate text-sm font-medium text-white">
                    {item.title}
                  </p>
                  <p className="truncate text-xs text-white/80">
                    {item.category?.category_name ?? "—"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
