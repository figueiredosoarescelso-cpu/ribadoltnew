import { Link } from "@tanstack/react-router";
import { useSettingsGetter } from "@/lib/cms";

export function SiteFooter() {
  const s = useSettingsGetter();
  const phone = s("contact_phone", "");
  const email = s("contact_email", "");
  const address = s("contact_address", "Sal Rei\nIlha da Boa Vista\nCabo Verde");
  const instagram = s("social_instagram_url", "");
  const facebook = s("social_facebook_url", "");
  const linkedin = s("social_linkedin_url", "");

  return (
    <footer className="border-t border-border pt-20 pb-32 md:pb-28 px-6 mt-32">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <span className="font-display text-3xl text-primary block mb-4">
              CFS
            </span>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Construções Figueiredo e Soares, S.A. — promotora imobiliária e
              construtora de referência na Ilha da Boa Vista, Cabo Verde.
            </p>
            <p className="font-display italic text-lg mt-6 text-foreground">
              "Um Parceiro de Confiança"
            </p>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest mb-5 text-foreground">
              Navegação
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/investimentos" className="hover:text-primary">Investimentos</Link></li>
              <li><Link to="/obras" className="hover:text-primary">Obras</Link></li>
              <li><Link to="/quem-somos" className="hover:text-primary">Quem Somos</Link></li>
              <li><Link to="/contactos" className="hover:text-primary">Contactos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest mb-5 text-foreground">
              Contacto
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {address.split("\n").map((line) => (
                <li key={line}>{line}</li>
              ))}
              {phone && <li className="text-foreground font-medium">{phone}</li>}
              {email && <li>{email}</li>}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border gap-6">
          <p className="text-[11px] text-muted-foreground uppercase tracking-widest">
            © {new Date().getFullYear()} CFS, S.A. • Todos os direitos reservados
          </p>
          <div className="flex gap-6 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
            {instagram && (
              <a href={instagram} target="_blank" rel="noopener noreferrer" className="hover:text-primary">Instagram</a>
            )}
            {facebook && (
              <a href={facebook} target="_blank" rel="noopener noreferrer" className="hover:text-primary">Facebook</a>
            )}
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-primary">LinkedIn</a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
