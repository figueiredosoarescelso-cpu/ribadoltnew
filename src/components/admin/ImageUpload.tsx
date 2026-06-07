import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function ImageUpload({
  value,
  onChange,
  folder = "uploads",
}: {
  value?: string | null;
  onChange: (url: string) => void;
  folder?: string;
}) {
  const [uploading, setUploading] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage.from("media").upload(path, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type,
      });
      if (error) throw error;
      const { data } = supabase.storage.from("media").getPublicUrl(path);
      onChange(data.publicUrl);
      toast.success("Imagem carregada");
    } catch (err: any) {
      toast.error("Falha no upload: " + (err?.message || "erro"));
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div className="space-y-2">
      {value ? (
        <div className="relative w-full max-w-xs aspect-[4/3] bg-muted overflow-hidden border border-border">
          <img src={value} alt="" className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="w-full max-w-xs aspect-[4/3] bg-muted border border-dashed border-border flex items-center justify-center text-xs text-muted-foreground">
          Sem imagem
        </div>
      )}
      <div className="flex items-center gap-2">
        <label className="inline-flex items-center px-3 py-2 text-xs font-bold uppercase tracking-wider bg-primary text-primary-foreground cursor-pointer hover:bg-primary/90">
          {uploading ? "A carregar…" : "Carregar imagem"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
            disabled={uploading}
          />
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs text-muted-foreground hover:text-destructive"
          >
            Remover
          </button>
        )}
      </div>
    </div>
  );
}
