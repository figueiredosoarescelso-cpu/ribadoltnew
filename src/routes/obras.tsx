import { createFileRoute, Link } from "@tanstack/react-router";
import { useObras, useSettingsGetter } from "@/lib/cms";

export const Route = createFileRoute("/obras")({
  head: () => ({
    meta: [
      { title: "Obras — CFS | Portfólio de Construção na Boa Vista" },
      {
        name: "description",
        content:
          "Portfólio de obras concluídas e em execução pela CFS na Ilha da Boa Vista. Décadas de experiência em construção civil de qualidade.",
      },
      { property: "og:title", content: "Obras — CFS Boa Vista" },
    ],
  }),
  component: ObrasPage,
});

function ObrasPage() {
  const { data: obras } = useObras();
  const s = useSettingsGetter();
  const portfolioUrl = s("portfolio_pdf_url", "");
  return (
    <div className="px-6">
      <div className="max-w-7xl mx-auto pt-16 md:pt-24">
        <p className="text-primary text-[11px] font-bold uppercase tracking-[0.3em] mb-6">
          Portfólio de Obras
        </p>
        <h1 className="font-display text-5xl md:text-7xl leading-[0.95] mb-8 max-w-3xl text-balance">
          Décadas a construir a Boa Vista.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          Cada obra concluída é uma prova do nosso compromisso com a
          execução técnica, prazo e qualidade. Conheça parte do trabalho da
          CFS na ilha.
        </p>
      </div>

      <div className="max-w-7xl mx-auto mt-20 md:mt-28 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {obras.map((o) => (
          <article key={o.id} className="group">
            <div className="aspect-[4/3] overflow-hidden bg-surface mb-5">
              <img
                src={o.image}
                alt={o.name}
                loading="lazy"
          decoding="async"
                className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
              />
            </div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-primary mb-1">
              {o.location} • {o.year}
            </p>
            <h3 className="font-display text-2xl">{o.name}</h3>
            <p className="text-sm text-muted-foreground mt-2">{o.description}</p>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground mt-3">
              {o.status}
            </p>
          </article>
        ))}
      </div>

      {portfolioUrl && (
        <div className="max-w-7xl mx-auto mt-20 md:mt-24 text-center">
          <a
            href={`https://docs.google.com/viewer?url=${encodeURIComponent(portfolioUrl)}&embedded=false`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground text-[12px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Ver portfólio completo
          </a>
        </div>
      )}

      <div className="max-w-7xl mx-auto mt-32 border-t border-border pt-16 text-center">
        <h2 className="font-display text-3xl md:text-4xl mb-4">
          Quer conhecer os nossos próximos projetos?
        </h2>
        <Link
          to="/investimentos"
          className="mt-6 inline-flex px-8 py-4 bg-primary text-primary-foreground text-[12px] font-bold uppercase tracking-widest"
        >
          Ver Investimentos
        </Link>
      </div>
    </div>
  );
}
