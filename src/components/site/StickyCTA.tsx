import { Link } from "@tanstack/react-router";
import { useWhatsAppHref } from "./WhatsAppButton";

export function StickyCTA() {
  const waHref = useWhatsAppHref();

  return (
    <>
      {/* Mobile: full-width bottom bar with WhatsApp inline */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-30 overflow-hidden border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_3rem] gap-2 p-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]">
          <Link
            to="/investimentos"
            className="min-w-0 text-center px-2 py-3 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wide hover:bg-primary/90 transition-colors"
          >
            Investimentos
          </Link>
          <Link
            to="/contactos"
            className="min-w-0 text-center px-2 py-3 border border-foreground text-foreground text-[10px] font-bold uppercase tracking-wide hover:bg-foreground hover:text-background transition-colors"
          >
            Contactar
          </Link>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Falar via WhatsApp"
            className="h-full w-12 flex items-center justify-center bg-[#25D366] text-white hover:opacity-90 transition-opacity"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Desktop: floating CTA pair, positioned left of WhatsApp button */}
      <div className="hidden md:flex fixed bottom-6 right-28 z-30 items-center gap-2">
        <Link
          to="/investimentos"
          className="px-5 py-3 bg-background/90 backdrop-blur border border-border text-foreground text-[11px] font-bold uppercase tracking-widest shadow-lg hover:bg-foreground hover:text-background transition-colors"
        >
          Investimentos
        </Link>
        <Link
          to="/contactos"
          className="px-5 py-3 bg-primary text-primary-foreground text-[11px] font-bold uppercase tracking-widest shadow-lg hover:bg-primary/90 transition-colors"
        >
          Contactar
        </Link>
      </div>
    </>
  );
}
