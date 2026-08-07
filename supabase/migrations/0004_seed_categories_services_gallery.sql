-- =====================================================================
-- Seed data: category, services, gallery
-- Run in the Supabase SQL Editor. Safe to re-run -- each insert is
-- guarded with "where not exists" so it won't create duplicates.
-- =====================================================================

-- ---------------------------------------------------------------------
-- category
-- ---------------------------------------------------------------------
insert into public.category (category_name, category_description)
select 'Hair', 'Cuts, color, and styling'
where not exists (select 1 from public.category where category_name = 'Hair');

insert into public.category (category_name, category_description)
select 'Skin', 'Facials and skincare treatments'
where not exists (select 1 from public.category where category_name = 'Skin');

insert into public.category (category_name, category_description)
select 'Nails', 'Manicures and pedicures'
where not exists (select 1 from public.category where category_name = 'Nails');

insert into public.category (category_name, category_description)
select 'Makeup', 'Bridal and event makeup'
where not exists (select 1 from public.category where category_name = 'Makeup');

insert into public.category (category_name, category_description)
select 'Salon', 'Studio atmosphere and amenities'
where not exists (select 1 from public.category where category_name = 'Salon');

-- ---------------------------------------------------------------------
-- services
-- ---------------------------------------------------------------------
insert into public.services (category_id, service_name, duration_minutes, price)
select (select category_id from public.category where category_name = 'Hair'),
       'Signature Haircut & Styling', 60, 3500
where not exists (select 1 from public.services where service_name = 'Signature Haircut & Styling');

insert into public.services (category_id, service_name, duration_minutes, price)
select (select category_id from public.category where category_name = 'Hair'),
       'Reborn Color Treatment', 120, 12000
where not exists (select 1 from public.services where service_name = 'Reborn Color Treatment');

insert into public.services (category_id, service_name, duration_minutes, price)
select (select category_id from public.category where category_name = 'Hair'),
       'Balayage Highlights', 150, 18000
where not exists (select 1 from public.services where service_name = 'Balayage Highlights');

insert into public.services (category_id, service_name, duration_minutes, price)
select (select category_id from public.category where category_name = 'Skin'),
       'Radiance Facial', 60, 6000
where not exists (select 1 from public.services where service_name = 'Radiance Facial');

insert into public.services (category_id, service_name, duration_minutes, price)
select (select category_id from public.category where category_name = 'Skin'),
       'Deep Cleansing Facial', 45, 4500
where not exists (select 1 from public.services where service_name = 'Deep Cleansing Facial');

insert into public.services (category_id, service_name, duration_minutes, price)
select (select category_id from public.category where category_name = 'Nails'),
       'Luxury Gel Manicure', 45, 3000
where not exists (select 1 from public.services where service_name = 'Luxury Gel Manicure');

insert into public.services (category_id, service_name, duration_minutes, price)
select (select category_id from public.category where category_name = 'Nails'),
       'Classic Pedicure', 50, 3500
where not exists (select 1 from public.services where service_name = 'Classic Pedicure');

insert into public.services (category_id, service_name, duration_minutes, price)
select (select category_id from public.category where category_name = 'Makeup'),
       'Bridal Makeup', 120, 15000
where not exists (select 1 from public.services where service_name = 'Bridal Makeup');

insert into public.services (category_id, service_name, duration_minutes, price)
select (select category_id from public.category where category_name = 'Makeup'),
       'Evening Glam Makeup', 60, 8000
where not exists (select 1 from public.services where service_name = 'Evening Glam Makeup');

-- ---------------------------------------------------------------------
-- gallery
-- Reuses photo IDs already live elsewhere in this repo (Gallery.tsx,
-- data/services.ts, components/About.tsx) rather than unverified ones.
-- ---------------------------------------------------------------------
insert into public.gallery (category_id, title, image_url)
select (select category_id from public.category where category_name = 'Hair'),
       'Balayage Finish',
       'https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80'
where not exists (select 1 from public.gallery where title = 'Balayage Finish');

insert into public.gallery (category_id, title, image_url)
select (select category_id from public.category where category_name = 'Salon'),
       'Studio Interior',
       'https://images.unsplash.com/photo-1600948836101-f9ffda59d250?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80'
where not exists (select 1 from public.gallery where title = 'Studio Interior');

insert into public.gallery (category_id, title, image_url)
select (select category_id from public.category where category_name = 'Skin'),
       'Radiance Facial Session',
       'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80'
where not exists (select 1 from public.gallery where title = 'Radiance Facial Session');

insert into public.gallery (category_id, title, image_url)
select (select category_id from public.category where category_name = 'Salon'),
       'Reception Lounge',
       'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80'
where not exists (select 1 from public.gallery where title = 'Reception Lounge');

insert into public.gallery (category_id, title, image_url)
select (select category_id from public.category where category_name = 'Nails'),
       'Gel Manicure Set',
       'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80'
where not exists (select 1 from public.gallery where title = 'Gel Manicure Set');

insert into public.gallery (category_id, title, image_url)
select (select category_id from public.category where category_name = 'Makeup'),
       'Bridal Look',
       'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80'
where not exists (select 1 from public.gallery where title = 'Bridal Look');

insert into public.gallery (category_id, title, image_url)
select (select category_id from public.category where category_name = 'Skin'),
       'Spa Relaxation',
       'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80'
where not exists (select 1 from public.gallery where title = 'Spa Relaxation');

insert into public.gallery (category_id, title, image_url)
select (select category_id from public.category where category_name = 'Hair'),
       'Style Consultation',
       'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80'
where not exists (select 1 from public.gallery where title = 'Style Consultation');
