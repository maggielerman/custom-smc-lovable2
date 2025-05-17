create table "public"."book_templates" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "description" text not null,
    "thumbnail_url" text,
    "pages" integer not null default 10,
    "age_range" text not null default '3-8'::text,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."book_templates" enable row level security;

create table "public"."books" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "title" text not null,
    "template_id" uuid not null,
    "content" jsonb not null default '{}'::jsonb,
    "user_id" uuid not null,
    "published" boolean not null default false,
    "cover_image_url" text
);


alter table "public"."books" enable row level security;

create table "public"."profiles" (
    "id" uuid not null,
    "username" text,
    "display_name" text,
    "avatar_url" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
);


alter table "public"."profiles" enable row level security;

CREATE UNIQUE INDEX book_templates_pkey ON public.book_templates USING btree (id);

CREATE UNIQUE INDEX books_pkey ON public.books USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX profiles_username_key ON public.profiles USING btree (username);

alter table "public"."book_templates" add constraint "book_templates_pkey" PRIMARY KEY using index "book_templates_pkey";

alter table "public"."books" add constraint "books_pkey" PRIMARY KEY using index "books_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."books" add constraint "books_template_id_fkey" FOREIGN KEY (template_id) REFERENCES book_templates(id) not valid;

alter table "public"."books" validate constraint "books_template_id_fkey";

alter table "public"."books" add constraint "books_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."books" validate constraint "books_user_id_fkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."profiles" add constraint "profiles_username_key" UNIQUE using index "profiles_username_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  INSERT INTO public.profiles (id, username, display_name)
  VALUES (new.id, LOWER(new.email), SPLIT_PART(new.email, '@', 1));
  RETURN new;
END;
$function$
;

grant delete on table "public"."book_templates" to "anon";

grant insert on table "public"."book_templates" to "anon";

grant references on table "public"."book_templates" to "anon";

grant select on table "public"."book_templates" to "anon";

grant trigger on table "public"."book_templates" to "anon";

grant truncate on table "public"."book_templates" to "anon";

grant update on table "public"."book_templates" to "anon";

grant delete on table "public"."book_templates" to "authenticated";

grant insert on table "public"."book_templates" to "authenticated";

grant references on table "public"."book_templates" to "authenticated";

grant select on table "public"."book_templates" to "authenticated";

grant trigger on table "public"."book_templates" to "authenticated";

grant truncate on table "public"."book_templates" to "authenticated";

grant update on table "public"."book_templates" to "authenticated";

grant delete on table "public"."book_templates" to "service_role";

grant insert on table "public"."book_templates" to "service_role";

grant references on table "public"."book_templates" to "service_role";

grant select on table "public"."book_templates" to "service_role";

grant trigger on table "public"."book_templates" to "service_role";

grant truncate on table "public"."book_templates" to "service_role";

grant update on table "public"."book_templates" to "service_role";

grant delete on table "public"."books" to "anon";

grant insert on table "public"."books" to "anon";

grant references on table "public"."books" to "anon";

grant select on table "public"."books" to "anon";

grant trigger on table "public"."books" to "anon";

grant truncate on table "public"."books" to "anon";

grant update on table "public"."books" to "anon";

grant delete on table "public"."books" to "authenticated";

grant insert on table "public"."books" to "authenticated";

grant references on table "public"."books" to "authenticated";

grant select on table "public"."books" to "authenticated";

grant trigger on table "public"."books" to "authenticated";

grant truncate on table "public"."books" to "authenticated";

grant update on table "public"."books" to "authenticated";

grant delete on table "public"."books" to "service_role";

grant insert on table "public"."books" to "service_role";

grant references on table "public"."books" to "service_role";

grant select on table "public"."books" to "service_role";

grant trigger on table "public"."books" to "service_role";

grant truncate on table "public"."books" to "service_role";

grant update on table "public"."books" to "service_role";

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

create policy "Anyone can view book templates"
on "public"."book_templates"
as permissive
for select
to public
using (true);


create policy "Only admins can modify book templates"
on "public"."book_templates"
as permissive
for all
to public
using ((auth.uid() IN ( SELECT profiles.id
   FROM profiles
  WHERE (profiles.username = 'admin'::text))));


create policy "Users can delete their own books"
on "public"."books"
as permissive
for delete
to public
using ((auth.uid() = user_id));


create policy "Users can insert their own books"
on "public"."books"
as permissive
for insert
to public
with check ((auth.uid() = user_id));


create policy "Users can update their own books"
on "public"."books"
as permissive
for update
to public
using ((auth.uid() = user_id));


create policy "Users can view their own books"
on "public"."books"
as permissive
for select
to public
using ((auth.uid() = user_id));


create policy "Users can create their own profile"
on "public"."profiles"
as permissive
for insert
to public
with check ((auth.uid() = id));


create policy "Users can update their own profile"
on "public"."profiles"
as permissive
for update
to public
using ((auth.uid() = id));


create policy "Users can view their own profile"
on "public"."profiles"
as permissive
for select
to public
using ((auth.uid() = id));



