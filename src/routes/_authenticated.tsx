import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useIsAdmin } from "@/lib/use-admin";

export const Route = createFileRoute("/_authenticated")({
  head: () => ({ meta: [{ name: "robots", content: "noindex" }] }),
  component: AuthGate,
});

function AuthGate() {
  const navigate = useNavigate();
  const { isAdmin, loading, session } = useIsAdmin();

  useEffect(() => {
    if (loading) return;
    if (!session) navigate({ to: "/login" });
  }, [session, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
        A verificar sessão…
      </div>
    );
  }

  if (!session) return null;

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h1 className="font-display text-3xl">Acesso não autorizado</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            A sua conta não tem permissões de administrador.
          </p>
        </div>
      </div>
    );
  }

  return <Outlet />;
}
