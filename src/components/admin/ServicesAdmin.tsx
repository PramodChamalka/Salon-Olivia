"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Pencil, Plus, Trash2, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Category = {
  category_id: string;
  category_name: string;
};

type Service = {
  service_id: string;
  service_name: string;
  duration_minutes: number;
  price: number;
  category_id: string;
  category: { category_name: string } | null;
};

type FormState = {
  serviceName: string;
  categoryId: string;
  durationMinutes: string;
  price: string;
};

const EMPTY_FORM: FormState = {
  serviceName: "",
  categoryId: "",
  durationMinutes: "",
  price: "",
};

export function ServicesAdmin() {
  const supabase = useMemo(() => createClient(), []);
  const [categories, setCategories] = useState<Category[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loadStatus, setLoadStatus] = useState<"loading" | "error" | "ready">(
    "loading"
  );

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadAll = async () => {
    setLoadStatus("loading");
    const [categoriesRes, servicesRes] = await Promise.all([
      supabase.from("category").select("category_id, category_name"),
      supabase
        .from("services")
        .select(
          "service_id, service_name, duration_minutes, price, category_id, category(category_name)"
        )
        .order("service_name"),
    ]);

    if (categoriesRes.error || servicesRes.error) {
      setLoadStatus("error");
      return;
    }

    setCategories(categoriesRes.data ?? []);
    setServices((servicesRes.data as unknown as Service[]) ?? []);
    setLoadStatus("ready");
  };

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openCreateForm = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setFormOpen(true);
  };

  const openEditForm = (service: Service) => {
    setEditingId(service.service_id);
    setForm({
      serviceName: service.service_name,
      categoryId: service.category_id,
      durationMinutes: String(service.duration_minutes),
      price: String(service.price),
    });
    setFormError(null);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const durationMinutes = Number(form.durationMinutes);
    const price = Number(form.price);

    if (!form.serviceName.trim() || !form.categoryId) {
      setFormError("Please fill in the service name and category.");
      return;
    }
    if (!Number.isFinite(durationMinutes) || durationMinutes <= 0) {
      setFormError("Duration must be a positive number of minutes.");
      return;
    }
    if (!Number.isFinite(price) || price < 0) {
      setFormError("Price must be a positive number.");
      return;
    }

    setSaving(true);
    const payload = {
      service_name: form.serviceName.trim(),
      category_id: form.categoryId,
      duration_minutes: durationMinutes,
      price,
    };

    const { error } = editingId
      ? await supabase
          .from("services")
          .update(payload)
          .eq("service_id", editingId)
      : await supabase.from("services").insert(payload);

    setSaving(false);

    if (error) {
      setFormError(error.message);
      return;
    }

    closeForm();
    loadAll();
  };

  const handleDelete = async (service: Service) => {
    if (
      !window.confirm(
        `Delete "${service.service_name}"? Existing appointments referencing it will keep their history but lose the service link.`
      )
    ) {
      return;
    }

    setDeletingId(service.service_id);
    const { error } = await supabase
      .from("services")
      .delete()
      .eq("service_id", service.service_id);
    setDeletingId(null);

    if (!error) {
      setServices((rows) =>
        rows.filter((row) => row.service_id !== service.service_id)
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Services shown here populate the booking form&rsquo;s "Preferred
          Service" list.
        </p>
        <button
          onClick={openCreateForm}
          className="flex items-center gap-2 rounded-full bg-salon-dark px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-black"
        >
          <Plus size={16} /> Add Service
        </button>
      </div>

      {formOpen && (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-lg font-bold text-salon-dark">
              {editingId ? "Edit Service" : "New Service"}
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
                Service Name
              </label>
              <input
                value={form.serviceName}
                onChange={(e) =>
                  setForm((f) => ({ ...f, serviceName: e.target.value }))
                }
                required
                className="w-full rounded-lg border border-gray-200 p-2.5 focus:border-salon-gold focus:outline-none"
                placeholder="Signature Haircut & Styling"
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
                Duration (minutes)
              </label>
              <input
                type="number"
                min={1}
                value={form.durationMinutes}
                onChange={(e) =>
                  setForm((f) => ({ ...f, durationMinutes: e.target.value }))
                }
                required
                className="w-full rounded-lg border border-gray-200 p-2.5 focus:border-salon-gold focus:outline-none"
                placeholder="60"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Price (LKR)
              </label>
              <input
                type="number"
                min={0}
                step="0.01"
                value={form.price}
                onChange={(e) =>
                  setForm((f) => ({ ...f, price: e.target.value }))
                }
                required
                className="w-full rounded-lg border border-gray-200 p-2.5 focus:border-salon-gold focus:outline-none"
                placeholder="3500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="mt-5 rounded-full bg-salon-dark px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving…" : editingId ? "Save Changes" : "Add Service"}
          </button>
        </form>
      )}

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
              <th className="p-4 font-medium">Service</th>
              <th className="p-4 font-medium">Category</th>
              <th className="p-4 font-medium">Duration</th>
              <th className="p-4 font-medium">Price</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loadStatus === "loading" &&
              Array.from({ length: 4 }).map((_, idx) => (
                <tr key={idx}>
                  <td className="p-4" colSpan={5}>
                    <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
                  </td>
                </tr>
              ))}

            {loadStatus === "error" && (
              <tr>
                <td className="p-4 text-sm text-red-600" colSpan={5}>
                  Couldn&apos;t load services right now. Please refresh.
                </td>
              </tr>
            )}

            {loadStatus === "ready" && services.length === 0 && (
              <tr>
                <td className="p-4 text-sm text-gray-500" colSpan={5}>
                  No services yet.
                </td>
              </tr>
            )}

            {loadStatus === "ready" &&
              services.map((service) => (
                <tr
                  key={service.service_id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-4 text-sm font-medium text-gray-900">
                    {service.service_name}
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {service.category?.category_name ?? "—"}
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {service.duration_minutes} min
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    LKR {Number(service.price).toLocaleString()}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => openEditForm(service)}
                        className="text-gray-400 hover:text-salon-dark"
                        aria-label={`Edit ${service.service_name}`}
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(service)}
                        disabled={deletingId === service.service_id}
                        className="text-gray-400 hover:text-red-600 disabled:cursor-wait disabled:opacity-60"
                        aria-label={`Delete ${service.service_name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
