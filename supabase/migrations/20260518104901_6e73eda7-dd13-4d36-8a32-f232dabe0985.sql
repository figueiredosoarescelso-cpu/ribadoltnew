create schema if not exists private;

create or replace function private.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

grant usage on schema private to authenticated;
grant execute on function private.has_role(uuid, public.app_role) to authenticated;

alter policy "Admins read all investments" on public.investments
using (private.has_role(auth.uid(), 'admin'::public.app_role));

alter policy "Admins write investments" on public.investments
using (private.has_role(auth.uid(), 'admin'::public.app_role))
with check (private.has_role(auth.uid(), 'admin'::public.app_role));

alter policy "Admins manage leads" on public.leads
using (private.has_role(auth.uid(), 'admin'::public.app_role))
with check (private.has_role(auth.uid(), 'admin'::public.app_role));

alter policy "Admins read leads" on public.leads
using (private.has_role(auth.uid(), 'admin'::public.app_role));

alter policy "Admins read all obras" on public.obras
using (private.has_role(auth.uid(), 'admin'::public.app_role));

alter policy "Admins write obras" on public.obras
using (private.has_role(auth.uid(), 'admin'::public.app_role))
with check (private.has_role(auth.uid(), 'admin'::public.app_role));

alter policy "Admins write site settings" on public.site_settings
using (private.has_role(auth.uid(), 'admin'::public.app_role))
with check (private.has_role(auth.uid(), 'admin'::public.app_role));

alter policy "Admins can view all roles" on public.user_roles
using (private.has_role(auth.uid(), 'admin'::public.app_role));

alter policy "Admins manage roles" on public.user_roles
using (private.has_role(auth.uid(), 'admin'::public.app_role))
with check (private.has_role(auth.uid(), 'admin'::public.app_role));

alter policy "Admins delete media" on storage.objects
using ((bucket_id = 'media'::text) and private.has_role(auth.uid(), 'admin'::public.app_role));

alter policy "Admins list media" on storage.objects
using ((bucket_id = 'media'::text) and private.has_role(auth.uid(), 'admin'::public.app_role));

alter policy "Admins update media" on storage.objects
using ((bucket_id = 'media'::text) and private.has_role(auth.uid(), 'admin'::public.app_role));

alter policy "Admins upload media" on storage.objects
with check ((bucket_id = 'media'::text) and private.has_role(auth.uid(), 'admin'::public.app_role));

revoke execute on function public.has_role(uuid, public.app_role) from public;
revoke execute on function public.has_role(uuid, public.app_role) from anon;
revoke execute on function public.has_role(uuid, public.app_role) from authenticated;