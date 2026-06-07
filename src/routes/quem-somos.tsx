import { createFileRoute, Link } from "@tanstack/react-router";
import institutionalImg from "@/assets/institutional.jpg";
import { useSettingsGetter } from "@/lib/cms";

export const Route = createFileRoute("/quem-somos")({
  head: () => ({
    meta: [
      { title: "Quem Somos — CFS | Construções Figueiredo e Soares" },
      {
        name: "description",
        content:
          "A CFS é uma promotora imobiliária e construtora de referência na Ilha da Boa Vista, Cabo Verde. Conheça a nossa história, missão e equipa.",
      },
      { property: "og:title", content: "Quem Somos — CFS" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const s = useSettingsGetter();
  const image = s("about_image", institutionalImg);

  return (
    <div className="px-6">
      <div className="max-w-7xl mx-auto pt-16 md:pt-24">
        <p className="text-primary text-[11px] font-bold uppercase tracking-[0.3em] mb-6">
          {s("about_eyebrow", "Quem Somos")}
        </p>
        <h1 className="font-display text-5xl md:text-7xl leading-[0.95] mb-8 max-w-4xl text-balance">
          {s("about_title", "Um Parceiro de Confiança no Atlântico.")}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed whitespace-pre-line">
          {s(
            "about_intro",
            "Há mais de duas décadas que a CFS — Construções Figueiredo e Soares, S.A. constrói o futuro da Ilha da Boa Vista, evoluindo de uma construtora reconhecida pela qualidade técnica para uma promotora imobiliária de referência em Cabo Verde."
          )}
        </p>
      </div>

      <section className="max-w-7xl mx-auto mt-24 md:mt-32 grid md:grid-cols-2 gap-16 items-center">
        <img
          src={image}
          alt="Detalhe arquitetónico de uma obra CFS"
          loading="lazy"
          decoding="async"
          className="w-full aspect-[4/5] object-cover"
        />
        <div className="space-y-8">
          <Block
            number="01"
            title={s("about_block1_title", "A nossa história")}
            text={s(
              "about_block1_text",
              "Fundada com a missão de elevar o padrão da construção em Cabo Verde, a CFS começou como construtora civil e cresceu acompanhando o desenvolvimento da Ilha da Boa Vista. Hoje, somos uma referência tanto na execução técnica como na promoção imobiliária."
            )}
          />
          <Block
            number="02"
            title={s("about_block2_title", "Presença na Boa Vista")}
            text={s(
              "about_block2_text",
              "Com sede em Sal Rei, conhecemos profundamente a ilha — o seu território, as suas pessoas e o seu potencial. Esta proximidade permite-nos identificar as melhores oportunidades e executar projetos que respeitam o contexto local."
            )}
          />
          <Block
            number="03"
            title={s("about_block3_title", "Visão de futuro")}
            text={s(
              "about_block3_text",
              "Acreditamos que a Boa Vista é um dos destinos mais prometedores do Atlântico. Investimos em projetos que combinam qualidade construtiva, sustentabilidade e potencial de valorização para investidores nacionais e internacionais."
            )}
          />
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 mt-32 text-center">
        <p className="font-display italic text-3xl md:text-5xl leading-tight text-balance whitespace-pre-line">
          {s(
            "about_quote",
            '"Cada projeto é uma promessa que assumimos com os nossos clientes, parceiros e com a Ilha da Boa Vista."'
          )}
        </p>
        <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground">
          {s("about_quote_author", "CFS — Construções Figueiredo e Soares, S.A.")}
        </p>
        <Link
          to="/contactos"
          className="mt-12 inline-flex px-8 py-4 bg-primary text-primary-foreground text-[12px] font-bold uppercase tracking-widest"
        >
          Falar Connosco
        </Link>
      </section>
    </div>
  );
}

function Block({ number, title, text }: { number: string; title: string; text: string }) {
  return (
    <div className="border-t border-border pt-8">
      <div className="flex items-baseline gap-6 mb-3">
        <span className="font-display text-3xl text-primary">{number}</span>
        <h3 className="font-display text-2xl">{title}</h3>
      </div>
      <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-line">{text}</p>
    </div>
  );
}
