import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { useInvestments } from "@/lib/cms";
import { supabase } from "@/integrations/supabase/client";
import fallbackHero from "@/assets/ribadolt-hero.jpg";

const MAIN_SITE_URL = "https://site-cfs.figueiredosoarescelso.workers.dev";
const SLUG = "ribadolt";

export const Route = createFileRoute("/ribadolt")({
  head: () => ({
    meta: [
      { title: "Riba d'Olt — Oportunidade de Investimento Imobiliário | CFS" },
      {
        name: "description",
        content:
          "Riba d'Olt: empreendimento premium na Boa Vista, Cabo Verde. Oportunidade exclusiva de investimento imobiliário com alto potencial de valorização.",
      },
      { property: "og:title", content: "Riba d'Olt — Investimento Imobiliário Premium" },
      {
        property: "og:description",
        content:
          "Empreendimento exclusivo da CFS. Localização estratégica, rentabilidade atrativa e tipologias diferenciadas.",
      },
      { property: "og:image", content: fallbackHero },
    ],
  }),
  component: RibaDoltLanding,
});

function RibaDoltLanding() {
  const { data: investments } = useInvestments();
  const inv = investments.find((i) => i.slug === SLUG);

  const hero = inv?.heroImage || fallbackHero;
  const location = inv?.location || "Sal Rei, Boa Vista";
  const status = inv?.status || "Em comercialização";
  const description =
    inv?.description ||
    "Um empreendimento exclusivo da CFS, desenhado para investidores que procuram rentabilidade, valorização e lifestyle numa das ilhas mais promissoras do Atlântico.";
  const highlights = inv?.highlights ?? [];
  const features = inv?.features ?? [];
  const coords = inv?.coordinates;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <LandingHeader />
      <Hero heroImage={hero} location={location} status={status} />
      <Project description={description} highlights={highlights} />
      <Indicators features={features} />
      <FichaTecnica features={features} />
      {coords && coords.lat !== 0 && (
        <LocationMap lat={coords.lat} lng={coords.lng} label={location} />
      )}
      <AboutCFS />
      <LeadCapture />
      <LandingFooter />
    </div>
  );
}

function LandingHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#top" className="font-display text-2xl tracking-tight">
          Riba<span className="text-primary">·</span>d'Olt
        </a>
        <nav className="hidden md:flex items-center gap-8 text-[12px] font-bold uppercase tracking-widest">
          <a href="#projeto" className="hover:text-primary transition-colors">O Projeto</a>
          <a href="#ficha" className="hover:text-primary transition-colors">Ficha Técnica</a>
          <a href="#localizacao" className="hover:text-primary transition-colors">Localização</a>
          <a href="#contacto" className="hover:text-primary transition-colors">Contacto</a>
        </nav>
        <a
          href={MAIN_SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2 border border-border text-[11px] font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
        >
          Site CFS
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </a>
      </div>
    </header>
  );
}

function Hero({ heroImage, location, status }: { heroImage: string; location: string; status: string }) {
  return (
    <section id="top" className="relative min-h-[100svh] flex items-end overflow-hidden pt-16">
      <img
        src={heroImage}
        alt="Riba d'Olt — vista do empreendimento"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 md:pb-24 w-full">
        <p className="text-primary-foreground/80 text-[11px] font-bold uppercase tracking-[0.3em] mb-6">
          {location} · {status}
        </p>
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-white max-w-4xl text-balance">
          Riba d'Olt.<br />
          <span className="italic text-white/80">Onde o capital encontra o Atlântico.</span>
        </h1>
        <p className="mt-8 max-w-xl text-base md:text-lg text-white/85 leading-relaxed">
          Um empreendimento exclusivo da CFS, desenhado para investidores
          internacionais que procuram rentabilidade, valorização e lifestyle
          numa das ilhas mais promissoras do Atlântico.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#contacto"
            className="px-8 py-4 bg-primary text-primary-foreground text-[12px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
          >
            Descarregar Dossier
          </a>
          <a
            href="#contacto"
            className="px-8 py-4 border border-white/40 text-white text-[12px] font-bold uppercase tracking-widest hover:bg-white hover:text-foreground transition-colors"
          >
            Falar com Consultor
          </a>
        </div>
      </div>
    </section>
  );
}

function Project({ description, highlights }: { description: string; highlights: string[] }) {
  return (
    <section id="projeto" className="px-6 py-24 md:py-32">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 md:gap-16">
        <div className="md:col-span-2">
          <p className="text-primary text-[11px] font-bold uppercase tracking-[0.3em] mb-6">
            O Projeto
          </p>
          <h2 className="font-display text-4xl md:text-6xl leading-[1] mb-10 text-balance">
            Um empreendimento desenhado para gerar valor.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
            {description}
          </p>
        </div>
        {highlights.length > 0 && (
          <div className="border-t md:border-t-0 md:border-l border-border md:pl-12 pt-10 md:pt-0">
            <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-6">
              Destaques
            </p>
            <ul className="space-y-5">
              {highlights.map((h, i) => (
                <li key={i} className="flex gap-4 border-b border-border pb-4">
                  <span className="font-display text-xl text-primary leading-none w-6 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

function Indicators({ features }: { features: { label: string; value: string }[] }) {
  const stats = [
    { k: "+8%", v: "Rentabilidade anual estimada" },
    { k: "+35%", v: "Valorização projetada a 5 anos" },
    { k: features.length ? `${features.length}` : "—", v: "Lotes/unidades disponíveis" },
    { k: "CFS", v: "Promotor e construtor" },
  ];
  return (
    <section id="indicadores" className="px-6 py-24 md:py-32 bg-foreground text-background">
      <div className="max-w-7xl mx-auto">
        <p className="text-primary text-[11px] font-bold uppercase tracking-[0.3em] mb-6">
          Indicadores de Investimento
        </p>
        <h2 className="font-display text-4xl md:text-6xl leading-[1] max-w-3xl mb-16 text-background text-balance">
          Métricas que sustentam a decisão.
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-background/10">
          {stats.map((s) => (
            <div key={s.v} className="bg-foreground p-8 md:p-10">
              <p className="font-display text-5xl md:text-7xl text-primary leading-none">{s.k}</p>
              <p className="mt-4 text-[12px] uppercase tracking-widest text-background/70">{s.v}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-xs text-background/50 max-w-2xl">
          Indicadores estimativos sujeitos às condições de mercado. Valores
          detalhados disponíveis no dossier de investimento.
        </p>
      </div>
    </section>
  );
}

function FichaTecnica({ features }: { features: { label: string; value: string }[] }) {
  if (!features.length) return null;
  return (
    <section id="ficha" className="px-6 py-24 md:py-32">
      <div className="max-w-7xl mx-auto">
        <p className="text-primary text-[11px] font-bold uppercase tracking-[0.3em] mb-6">
          Ficha Técnica
        </p>
        <h2 className="font-display text-4xl md:text-6xl leading-[1] mb-16 max-w-3xl text-balance">
          Áreas e tipologias do empreendimento.
        </h2>
        <dl className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-border border border-border">
          {features.map((f) => (
            <div key={f.label} className="bg-background p-6 md:p-8 flex flex-col gap-2">
              <dt className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                {f.label}
              </dt>
              <dd className="font-display text-2xl md:text-3xl">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function LocationMap({ lat, lng, label }: { lat: number; lng: number; label: string }) {
  const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  return (
    <section id="localizacao" className="px-6 py-24 md:py-32 bg-surface">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-primary text-[11px] font-bold uppercase tracking-[0.3em] mb-4">
              Localização
            </p>
            <h2 className="font-display text-4xl md:text-6xl leading-[1] text-balance">
              {label}
            </h2>
          </div>
          <a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-foreground text-[11px] font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
          >
            Abrir no Google Maps
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </a>
        </div>
        <a
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block aspect-[16/9] overflow-hidden border border-border group"
          aria-label="Abrir localização no Google Maps"
        >
          <iframe
            src={mapSrc}
            title={`Mapa — ${label}`}
            loading="lazy"
            className="w-full h-full pointer-events-none group-hover:opacity-90 transition-opacity"
          />
        </a>
      </div>
    </section>
  );
}

function AboutCFS() {
  return (
    <section id="cfs" className="px-6 py-24 md:py-32">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-primary text-[11px] font-bold uppercase tracking-[0.3em] mb-6">
          Sobre a CFS
        </p>
        <h2 className="font-display text-4xl md:text-6xl leading-[1] mb-8 text-balance">
          Construções Figueiredo e Soares.
          <br />
          <span className="italic text-muted-foreground">Um parceiro de confiança.</span>
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
          Promotora imobiliária com presença consolidada em Cabo Verde,
          especializada no desenvolvimento de empreendimentos premium na Ilha
          da Boa Vista.
        </p>
        <a
          href={MAIN_SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-[12px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
        >
          Visitar Site Principal
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </a>
      </div>
    </section>
  );
}

const leadSchema = z.object({
  name: z.string().trim().min(2, "Indique o seu nome").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  phone: z.string().trim().min(6, "Telefone inválido").max(30),
  amount: z.string().trim().min(1, "Indique o valor").max(50),
  message: z.string().trim().max(1000).optional(),
});

function LeadCapture() {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const parsed = leadSchema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Verifique os campos");
      return;
    }
    setSubmitting(true);
    const { name, email, phone, amount, message } = parsed.data;
    const composedMessage = `Valor a investir: ${amount}${message ? `\n\n${message}` : ""}`;
    const { error } = await supabase.from("leads").insert({
      name,
      email,
      phone,
      message: composedMessage,
      investment_slug: SLUG,
      source: "ribadolt-landing",
    });
    setSubmitting(false);
    if (error) {
      toast.error("Não foi possível enviar", { description: error.message });
      return;
    }
    toast.success("Pedido enviado", {
      description: "Um consultor da CFS entrará em contacto consigo.",
    });
    form.reset();
  };

  return (
    <section id="contacto" className="px-6 py-24 md:py-32 bg-surface">
      <div className="max-w-3xl mx-auto">
        <p className="text-primary text-[11px] font-bold uppercase tracking-[0.3em] mb-6">
          Contacto Investidores
        </p>
        <h2 className="font-display text-4xl md:text-6xl leading-[1] mb-6 text-balance">
          Reserve a sua reunião com a CFS.
        </h2>
        <p className="text-base text-muted-foreground mb-12 max-w-xl">
          Preencha o formulário e enviaremos o dossier completo de
          investimento, juntamente com o contacto direto de um consultor
          dedicado.
        </p>
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field name="name" label="Nome" required />
            <Field name="email" label="Email" type="email" required />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field name="phone" label="Telefone / WhatsApp" required />
            <Field name="amount" label="Valor a investir (EUR)" required placeholder="ex. 250 000" />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
              Mensagem (opcional)
            </label>
            <textarea
              name="message"
              rows={4}
              className="w-full bg-transparent border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto px-10 py-4 bg-primary text-primary-foreground text-[12px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors disabled:opacity-60"
          >
            {submitting ? "A enviar…" : "Enviar e receber dossier"}
          </button>
        </form>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full bg-transparent border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
      />
    </div>
  );
}

function LandingFooter() {
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div>
          <p className="font-display text-xl">Riba d'Olt · CFS</p>
          <p className="text-xs text-muted-foreground mt-1">
            © {new Date().getFullYear()} Construções Figueiredo e Soares, S.A.
          </p>
        </div>
        <a
          href={MAIN_SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-widest hover:text-primary transition-colors"
        >
          Voltar ao Site Principal
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </a>
      </div>
    </footer>
  );
}
