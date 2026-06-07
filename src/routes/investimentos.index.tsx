import { createFileRoute } from "@tanstack/react-router";
import { InvestmentCard } from "@/components/site/InvestmentCard";
import { useInvestments, useSettingsGetter } from "@/lib/cms";

export const Route = createFileRoute("/investimentos/")({
  head: () => ({
    meta: [
      { title: "Investimentos — CFS | Imóveis Premium na Boa Vista" },
      {
        name: "description",
        content:
          "Apartamentos, residências e bungalows premium para investimento na Ilha da Boa Vista, Cabo Verde. Veja todos os empreendimentos da CFS.",
      },
      { property: "og:title", content: "Investimentos — CFS Boa Vista" },
      {
        property: "og:description",
        content: "Empreendimentos imobiliários premium na Ilha da Boa Vista.",
      },
    ],
  }),
  component: InvestmentsPage,
});

function InvestmentsPage() {
  const { data: investments } = useInvestments();
  const s = useSettingsGetter();
  return (
    <div className="px-6">
      <div className="max-w-7xl mx-auto pt-16 md:pt-24">
        <p className="text-primary text-[11px] font-bold uppercase tracking-[0.3em] mb-6">
          {s("inv_page_eyebrow", "Investimentos")}
        </p>
        <h1 className="font-display text-5xl md:text-7xl leading-[0.95] mb-8 max-w-3xl text-balance">
          {s("inv_page_title", "Oportunidades imobiliárias na Boa Vista.")}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed whitespace-pre-line">
          {s(
            "inv_page_intro",
            "Na CFS, identificamos e desenvolvemos as melhores oportunidades de investimento na Ilha da Boa Vista, desenhadas para assegurar alta rentabilidade e uma valorização contínua do seu investimento."
          )}
        </p>
      </div>

      {investments.length === 1 ? (
        <div className="max-w-7xl mx-auto mt-20 md:mt-28">
          <InvestmentCard investment={investments[0]} wide badge="Investimento em destaque" />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto mt-20 md:mt-28 grid md:grid-cols-2 gap-12 md:gap-x-16 md:gap-y-20">
          {investments.map((inv, i) => (
            <InvestmentCard key={inv.slug} investment={inv} offset={i % 2 === 1} />
          ))}
        </div>
      )}
    </div>
  );
}
