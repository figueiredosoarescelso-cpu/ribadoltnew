import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { getInvestment, investments as staticInvs, type Investment } from "@/data/investments";
import { LeadForm } from "@/components/site/LeadForm";
import { useInvestments, useSettingsGetter } from "@/lib/cms";


export const Route = createFileRoute("/investimentos/$slug")({
  loader: ({ params }): { investment: Investment } => {
    const investment = getInvestment(params.slug) ?? staticInvs[0];
    if (!investment) throw notFound();
    return { investment };
  },
  head: ({ loaderData }) => {
    const inv = loaderData?.investment;
    if (!inv)
      return {
        meta: [{ title: "Investimento — CFS" }],
      };
    return {
      meta: [
        { title: `${inv.name} — CFS Boa Vista` },
        { name: "description", content: `${inv.tagline}. ${inv.location}.` },
        { property: "og:title", content: `${inv.name} — CFS` },
        { property: "og:description", content: inv.tagline },
        { property: "og:image", content: inv.heroImage },
        { property: "og:type", content: "website" },
      ],
    };
  },
  component: InvestmentPage,
  notFoundComponent: () => (
    <div className="max-w-3xl mx-auto px-6 py-32 text-center">
      <h1 className="font-display text-4xl">Investimento não encontrado</h1>
      <Link to="/investimentos" className="mt-8 inline-block underline">
        Ver todos os investimentos
      </Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="max-w-3xl mx-auto px-6 py-32 text-center">
      <h1 className="font-display text-3xl">Não foi possível carregar este investimento</h1>
      <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
      <button onClick={reset} className="mt-8 underline">Tentar novamente</button>
    </div>
  ),
});

function InvestmentPage() {
  const { slug } = Route.useParams();
  const { investment: fallback } = Route.useLoaderData() as { investment: Investment };
  const { data: list } = useInvestments();
  const investment = list.find((i) => i.slug === slug) ?? fallback;
  const investments = list;

  const s = useSettingsGetter();
  const waNumber = s("whatsapp_number", "238999999999").replace(/\D/g, "");
  const waMessage = `Olá, gostaria de receber mais informações sobre ${investment.name}.`;
  const waHref = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;


  const mapSrc = `https://www.google.com/maps?q=${investment.coordinates.lat},${investment.coordinates.lng}&z=13&output=embed`;

  return (
    <article>
      {/* Hero */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden aspect-auto md:aspect-[21/9] min-h-[520px]">
            <img
              src={investment.heroImage}
              alt={investment.name}
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="relative h-full flex flex-col justify-end p-8 md:p-16 lg:p-20">
              <p className="text-white/80 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.18em] md:tracking-[0.3em] mb-4 animate-reveal">
                {investment.location} • {investment.status}
              </p>
              <h1 className="font-display text-white text-4xl md:text-7xl leading-[0.95] max-w-3xl animate-reveal text-balance">
                {investment.name}
              </h1>
              <p className="text-white/80 text-base md:text-xl max-w-2xl mt-6 animate-reveal" style={{ animationDelay: "150ms" }}>
                {investment.tagline}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Description + features */}
      <section className="max-w-7xl mx-auto px-6 mt-24 md:mt-32 grid md:grid-cols-3 gap-12 md:gap-16">
        <div className="md:col-span-2">
          <p className="text-primary text-[11px] font-bold uppercase tracking-[0.3em] mb-4">
            Sobre o empreendimento
          </p>
          <h2 className="font-display text-3xl md:text-4xl mb-6 text-balance">
            Um investimento desenhado para perdurar.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            {investment.description}
          </p>
        </div>
        <div className="border-t md:border-t-0 md:border-l border-border md:pl-12 pt-10 md:pt-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-6">
            Ficha técnica
          </p>
          <dl className="space-y-5">
            {investment.features.map((f) => (
              <div key={f.label} className="flex justify-between gap-4 border-b border-border pb-4">
                <dt className="text-sm text-muted-foreground">{f.label}</dt>
                <dd className="text-sm font-semibold text-right">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Gallery */}
      <section className="max-w-7xl mx-auto px-6 mt-24 md:mt-32">
        <p className="text-primary text-[11px] font-bold uppercase tracking-[0.3em] mb-8">
          Galeria
        </p>
        <div className="grid md:grid-cols-3 gap-3 md:gap-4">
          {investment.gallery.map((img, i) => (
            <div
              key={i}
              className={`overflow-hidden ${
                i === 0 ? "md:col-span-2 md:row-span-2 aspect-[4/3]" : "aspect-[4/3]"
              }`}
            >
              <img
                src={img}
                alt={`${investment.name} — imagem ${i + 1}`}
                loading="lazy"
          decoding="async"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Highlights */}
      <section className="bg-surface mt-24 md:mt-32 py-24 md:py-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          <div>
            <p className="text-primary text-[11px] font-bold uppercase tracking-[0.3em] mb-4">
              Porquê investir
            </p>
            <h2 className="font-display text-3xl md:text-5xl leading-tight text-balance">
              Os destaques deste investimento.
            </h2>
          </div>
          <ul className="space-y-5">
            {investment.highlights.map((h, i) => (
              <li key={i} className="flex gap-5 border-b border-border pb-5">
                <span className="font-display text-2xl text-primary leading-none w-8 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-base md:text-lg leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Location */}
      <section className="max-w-7xl mx-auto px-6 mt-24 md:mt-32">
        <p className="text-primary text-[11px] font-bold uppercase tracking-[0.3em] mb-4">
          Localização
        </p>
        <h2 className="font-display text-3xl md:text-4xl mb-8">
          {investment.location}
        </h2>
        <div className="aspect-[16/9] overflow-hidden border border-border">
          <iframe
            src={mapSrc}
            title={`Mapa — ${investment.name}`}
            loading="lazy"

            className="w-full h-full"
          />
        </div>
      </section>

      {/* Contact form */}
      <section id="contacto" className="max-w-7xl mx-auto px-6 mt-24 md:mt-32 grid md:grid-cols-2 gap-16">
        <div>
          <p className="text-primary text-[11px] font-bold uppercase tracking-[0.3em] mb-4">
            Contacto
          </p>
          <h2 className="font-display text-3xl md:text-5xl leading-tight mb-6 text-balance">
            Peça mais informações sobre {investment.name}.
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-8">
            Preencha o formulário e a nossa equipa entrará em contacto consigo
            com toda a informação comercial, plantas e condições.
          </p>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-sm font-semibold border-b border-primary text-primary pb-1"
          >
            Ou contacte-nos por WhatsApp →
          </a>
        </div>
        <div>
          <LeadForm investmentName={investment.name} investmentSlug={investment.slug} source={`investimento:${investment.slug}`} />
        </div>
      </section>

      {/* Other investments */}
      <section className="max-w-7xl mx-auto px-6 mt-32">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-8">
          Outros investimentos
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {investments
            .filter((i) => i.slug !== investment.slug)
            .map((i) => (
              <Link
                key={i.slug}
                to="/investimentos/$slug"
                params={{ slug: i.slug }}
                className="group block"
              >
                <div className="aspect-[4/3] overflow-hidden mb-4">
                  <img
                    src={i.heroImage}
                    alt={i.name}
                    loading="lazy"
          decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <p className="text-[11px] uppercase tracking-widest text-primary font-bold">
                  {i.location}
                </p>
                <h3 className="font-display text-xl mt-1">{i.name}</h3>
              </Link>
            ))}
        </div>
      </section>
    </article>
  );
}
