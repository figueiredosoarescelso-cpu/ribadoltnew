import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const [stats, setStats] = useState({ inv: 0, obras: 0, leads: 0 });

  useEffect(() => {
    (async () => {
      const [a, b, c] = await Promise.all([
        supabase.from("investments").select("id", { count: "exact", head: true }),
        supabase.from("obras").select("id", { count: "exact", head: true }),
        supabase.from("leads").select("id", { count: "exact", head: true }),
      ]);
      setStats({ inv: a.count ?? 0, obras: b.count ?? 0, leads: c.count ?? 0 });
    })();
  }, []);

  const cards = [
    { label: "Investimentos", value: stats.inv, to: "/admin/investimentos" },
    { label: "Obras", value: stats.obras, to: "/admin/obras" },
    { label: "Leads", value: stats.leads, to: "/admin/leads" },
  ] as const;

  return (
    <div>
      <h1 className="font-display text-3xl">Dashboard</h1>
      <p className="text-sm text-muted-foreground mt-2">Gerir conteúdos do site.</p>

      <div className="grid sm:grid-cols-3 gap-4 mt-8">
        {cards.map((c) => (
          <Link
            key={c.label}
            to={c.to}
            className="block bg-background border border-border p-6 hover:border-primary transition-colors"
          >
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
              {c.label}
            </p>
            <p className="font-display text-4xl mt-2">{c.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
