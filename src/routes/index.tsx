import { createFileRoute, Link } from "@tanstack/react-router";
import institutionalImg from "@/assets/institutional.jpg";
import { InvestmentCard } from "@/components/site/InvestmentCard";
import { useInvestments, useFeaturedObras, useFeaturedInvestment, useSettingsGetter } from "@/lib/cms";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CFS — Investimentos Imobiliários na Ilha da Boa Vista" },
      {
        name: "description",
        content:
          "Promotora imobiliária na Boa Vista. Apartamentos, residências e bungalows premium frente ao Atlântico. Um Parceiro de Confiança.",
      },
      { property: "og:title", content: "CFS — Investimentos na Boa Vista" },
      {
        property: "og:description",
        content: "Investimentos imobiliários premium na Ilha da Boa Vista, Cabo Verde.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { data: investments } = useInvestments();
  const featuredObras = useFeaturedObras();
  const featured = useFeaturedInvestment();
  const others = investments.filter((i) => i.slug !== featured?.slug);
  const cards = [featured, ...others].filter(Boolean);
  const onlyOne = cards.length === 1;
  const s = useSettingsGetter();

  const heroImage = s("hero_image");
  const instImage = s("inst_image", institutionalImg);

  return (
    <>
      {/* Hero */}
      <section className="px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden bg-surface aspect-[4/5] sm:aspect-[16/10] md:aspect-[21/9] min-h-[480px] md:min-h-[560px]">
            {heroImage && (
              <img
                src={heroImage}
                alt="Vista aérea da Ilha da Boa Vista"
                fetchPriority="high"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-right md:object-center scale-105 animate-fade"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
            <div className="relative h-full flex flex-col justify-end p-6 sm:p-8 md:p-16 lg:p-20">
              <p className="text-white/80 text-[11px] font-bold uppercase tracking-[0.3em] mb-4 sm:mb-6 animate-reveal">
                {s("hero_eyebrow", "Boa Vista, Cabo Verde")}
              </p>
              <h1 className="font-display text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.95] max-w-4xl animate-reveal text-balance">
                {s("hero_title", "Onde o Atlântico encontra o seu próximo investimento.")}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Investments */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 mt-16 sm:mt-24 md:mt-32">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-12 gap-4 sm:gap-6">
          <div className="max-w-xl">
            <p className="text-primary text-[11px] font-bold uppercase tracking-[0.3em] mb-3 sm:mb-4">
              {s("inv_eyebrow", "Oportunidades")}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-[1.05] text-balance">
              {s("inv_title", "Investimentos em destaque na Ilha da Boa Vista")}
            </h2>
          </div>
          <Link
            to="/investimentos"
            className="hidden md:inline-flex text-[11px] font-bold uppercase tracking-widest border-b border-primary pb-1 hover:text-primary"
          >
            Ver todos
          </Link>
        </div>

        {onlyOne ? (
          <InvestmentCard investment={cards[0]!} badge="Investimento em destaque" wide />
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-10 sm:gap-12 md:gap-16">
              {cards.slice(0, 2).map((inv, i) => (
                <InvestmentCard
                  key={inv!.slug}
                  investment={inv!}
                  offset={i === 1}
                  badge={i === 0 ? "Investimento em destaque" : undefined}
                />
              ))}
            </div>
            {cards.length > 2 && (
              <div className="mt-10 sm:mt-16 grid md:grid-cols-2 gap-10 sm:gap-12">
                {cards.slice(2, 3).map((inv) => (
                  <InvestmentCard key={inv!.slug} investment={inv!} />
                ))}
              </div>
            )}
          </>
        )}
      </section>

      {/* Obras strip — featured */}
      <section className="py-16 sm:py-24 md:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 sm:mb-12 gap-4 sm:gap-8">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary mb-2">
                {s("obras_eyebrow", "Portfólio de Obras")}
              </p>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl">
                {s("obras_title", "Décadas de execução técnica")}
              </h2>
            </div>
          </div>

          {featuredObras.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {featuredObras.map((o) => (
                <div key={o.id}>
                  <div className="aspect-[4/3] bg-surface mb-4 overflow-hidden">
                    <img
                      src={o.image}
                      alt={o.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <p className="text-sm font-semibold">{o.name}</p>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wide mt-1">
                    {o.status} • {o.year}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Institutional */}
      <section className="bg-surface py-16 sm:py-24 md:py-32 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center">
          <div>
            <p className="text-primary text-[11px] font-bold uppercase tracking-[0.3em] mb-3 sm:mb-4">
              {s("inst_eyebrow", "Quem Somos")}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl leading-tight mb-5 sm:mb-6 text-balance">
              {s("inst_title", "Um Parceiro de Confiança no Atlântico.")}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-8 sm:mb-10 leading-relaxed whitespace-pre-line">
              {s(
                "inst_text",
                "A CFS – Construções Figueiredo e Soares, S.A. combina a precisão técnica da engenharia com a visão comercial de um promotor imobiliário internacional. Há mais de duas décadas a construir o futuro da Ilha da Boa Vista."
              )}
            </p>
            <Link
              to="/quem-somos"
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest border-b border-foreground pb-1 hover:text-primary hover:border-primary"
            >
              {s("inst_cta_label", "Conhecer a CFS")}
              <span>→</span>
            </Link>
          </div>
          <div className="relative">
            <img
              src={instImage}
              alt="Detalhe arquitetónico"
              loading="lazy"
              decoding="async"
              className="w-full aspect-[4/5] object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
