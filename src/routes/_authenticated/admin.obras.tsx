import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ImageUpload } from "@/components/admin/ImageUpload";

export const Route = createFileRoute("/_authenticated/admin/obras")({
  component: AdminObras,
});

type Obra = {
  id: string;
  name: string;
  location: string;
  year: string;
  status: string;
  image: string | null;
  description: string;
  sort_order: number;
  published: boolean;
  is_featured_home: boolean;
};

const empty = (): Obra => ({
  id: "",
  name: "",
  location: "",
  year: "",
  status: "",
  image: "",
  description: "",
  sort_order: 0,
  published: true,
  is_featured_home: false,
});

function AdminObras() {
  const [list, setList] = useState<Obra[]>([]);
  const [edit, setEdit] = useState<Obra | null>(null);

  async function load() {
    const { data, error } = await supabase.from("obras").select("*").order("sort_order");
    if (error) return toast.error(error.message);
    setList((data as any) || []);
  }
  useEffect(() => {
    load();
  }, []);

  async function save() {
    if (!edit) return;
    const p = { ...edit };
    if (!p.id) delete (p as any).id;
    const { error } = p.id
      ? await supabase.from("obras").update(p).eq("id", p.id)
      : await supabase.from("obras").insert(p);
    if (error) return toast.error(error.message);
    toast.success("Guardado");
    setEdit(null);
    load();
  }

  async function remove(id: string) {
    if (!confirm("Eliminar obra?")) return;
    const { error } = await supabase.from("obras").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  }

  if (edit) {
    const u = <K extends keyof Obra>(k: K, v: Obra[K]) => setEdit({ ...edit, [k]: v });
    return (
      <div className="space-y-4">
        <h1 className="font-display text-3xl">{edit.id ? "Editar obra" : "Nova obra"}</h1>
        <div className="grid sm:grid-cols-2 gap-4">
          <F label="Nome" v={edit.name} on={(v) => u("name", v)} />
          <F label="Localização" v={edit.location} on={(v) => u("location", v)} />
          <F label="Ano" v={edit.year} on={(v) => u("year", v)} />
          <F label="Estado" v={edit.status} on={(v) => u("status", v)} />
          <F
            label="Ordem"
            v={String(edit.sort_order)}
            on={(v) => u("sort_order", Number(v) || 0)}
          />
        </div>
        <div>
          <L>Imagem</L>
          <ImageUpload value={edit.image} onChange={(url) => u("image", url)} folder="obras" />
        </div>
        <div>
          <L>Descrição</L>
          <textarea
            value={edit.description}
            onChange={(e) => u("description", e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-border text-sm bg-background"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={edit.published}
              onChange={(e) => u("published", e.target.checked)}
            />{" "}
            Publicado
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={edit.is_featured_home}
              onChange={(e) => u("is_featured_home", e.target.checked)}
            />{" "}
            Destaque na home
          </label>
        </div>
        <div className="flex gap-3">
          <button
            onClick={save}
            className="px-6 py-3 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest"
          >
            Guardar
          </button>
          <button onClick={() => setEdit(null)} className="px-6 py-3 text-xs">
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-end mb-8">
        <h1 className="font-display text-3xl">Obras</h1>
        <button
          onClick={() => setEdit(empty())}
          className="px-4 py-2 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest"
        >
          + Nova
        </button>
      </div>
      <div className="bg-background border border-border divide-y divide-border">
        {list.map((o) => (
          <div key={o.id} className="p-4 flex items-center gap-4">
            <div className="flex-1">
              <p className="font-semibold">
                {o.name}
                {o.is_featured_home && (
                  <span className="ml-2 text-[10px] uppercase tracking-widest bg-primary text-primary-foreground px-2 py-0.5">
                    Destaque
                  </span>
                )}
              </p>
              <p className="text-xs text-muted-foreground">
                {o.location} · {o.year} · {o.status}
              </p>
            </div>
            <button onClick={() => setEdit(o)} className="text-xs hover:text-primary">
              Editar
            </button>
            <button
              onClick={() => remove(o.id)}
              className="text-xs text-muted-foreground hover:text-destructive"
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function L({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[11px] uppercase tracking-widest font-bold mb-2">
      {children}
    </label>
  );
}
function F({ label, v, on }: { label: string; v: string; on: (v: string) => void }) {
  return (
    <div>
      <L>{label}</L>
      <input
        value={v}
        onChange={(e) => on(e.target.value)}
        className="w-full px-3 py-2 border border-border text-sm bg-background"
      />
    </div>
  );
}
