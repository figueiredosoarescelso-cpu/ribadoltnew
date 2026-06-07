import o1 from "@/assets/obra-1.jpg";
import o2 from "@/assets/obra-2.jpg";
import o3 from "@/assets/obra-3.jpg";
import o4 from "@/assets/obra-4.jpg";

export type Obra = {
  id: string;
  name: string;
  location: string;
  year: string;
  status: string;
  image: string;
  description: string;
};

export const obras: Obra[] = [
  {
    id: "marina-boavista",
    name: "Edifício Marina Boa Vista",
    location: "Sal Rei",
    year: "2023",
    status: "Concluído",
    image: o1,
    description: "Edifício residencial e comercial de referência em Sal Rei.",
  },
  {
    id: "santa-maria",
    name: "Urbanização Santa Maria",
    location: "Boa Vista",
    year: "2024",
    status: "Em execução • 85%",
    image: o2,
    description: "Conjunto residencial com 60 unidades e zonas verdes.",
  },
  {
    id: "shore-residences",
    name: "Boa Vista Shore Residences",
    location: "Sal Rei",
    year: "2022",
    status: "Concluído",
    image: o3,
    description: "Residências contemporâneas frente ao mar.",
  },
  {
    id: "vila-cabral",
    name: "Vila Cabral Resort",
    location: "Boa Vista",
    year: "2021",
    status: "Concluído",
    image: o4,
    description: "Complexo turístico com 120 unidades.",
  },
];
