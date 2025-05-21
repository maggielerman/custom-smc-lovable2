-- Add contributor flag to profiles
alter table profiles
  add column is_contributor boolean not null default false;

-- Create blog_posts table
create table public.blog_posts (
    id uuid not null default gen_random_uuid(),
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now(),
    title text not null,
    content text not null,
    user_id uuid not null,
    published boolean not null default false
);

alter table public.blog_posts enable row level security;

alter table public.blog_posts add constraint blog_posts_pkey primary key (id);
alter table public.blog_posts add constraint blog_posts_user_id_fkey foreign key (user_id) references auth.users(id) on delete cascade;

-- Grants
grant select, insert, update, delete on table public.blog_posts to anon;
grant select, insert, update, delete on table public.blog_posts to authenticated;
grant select, insert, update, delete on table public.blog_posts to service_role;

-- Policies
create policy "Contributors can view their posts" on public.blog_posts
as permissive for select
to public
using (
  auth.uid() = user_id and exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_contributor)
);

create policy "Contributors can insert posts" on public.blog_posts
as permissive for insert
to public
with check (
  auth.uid() = user_id and exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_contributor)
);

create policy "Contributors can update their posts" on public.blog_posts
as permissive for update
to public
using (
  auth.uid() = user_id and exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_contributor)
);

create policy "Contributors can delete their posts" on public.blog_posts
as permissive for delete
to public
using (
  auth.uid() = user_id and exists (select 1 from public.profiles p where p.id = auth.uid() and p.is_contributor)
);
