import { createFileRoute, Outlet, Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminLayout,
});

const items: { to: string; label: string; exact?: boolean }[] = [
  { to: "/admin", label: "Dashboard", exact: true },
  { to: "/admin/investimentos", label: "Investimentos" },
  { to: "/admin/obras", label: "Obras" },
  { to: "/admin/definicoes", label: "Textos do site" },
  { to: "/admin/leads", label: "Leads" },
];

function AdminLayout() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  async function logout() {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  }

  return (
    <div className="min-h-screen flex bg-surface">
      <aside className="w-60 bg-background border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <Link to="/" className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            ← Site
          </Link>
          <p className="font-display text-xl mt-2">CFS Admin</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {items.map((i) => {
            const active = i.exact ? pathname === i.to : pathname.startsWith(i.to);
            return (
              <Link
                key={i.to}
                to={i.to as never}
                className={`block px-3 py-2 text-sm rounded ${
                  active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                {i.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border">
          <button
            onClick={logout}
            className="w-full text-xs uppercase tracking-widest font-bold py-2 text-muted-foreground hover:text-destructive"
          >
            Terminar sessão
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-x-hidden">
        <div className="max-w-5xl mx-auto p-6 sm:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
