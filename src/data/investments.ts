import inv1 from "@/assets/investment-1.jpg";
import inv2 from "@/assets/investment-2.jpg";
import inv3 from "@/assets/investment-3.jpg";

export type Investment = {
  slug: string;
  name: string;
  tagline: string;
  location: string;
  status: string;
  heroImage: string;
  gallery: string[];
  description: string;
  highlights: string[];
  features: { label: string; value: string }[];
  coordinates: { lat: number; lng: number };
  featured: boolean;
};

export const investments: Investment[] = [
  {
    slug: "atlantic-residencial",
    name: "Atlantic Residencial Luxe",
    tagline: "Apartamentos premium frente ao Atlântico",
    location: "Sal Rei, Boa Vista",
    status: "Em comercialização",
    heroImage: inv1,
    gallery: [inv1, inv3, inv2],
    description:
      "Um conjunto exclusivo de apartamentos T1 a T3 com vista panorâmica sobre o Atlântico. Acabamentos premium, espaços generosos e uma localização privilegiada a poucos minutos das melhores praias da Boa Vista. Concebido para investidores e residentes que procuram a fusão perfeita entre conforto contemporâneo e a serenidade da ilha.",
    highlights: [
      "Frente de mar com vista panorâmica",
      "Acabamentos premium e materiais nobres",
      "Piscina, ginásio e zonas comuns ajardinadas",
      "Forte potencial de valorização e arrendamento turístico",
      "A 5 minutos do centro de Sal Rei",
    ],
    features: [
      { label: "Tipologias", value: "T1, T2 e T3" },
      { label: "Áreas", value: "65 a 145 m²" },
      { label: "Unidades", value: "48 apartamentos" },
      { label: "Entrega", value: "Q4 2026" },
    ],
    coordinates: { lat: 16.1779, lng: -22.9168 },
    featured: true,
  },
  {
    slug: "dunas-eco-resort",
    name: "Dunas Eco Resort — Phase II",
    tagline: "Bungalows sustentáveis nas dunas de Chaves",
    location: "Praia de Chaves, Boa Vista",
    status: "Pré-lançamento",
    heroImage: inv2,
    gallery: [inv2, inv1, inv3],
    description:
      "Investimento focado em sustentabilidade e turismo de alto rendimento. Bungalows independentes integrados nas dunas, com arquitetura em betão e madeira local, painéis solares e gestão hoteleira opcional. Uma oportunidade única de combinar lifestyle e rentabilidade num dos destinos turísticos mais prometedores do Atlântico.",
    highlights: [
      "Arquitetura sustentável e baixo impacto ambiental",
      "Programa de gestão hoteleira opcional (rentabilidade garantida)",
      "Acesso direto à Praia de Chaves",
      "Forte procura turística internacional",
      "Bungalows com piscina privada",
    ],
    features: [
      { label: "Tipologias", value: "Bungalows T2 e T3" },
      { label: "Áreas", value: "110 a 180 m²" },
      { label: "Unidades", value: "32 bungalows" },
      { label: "Entrega", value: "Q2 2027" },
    ],
    coordinates: { lat: 16.1167, lng: -22.9333 },
    featured: true,
  },
  {
    slug: "boavista-shore",
    name: "Boa Vista Shore Residences",
    tagline: "Residências contemporâneas frente ao oceano",
    location: "Sal Rei, Boa Vista",
    status: "Última fase",
    heroImage: inv3,
    gallery: [inv3, inv1, inv2],
    description:
      "Residências de design contemporâneo com fachadas em betão e pedra calcária local, varandas amplas e vista mar. Projeto pensado para quem procura uma segunda casa de excelência ou um investimento sólido num destino em ascensão.",
    highlights: [
      "Fachadas em betão aparente e pedra local",
      "Varandas privadas com vista mar",
      "Concierge e segurança 24/7",
      "Última fase em comercialização",
    ],
    features: [
      { label: "Tipologias", value: "T2 e T3 duplex" },
      { label: "Áreas", value: "95 a 220 m²" },
      { label: "Unidades", value: "24 residências" },
      { label: "Entrega", value: "Q3 2026" },
    ],
    coordinates: { lat: 16.1797, lng: -22.918 },
    featured: true,
  },
];

export const getInvestment = (slug: string) =>
  investments.find((i) => i.slug === slug);

export const featuredInvestments = investments.filter((i) => i.featured);
