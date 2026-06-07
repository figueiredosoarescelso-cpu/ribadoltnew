import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ImageUpload } from "@/components/admin/ImageUpload";

export const Route = createFileRoute("/_authenticated/admin/investimentos")({
  component: AdminInvestments,
});

type Inv = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  location: string;
  status: string;
  hero_image: string | null;
  description: string;
  highlights: string[];
  features: { label: string; value: string }[];
  gallery: string[];
  lat: number | null;
  lng: number | null;
  is_featured_home: boolean;
  sort_order: number;
  published: boolean;
};

function emptyInv(): Inv {
  return {
    id: "",
    slug: "",
    name: "",
    tagline: "",
    location: "",
    status: "",
    hero_image: "",
    description: "",
    highlights: [],
    features: [],
    gallery: [],
    lat: null,
    lng: null,
    is_featured_home: false,
    sort_order: 0,
    published: true,
  };
}

function AdminInvestments() {
  const [list, setList] = useState<Inv[]>([]);
  const [editing, setEditing] = useState<Inv | null>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    const { data, error } = await supabase
      .from("investments")
      .select("*")
      .order("sort_order");
    if (error) return toast.error(error.message);
    setList((data as any) || []);
  }
  useEffect(() => {
    load();
  }, []);

  async function save(override?: Inv) {
    const source = override ?? editing;
    if (!source) return;
    setSaving(true);
    const payload: any = { ...source };
    if (!payload.id) delete payload.id;
    const { error } = source.id
      ? await supabase.from("investments").update(payload).eq("id", source.id)
      : await supabase.from("investments").insert(payload);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Guardado");
    setEditing(null);
    load();
  }

  async function remove(id: string) {
    if (!confirm("Eliminar este investimento?")) return;
    const { error } = await supabase.from("investments").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Eliminado");
    load();
  }

  async function setFeatured(id: string) {
    await supabase.from("investments").update({ is_featured_home: false }).neq("id", id);
    const { error } = await supabase
      .from("investments")
      .update({ is_featured_home: true })
      .eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Destaque atualizado");
    load();
  }

  if (editing) return <Editor inv={editing} setInv={setEditing} save={save} saving={saving} />;

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="font-display text-3xl">Investimentos</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Gerir investimentos e escolher destaque da home.
          </p>
        </div>
        <button
          onClick={() => setEditing(emptyInv())}
          className="px-4 py-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest"
        >
          + Novo
        </button>
      </div>

      <div className="bg-background border border-border divide-y divide-border">
        {list.map((i) => (
          <div key={i.id} className="p-4 flex items-center gap-4">
            <div className="flex-1">
              <p className="font-semibold">
                {i.name}
                {i.is_featured_home && (
                  <span className="ml-2 text-[10px] uppercase tracking-widest bg-primary text-primary-foreground px-2 py-0.5">
                    Destaque
                  </span>
                )}
                {!i.published && (
                  <span className="ml-2 text-[10px] uppercase tracking-widest bg-muted px-2 py-0.5">
                    Rascunho
                  </span>
                )}
              </p>
              <p className="text-xs text-muted-foreground">
                /{i.slug} · {i.location}
              </p>
            </div>
            {!i.is_featured_home && (
              <button
                onClick={() => setFeatured(i.id)}
                className="text-xs text-muted-foreground hover:text-primary"
              >
                Marcar destaque
              </button>
            )}
            <button onClick={() => setEditing(i)} className="text-xs hover:text-primary">
              Editar
            </button>
            <button
              onClick={() => remove(i.id)}
              className="text-xs text-muted-foreground hover:text-destructive"
            >
              Eliminar
            </button>
          </div>
        ))}
        {list.length === 0 && (
          <p className="p-6 text-sm text-muted-foreground">Sem investimentos.</p>
        )}
      </div>
    </div>
  );
}

function Editor({
  inv,
  setInv,
  save,
  saving,
}: {
  inv: Inv;
  setInv: (i: Inv | null) => void;
  save: (override?: Inv) => void;
  saving: boolean;
}) {
  const u = <K extends keyof Inv>(k: K, v: Inv[K]) => setInv({ ...inv, [k]: v });

  // Uncontrolled textareas via refs — bypasses any React control issues
  // that were preventing Enter / space from registering.
  const highlightsRef = useRef<HTMLTextAreaElement>(null);
  const featuresRef = useRef<HTMLTextAreaElement>(null);
  const galleryRef = useRef<HTMLTextAreaElement>(null);

  const initialHighlights = (inv.highlights ?? []).join("\n");
  const initialFeatures = (inv.features ?? [])
    .map((f) => `${f.label} | ${f.value}`)
    .join("\n");
  const initialGallery = (inv.gallery ?? []).join("\n");

  function readDrafts(): Pick<Inv, "highlights" | "features" | "gallery"> {
    const hText = highlightsRef.current?.value ?? initialHighlights;
    const fText = featuresRef.current?.value ?? initialFeatures;
    const gText = galleryRef.current?.value ?? initialGallery;
    return {
      highlights: hText.split("\n").map((s) => s.trim()).filter(Boolean),
      features: fText
        .split("\n")
        .map((s) => {
          const [l, v] = s.split("|").map((x) => x?.trim() ?? "");
          return l && v ? { label: l, value: v } : null;
        })
        .filter(Boolean) as { label: string; value: string }[],
      gallery: gText.split("\n").map((s) => s.trim()).filter(Boolean),
    };
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="font-display text-3xl">
          {inv.id ? "Editar investimento" : "Novo investimento"}
        </h1>
        <button onClick={() => setInv(null)} className="text-xs text-muted-foreground">
          Cancelar
        </button>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Slug (URL)" value={inv.slug} onChange={(v) => u("slug", v)} />
        <Field label="Nome" value={inv.name} onChange={(v) => u("name", v)} />
        <Field label="Tagline" value={inv.tagline} onChange={(v) => u("tagline", v)} />
        <Field label="Localização" value={inv.location} onChange={(v) => u("location", v)} />
        <Field label="Estado (badge)" value={inv.status} onChange={(v) => u("status", v)} />
        <Field
          label="Ordem"
          type="number"
          value={String(inv.sort_order)}
          onChange={(v) => u("sort_order", Number(v) || 0)}
        />
        <Field
          label="Latitude"
          value={inv.lat?.toString() ?? ""}
          onChange={(v) => u("lat", v ? Number(v) : null)}
        />
        <Field
          label="Longitude"
          value={inv.lng?.toString() ?? ""}
          onChange={(v) => u("lng", v ? Number(v) : null)}
        />
      </div>

      <div>
        <Label>Hero image</Label>
        <ImageUpload
          value={inv.hero_image}
          onChange={(url) => u("hero_image", url)}
          folder="investments"
        />
      </div>

      <div>
        <Label>Descrição</Label>
        <textarea
          defaultValue={inv.description}
          onBlur={(e) => u("description", e.target.value)}
          rows={6}
          className="w-full px-3 py-2 border border-border text-sm bg-background"
        />
      </div>

      <div>
        <Label>Destaques (um por linha)</Label>
        <textarea
          ref={highlightsRef}
          defaultValue={initialHighlights}
          rows={5}
          className="w-full px-3 py-2 border border-border text-sm bg-background"
        />
      </div>

      <div>
        <Label>Características (formato: rótulo | valor — uma por linha)</Label>
        <textarea
          ref={featuresRef}
          defaultValue={initialFeatures}
          rows={5}
          className="w-full px-3 py-2 border border-border text-sm bg-background"
        />
      </div>

      <div>
        <Label>Galeria (URLs, uma por linha) — use upload abaixo para gerar URLs</Label>
        <textarea
          ref={galleryRef}
          defaultValue={initialGallery}
          rows={4}
          className="w-full px-3 py-2 border border-border text-sm bg-background font-mono"
        />
        <div className="mt-2">
          <ImageUpload
            value=""
            onChange={(url) => {
              const el = galleryRef.current;
              if (el) {
                el.value = el.value ? `${el.value}\n${url}` : url;
              }
            }}
            folder="gallery"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={inv.published}
          onChange={(e) => u("published", e.target.checked)}
        />
        Publicado
      </label>

      <div className="flex gap-3 pt-4 border-t border-border">
        <button
          onClick={() => {
            const drafts = readDrafts();
            save({ ...inv, ...drafts });
          }}
          disabled={saving}
          className="px-6 py-3 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest disabled:opacity-50"
        >
          {saving ? "A guardar…" : "Guardar"}
        </button>
        <button onClick={() => setInv(null)} className="px-6 py-3 text-xs">
          Cancelar
        </button>
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[11px] uppercase tracking-widest font-bold mb-2">
      {children}
    </label>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-border text-sm bg-background"
      />
    </div>
  );
}
