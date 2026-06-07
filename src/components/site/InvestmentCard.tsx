import { Link } from "@tanstack/react-router";
import type { Investment } from "@/data/investments";

export function InvestmentCard({
  investment,
  offset = false,
  badge,
  wide = false,
}: {
  investment: Investment;
  offset?: boolean;
  badge?: string;
  wide?: boolean;
}) {
  return (
    <Link
      to="/investimentos/$slug"
      params={{ slug: investment.slug }}
      className={`group block ${offset ? "md:translate-y-12" : ""}`}
    >
      <div
        className={`overflow-hidden bg-surface mb-6 relative ${
          wide ? "aspect-[16/10] md:aspect-[21/9]" : "aspect-[4/5]"
        }`}
      >
        <img
          src={investment.heroImage}
          alt={investment.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-4 left-4 px-3 py-1 bg-background/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-widest">
          {badge ?? investment.status}
        </div>
        {wide && (
          <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10 flex items-end justify-between gap-4 text-white">
            <div>
              <p className="text-white/80 text-[11px] font-bold uppercase tracking-widest mb-2">
                {investment.location}
              </p>
              <h3 className="font-display text-3xl md:text-5xl leading-tight max-w-2xl">
                {investment.name}
              </h3>
              <p className="text-white/90 text-sm md:text-base mt-2 max-w-xl">
                {investment.tagline}
              </p>
            </div>
            <ArrowButton large />
          </div>
        )}
      </div>
      {!wide && (
        <div className="flex justify-between items-start gap-4">
          <div>
            <p className="text-primary text-[11px] font-bold uppercase tracking-widest mb-2">
              {investment.location}
            </p>
            <h3 className="text-2xl font-display leading-tight">
              {investment.name}
            </h3>
            <p className="text-muted-foreground text-sm mt-2 max-w-xs leading-relaxed">
              {investment.tagline}
            </p>
          </div>
          <ArrowButton />
        </div>
      )}
    </Link>
  );
}

function ArrowButton({ large = false }: { large?: boolean }) {
  return (
    <div
      className={`shrink-0 bg-primary text-primary-foreground flex items-center justify-center transition-all group-hover:bg-primary/90 group-hover:translate-x-1 ${
        large ? "h-14 w-14 md:h-16 md:w-16" : "h-12 w-12"
      }`}
    >
      <svg
        width={large ? "20" : "16"}
        height={large ? "20" : "16"}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <path d="M5 12h14M13 5l7 7-7 7" />
      </svg>
    </div>
  );
}
