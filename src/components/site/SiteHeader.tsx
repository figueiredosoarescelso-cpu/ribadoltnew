import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import logoCfs from "@/assets/logo-cfs.jpg";

const nav = [
  { to: "/", label: "Home" },
  { to: "/investimentos", label: "Investimentos" },
  { to: "/obras", label: "Obras" },
  { to: "/quem-somos", label: "Quem Somos" },
  { to: "/contactos", label: "Contactos" },
] as const;

const langs = ["PT", "EN", "FR", "IT"] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/90 backdrop-blur-md ${
        scrolled ? "border-b border-border shadow-sm" : "border-b border-border/40"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logoCfs}
            alt="CFS — Construções Figueiredo e Soares"
            className="h-10 w-auto object-contain"
            width={80}
            height={40}
          />
          <span className="hidden sm:inline text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
            Boa Vista
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={n.to === "/" ? { exact: true } : undefined}
              className="text-[13px] font-medium tracking-wide uppercase text-foreground hover:text-primary transition-colors"
              activeProps={{ className: "text-primary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 text-[11px] font-bold tracking-widest">
            {langs.map((l, i) => (
              <button
                key={l}
                className={
                  i === 0
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground transition-colors"
                }
                aria-label={`Mudar para ${l}`}
              >
                {l}
              </button>
            ))}
          </div>
          <button
            className="md:hidden p-2 -mr-2 text-foreground"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d={open ? "M6 6l12 12M6 18L18 6" : "M3 7h18M3 17h18"} />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="px-6 py-6 flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                activeOptions={n.to === "/" ? { exact: true } : undefined}
                className="text-base font-medium uppercase tracking-wide py-3 border-b border-border/50 hover:text-primary"
                activeProps={{ className: "text-primary" }}
              >
                {n.label}
              </Link>
            ))}
            <div className="flex gap-4 pt-4 border-t border-border text-[11px] font-bold tracking-widest">
              {langs.map((l, i) => (
                <button
                  key={l}
                  className={i === 0 ? "text-primary" : "text-muted-foreground"}
                >
                  {l}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
