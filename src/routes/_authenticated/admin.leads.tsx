import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/leads")({
  component: AdminLeads,
});

function AdminLeads() {
  const [list, setList] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      setList((data as any) || []);
    })();
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl mb-6">Leads</h1>
      <div className="bg-background border border-border divide-y divide-border">
        {list.length === 0 && <p className="p-6 text-sm text-muted-foreground">Sem leads.</p>}
        {list.map((l) => (
          <div key={l.id} className="p-4">
            <p className="font-semibold">
              {l.name}{" "}
              <span className="text-xs text-muted-foreground">· {l.email}</span>
            </p>
            {l.investment_slug && (
              <p className="text-xs text-primary mt-1">Sobre: {l.investment_slug}</p>
            )}
            {l.message && <p className="text-sm mt-2">{l.message}</p>}
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-2">
              {new Date(l.created_at).toLocaleString("pt-PT")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
