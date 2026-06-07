import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { FileUpload } from "@/components/admin/FileUpload";
import institutionalImg from "@/assets/institutional.jpg";

export const Route = createFileRoute("/_authenticated/admin/definicoes")({
  component: AdminSettings,
});

type FieldType = "text" | "textarea" | "image" | "file";
type Field = { key: string; label: string; type?: FieldType; help?: string; default?: string };
type Section = { title: string; fields: Field[] };

const SECTIONS: Section[] = [
  {
    title: "Hero — topo da home",
    fields: [
      { key: "hero_eyebrow", label: "Texto pequeno (eyebrow)", default: "Boa Vista, Cabo Verde" },
      { key: "hero_title", label: "Título principal", type: "textarea", default: "Onde o Atlântico encontra o seu próximo investimento." },
      { key: "hero_image", label: "Imagem de fundo", type: "image" },
      { key: "hero_cta_primary", label: "Botão principal — texto", default: "Ver Investimento" },
      { key: "hero_cta_secondary", label: "Botão secundário — texto", default: "Falar Connosco" },
    ],
  },
  {
    title: "Secção Investimentos (home)",
    fields: [
      { key: "inv_eyebrow", label: "Eyebrow", default: "Oportunidades" },
      { key: "inv_title", label: "Título", type: "textarea", default: "Investimentos em destaque na Ilha da Boa Vista" },
    ],
  },
  {
    title: "Secção Institucional (home)",
    fields: [
      { key: "inst_eyebrow", label: "Eyebrow", default: "Quem Somos" },
      { key: "inst_title", label: "Título", type: "textarea", default: "Um Parceiro de Confiança no Atlântico." },
      { key: "inst_text", label: "Parágrafo", type: "textarea", default: "A CFS – Construções Figueiredo e Soares, S.A. combina a precisão técnica da engenharia com a visão comercial de um promotor imobiliário internacional. Há mais de duas décadas a construir o futuro da Ilha da Boa Vista." },
      { key: "inst_image", label: "Imagem", type: "image", default: institutionalImg },
      { key: "inst_cta_label", label: "Botão — texto", default: "Conhecer a CFS" },
    ],
  },
  {
    title: "Secção Obras (home)",
    fields: [
      { key: "obras_eyebrow", label: "Eyebrow", default: "Portfólio de Obras" },
      { key: "obras_title", label: "Título", type: "textarea", default: "Décadas de execução técnica" },
      { key: "obras_cta_label", label: "Botão portfólio — texto", help: "Liga à página /obras", default: "Ver portfólio completo" },
      {
        key: "portfolio_pdf_url",
        label: "Portfólio em PDF (página /obras)",
        type: "file",
        help: "Carrega aqui o PDF do portfólio. Aparece um botão de download no topo da página Obras.",
      },
    ],
  },
  {
    title: "Página Quem Somos",
    fields: [
      { key: "about_eyebrow", label: "Eyebrow", default: "Quem Somos" },
      { key: "about_title", label: "Título", type: "textarea", default: "Um Parceiro de Confiança no Atlântico." },
      { key: "about_intro", label: "Introdução", type: "textarea", default: "Há mais de duas décadas que a CFS — Construções Figueiredo e Soares, S.A. constrói o futuro da Ilha da Boa Vista, evoluindo de uma construtora reconhecida pela qualidade técnica para uma promotora imobiliária de referência em Cabo Verde." },
      { key: "about_image", label: "Imagem", type: "image", default: institutionalImg },
      { key: "about_block1_title", label: "Bloco 1 — título", default: "A nossa história" },
      { key: "about_block1_text", label: "Bloco 1 — texto", type: "textarea", default: "Fundada com a missão de elevar o padrão da construção em Cabo Verde, a CFS começou como construtora civil e cresceu acompanhando o desenvolvimento da Ilha da Boa Vista. Hoje, somos uma referência tanto na execução técnica como na promoção imobiliária." },
      { key: "about_block2_title", label: "Bloco 2 — título", default: "Presença na Boa Vista" },
      { key: "about_block2_text", label: "Bloco 2 — texto", type: "textarea", default: "Com sede em Sal Rei, conhecemos profundamente a ilha — o seu território, as suas pessoas e o seu potencial. Esta proximidade permite-nos identificar as melhores oportunidades e executar projetos que respeitam o contexto local." },
      { key: "about_block3_title", label: "Bloco 3 — título", default: "Visão de futuro" },
      { key: "about_block3_text", label: "Bloco 3 — texto", type: "textarea", default: "Acreditamos que a Boa Vista é um dos destinos mais prometedores do Atlântico. Investimos em projetos que combinam qualidade construtiva, sustentabilidade e potencial de valorização para investidores nacionais e internacionais." },
      { key: "about_quote", label: "Citação", type: "textarea", default: '"Cada projeto é uma promessa que assumimos com os nossos clientes, parceiros e com a Ilha da Boa Vista."' },
      { key: "about_quote_author", label: "Autor da citação", default: "CFS — Construções Figueiredo e Soares, S.A." },
    ],
  },
  {
    title: "Página Investimentos",
    fields: [
      { key: "inv_page_eyebrow", label: "Eyebrow", default: "Investimentos" },
      { key: "inv_page_title", label: "Título", type: "textarea", default: "Oportunidades imobiliárias na Boa Vista." },
      { key: "inv_page_intro", label: "Parágrafo introdutório", type: "textarea", default: "Na CFS, identificamos e desenvolvemos as melhores oportunidades de investimento na Ilha da Boa Vista, desenhadas para assegurar alta rentabilidade e uma valorização contínua do seu investimento." },
    ],
  },
  {
    title: "Contactos",
    fields: [
      { key: "contact_phone", label: "Telefone", default: "+238 251 12 34" },
      { key: "contact_email", label: "Email", default: "info@cfs.cv" },
      { key: "contact_address", label: "Morada", type: "textarea", default: "Sal Rei\nIlha da Boa Vista\nCabo Verde" },
      { key: "whatsapp_number", label: "WhatsApp (só dígitos)", default: "238999999999" },
    ],
  },
  {
    title: "Redes sociais",
    fields: [
      { key: "social_instagram_url", label: "Instagram — URL completo", help: "Ex: https://instagram.com/cfs.cv. Deixar vazio para esconder o link.", default: "" },
      { key: "social_facebook_url", label: "Facebook — URL completo", help: "Ex: https://facebook.com/cfs.cv. Deixar vazio para esconder o link.", default: "" },
      { key: "social_linkedin_url", label: "LinkedIn — URL completo", help: "Ex: https://linkedin.com/company/cfs. Deixar vazio para esconder o link.", default: "" },
    ],
  },
];

const ALL_FIELDS = SECTIONS.flatMap((s) => s.fields);
const ALL_KEYS = ALL_FIELDS.map((f) => f.key);
const DEFAULTS: Record<string, string> = Object.fromEntries(
  ALL_FIELDS.map((f) => [f.key, f.default ?? ""])
);

function AdminSettings() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("site_settings").select("key,value");
      const saved: Record<string, string> = {};
      for (const r of (data as any[]) || []) saved[r.key] = r.value;
      // Pre-fill with saved value, falling back to default so admin sees current content
      const out: Record<string, string> = {};
      for (const k of ALL_KEYS) {
        const v = saved[k];
        out[k] = v && v.length ? v : DEFAULTS[k] ?? "";
      }
      setValues(out);
      setLoading(false);
    })();
  }, []);

  async function save() {
    setSaving(true);
    const rows = ALL_KEYS.map((k) => ({ key: k, value: values[k] ?? "" }));
    const { error } = await supabase.from("site_settings").upsert(rows, { onConflict: "key" });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Definições guardadas");
  }

  const set = (k: string, v: string) => setValues((s) => ({ ...s, [k]: v }));
  const reset = (k: string) => set(k, DEFAULTS[k] ?? "");

  if (loading) return <p className="text-sm text-muted-foreground">A carregar…</p>;

  return (
    <div>
      <h1 className="font-display text-3xl mb-2">Conteúdos do site</h1>
      <p className="text-sm text-muted-foreground mb-10">
        Os campos já mostram os textos e imagens atuais. Altera apenas o que quiseres
        mudar e clica em <strong>Guardar tudo</strong>.
      </p>

      <div className="space-y-12">
        {SECTIONS.map((sec) => (
          <section key={sec.title}>
            <h2 className="font-display text-xl mb-5 border-b border-border pb-2">
              {sec.title}
            </h2>
            <div className="space-y-5">
              {sec.fields.map((f) => {
                const isDefault = (values[f.key] ?? "") === (DEFAULTS[f.key] ?? "");
                return (
                  <div key={f.key}>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-[11px] uppercase tracking-widest font-bold">
                        {f.label}
                      </label>
                      {!isDefault && f.default !== undefined && (
                        <button
                          type="button"
                          onClick={() => reset(f.key)}
                          className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground"
                        >
                          Repor original
                        </button>
                      )}
                    </div>
                    {f.help && (
                      <p className="text-xs text-muted-foreground mb-2">{f.help}</p>
                    )}
                    {f.type === "image" ? (
                      <ImageUpload
                        value={values[f.key] ?? ""}
                        onChange={(url) => set(f.key, url)}
                        folder="site"
                      />
                    ) : f.type === "file" ? (
                      <FileUpload
                        value={values[f.key] ?? ""}
                        onChange={(url) => set(f.key, url)}
                        folder="site"
                        accept="application/pdf"
                        label="Carregar PDF"
                      />
                    ) : f.type === "textarea" ? (
                      <textarea
                        rows={3}
                        value={values[f.key] ?? ""}
                        onChange={(e) => set(f.key, e.target.value)}
                        className="w-full px-3 py-2 border border-border text-sm bg-background"
                      />
                    ) : (
                      <input
                        value={values[f.key] ?? ""}
                        onChange={(e) => set(f.key, e.target.value)}
                        className="w-full px-3 py-2 border border-border text-sm bg-background"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      <div className="sticky bottom-0 bg-surface pt-6 pb-2 mt-12 -mx-6 px-6 sm:-mx-10 sm:px-10 border-t border-border">
        <button
          onClick={save}
          disabled={saving}
          className="px-6 py-3 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest disabled:opacity-50"
        >
          {saving ? "A guardar…" : "Guardar tudo"}
        </button>
      </div>
    </div>
  );
}
