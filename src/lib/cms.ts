import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { investments as staticInvs, type Investment } from "@/data/investments";
import { obras as staticObras, type Obra } from "@/data/obras";

// Fallback maps using existing static images by slug/name
const invFallback = new Map(
  staticInvs.map((i) => [i.slug, { hero: i.heroImage, gallery: i.gallery }])
);
const obrasFallback = new Map(staticObras.map((o) => [o.name, o.image]));

type InvestmentRow = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  location: string;
  status: string;
  hero_image: string | null;
  description: string;
  highlights: unknown;
  features: unknown;
  gallery: unknown;
  lat: number | null;
  lng: number | null;
  featured: boolean;
  is_featured_home: boolean;
  sort_order: number;
  published: boolean;
};

function rowToInvestment(row: InvestmentRow): Investment {
  const fb = invFallback.get(row.slug);
  const gallery = Array.isArray(row.gallery) && row.gallery.length
    ? (row.gallery as string[])
    : fb?.gallery ?? [];
  return {
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    location: row.location,
    status: row.status,
    heroImage: row.hero_image || fb?.hero || gallery[0] || "",
    gallery,
    description: row.description,
    highlights: Array.isArray(row.highlights) ? (row.highlights as string[]) : [],
    features: Array.isArray(row.features)
      ? (row.features as { label: string; value: string }[])
      : [],
    coordinates: { lat: Number(row.lat) || 0, lng: Number(row.lng) || 0 },
    featured: !!row.is_featured_home,
  };
}

export const publicInvestmentsQueryOptions = queryOptions({
  queryKey: ["public-investments"],
  queryFn: async (): Promise<Investment[]> => {
    const { data, error } = await supabase
      .from("investments")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    const rows = ((data as InvestmentRow[]) || []).map(rowToInvestment);
    return rows.length ? rows : staticInvs;
  },
});

export function useInvestments() {
  return useSuspenseQuery(publicInvestmentsQueryOptions);
}

export function useFeaturedInvestment() {
  const { data } = useInvestments();
  return data.find((i) => i.featured) ?? data[0];
}

export function useFeaturedHomeSlug() {
  return useSuspenseQuery({
    queryKey: ["featured-home-slug"],
    queryFn: async (): Promise<string> => {
      const { data } = await supabase
        .from("investments")
        .select("slug")
        .eq("is_featured_home", true)
        .eq("published", true)
        .maybeSingle();
      return data?.slug ?? staticInvs[0].slug;
    },
  });
}

export type ObraPublic = Obra & { is_featured_home: boolean };

export const publicObrasQueryOptions = queryOptions({
  queryKey: ["public-obras"],
  queryFn: async (): Promise<ObraPublic[]> => {
    const { data, error } = await supabase
      .from("obras")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    const rows = ((data as any[]) || []).map((r) => ({
      id: r.id,
      name: r.name,
      location: r.location,
      year: r.year,
      status: r.status,
      image: r.image || obrasFallback.get(r.name) || staticObras[0].image,
      description: r.description,
      is_featured_home: !!r.is_featured_home,
    }));
    return rows.length ? rows : staticObras.map((o) => ({ ...o, is_featured_home: true }));
  },
});

export function useObras() {
  return useSuspenseQuery(publicObrasQueryOptions);
}

export function useFeaturedObras() {
  const { data } = useObras();
  return data.filter((o) => o.is_featured_home);
}

export const siteSettingsQueryOptions = queryOptions({
  queryKey: ["site-settings"],
  queryFn: async (): Promise<Record<string, string>> => {
    const { data, error } = await supabase.from("site_settings").select("key,value");
    if (error) throw error;
    const out: Record<string, string> = {};
    for (const row of (data as { key: string; value: string }[]) || []) {
      out[row.key] = row.value;
    }
    return out;
  },
});

export function useSiteSettings() {
  return useSuspenseQuery(siteSettingsQueryOptions);
}

/** Returns a getter that falls back to `fallback` when the setting is empty/missing. */
export function useSettingsGetter() {
  const { data } = useSiteSettings();
  return (key: string, fallback = "") => {
    const v = data?.[key];
    return v && v.trim().length ? v : fallback;
  };
}
