import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export function LeadForm({
  investmentName,
  investmentSlug,
  source = "geral",
}: {
  investmentName?: string;
  investmentSlug?: string;
  source?: string;
}) {
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitting(true);
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim() || null,
      country: String(data.get("country") ?? "").trim() || null,
      message:
        String(data.get("message") ?? "").trim() ||
        (investmentName ? `Interesse em ${investmentName}` : ""),
      investment_slug: investmentSlug ?? null,
      source,
    };

    const { error } = await supabase.from("leads").insert(payload);
    setSubmitting(false);

    if (error) {
      toast.error("Não foi possível enviar", { description: error.message });
      return;
    }
    toast.success("Mensagem enviada", {
      description: "Entraremos em contacto consigo brevemente.",
    });
    form.reset();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {investmentName && (
        <input type="hidden" name="investment" value={investmentName} />
      )}
      <div className="grid sm:grid-cols-2 gap-4">
        <Field name="name" label="Nome" required />
        <Field name="country" label="País" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field name="phone" label="Telefone / WhatsApp" />
        <Field name="email" label="Email" type="email" required />
      </div>
      {!investmentName && (
        <Field name="interest" label="Interesse" placeholder="Investimento, residência, contacto comercial…" />
      )}
      <div>
        <label className="block text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
          Mensagem
        </label>
        <textarea
          name="message"
          rows={4}
          required
          className="w-full bg-transparent border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
        />
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="px-8 py-4 bg-primary text-primary-foreground text-[12px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors disabled:opacity-60"
      >
        {submitting ? "A enviar…" : "Enviar mensagem"}
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  placeholder,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] font-bold uppercase tracking-widest text-muted-foreground mb-2">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full bg-transparent border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
      />
    </div>
  );
}
