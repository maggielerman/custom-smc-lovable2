-- Add featured_image_url column to blog_posts
alter table blog_posts
  add column featured_image_url text;

-- Create storage bucket for blog images
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true);
