create table public.families (
    id uuid not null default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    name text not null,
    structure text not null,
    members jsonb not null default '[]'::jsonb,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone not null default now()
);

alter table public.families enable row level security;

alter table public.families add constraint families_pkey primary key (id);

grant select, insert, update, delete on table public.families to anon;
grant select, insert, update, delete on table public.families to authenticated;
grant select, insert, update, delete on table public.families to service_role;

create policy "User can manage own families" on public.families
as permissive for all
to public
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
