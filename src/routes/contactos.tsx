import { createFileRoute } from "@tanstack/react-router";
import { LeadForm } from "@/components/site/LeadForm";
import { useSettingsGetter } from "@/lib/cms";

export const Route = createFileRoute("/contactos")({
  head: () => ({
    meta: [
      { title: "Contactos — CFS | Construções Figueiredo e Soares" },
      {
        name: "description",
        content:
          "Contacte a CFS para saber mais sobre os nossos investimentos imobiliários na Ilha da Boa Vista, Cabo Verde.",
      },
      { property: "og:title", content: "Contactos — CFS" },
    ],
  }),
  component: ContactsPage,
});

function ContactsPage() {
  const s = useSettingsGetter();
  const phone = s("contact_phone", "+238 251 12 34");
  const email = s("contact_email", "info@cfs.cv");
  const address = s("contact_address", "Sal Rei\nIlha da Boa Vista\nCabo Verde");
  const wa = s("whatsapp_number", "238999999999").replace(/\D/g, "");

  return (
    <div className="px-6">
      <div className="max-w-7xl mx-auto pt-16 md:pt-24">
        <p className="text-primary text-[11px] font-bold uppercase tracking-[0.3em] mb-6">
          Contactos
        </p>
        <h1 className="font-display text-5xl md:text-7xl leading-[0.95] mb-8 max-w-3xl text-balance">
          Vamos conversar sobre o seu próximo investimento.
        </h1>
      </div>

      <div className="max-w-7xl mx-auto mt-20 md:mt-28 grid md:grid-cols-2 gap-16">
        <div className="space-y-10">
          <Info label="Sede" lines={address.split("\n")} />
          <Info label="Telefone" lines={[phone]} highlight />
          <Info label="Email" lines={[email]} highlight />
          {wa && (
            <Info
              label="WhatsApp"
              lines={[wa.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, "+$1 $2 $3 $4")]}
              highlight
              link={`https://wa.me/${wa}`}
            />
          )}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Redes sociais
            </p>
            <div className="flex gap-6 text-sm font-semibold">
              {s("social_instagram_url") && (
                <a href={s("social_instagram_url")} target="_blank" rel="noopener noreferrer" className="hover:text-primary">Instagram</a>
              )}
              {s("social_facebook_url") && (
                <a href={s("social_facebook_url")} target="_blank" rel="noopener noreferrer" className="hover:text-primary">Facebook</a>
              )}
              {s("social_linkedin_url") && (
                <a href={s("social_linkedin_url")} target="_blank" rel="noopener noreferrer" className="hover:text-primary">LinkedIn</a>
              )}
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-display text-3xl mb-6">Envie-nos uma mensagem</h2>
          <LeadForm source="pagina:contactos" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-24 md:mt-32 aspect-[16/9] overflow-hidden border border-border">
        <iframe
          src="https://www.google.com/maps?q=Sal+Rei,+Boa+Vista,+Cabo+Verde&z=12&output=embed"
          title="Localização CFS — Sal Rei, Boa Vista"
          loading="lazy"

          className="w-full h-full"
        />
      </div>
    </div>
  );
}

function Info({
  label,
  lines,
  highlight,
  link,
}: {
  label: string;
  lines: string[];
  highlight?: boolean;
  link?: string;
}) {
  const content = (
    <>
      <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground mb-3">
        {label}
      </p>
      {lines.map((l) => (
        <p
          key={l}
          className={`${highlight ? "text-2xl font-display" : "text-base"} leading-snug`}
        >
          {l}
        </p>
      ))}
    </>
  );
  return link ? (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block hover:text-primary">
      {content}
    </a>
  ) : (
    <div>{content}</div>
  );
}
