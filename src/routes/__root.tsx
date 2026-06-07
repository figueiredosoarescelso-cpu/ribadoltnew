import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { StickyCTA } from "@/components/site/StickyCTA";
import { Toaster } from "sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-primary">404</p>
        <h1 className="mt-4 text-4xl font-display">Página não encontrada</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          A página que procura não existe ou foi movida.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground text-[12px] font-bold uppercase tracking-widest hover:bg-primary/90 transition-colors"
        >
          Voltar à Home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-display">Algo correu mal</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ocorreu um erro inesperado. Pode tentar novamente.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="px-6 py-3 bg-primary text-primary-foreground text-[12px] font-bold uppercase tracking-widest"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="px-6 py-3 border border-border text-[12px] font-bold uppercase tracking-widest"
          >
            Ir para a Home
          </a>
        </div>
      </div>
    </div>
  );
}

import { siteSettingsQueryOptions, publicInvestmentsQueryOptions, publicObrasQueryOptions } from "@/lib/cms";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.ensureQueryData(siteSettingsQueryOptions),
      context.queryClient.ensureQueryData(publicInvestmentsQueryOptions),
      context.queryClient.ensureQueryData(publicObrasQueryOptions),
    ]);
  },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CFS — Construções Figueiredo e Soares | Investimentos Imobiliários na Boa Vista" },
      {
        name: "description",
        content:
          "Promotora imobiliária na Ilha da Boa Vista, Cabo Verde. Investimentos premium, apartamentos e residências frente ao mar. Um Parceiro de Confiança.",
      },
      { name: "author", content: "CFS – Construções Figueiredo e Soares, S.A." },
      { property: "og:title", content: "CFS — Construções Figueiredo e Soares | Investimentos Imobiliários na Boa Vista" },
      { property: "og:description", content: "A premium real estate investment website for Boa Vista, Cape Verde, generating leads and promoting properties." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "pt_PT" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "CFS — Construções Figueiredo e Soares | Investimentos Imobiliários na Boa Vista" },
      { name: "description", content: "A premium real estate investment website for Boa Vista, Cape Verde, generating leads and promoting properties." },
      { name: "twitter:description", content: "A premium real estate investment website for Boa Vista, Cape Verde, generating leads and promoting properties." },
      { property: "og:image", content: "https://www.cfs.cv/og-cover.jpg" },
      { name: "twitter:image", content: "https://www.cfs.cv/og-cover.jpg" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isBare =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/ribadolt");
  return (
    <QueryClientProvider client={queryClient}>
      {isBare ? (
        <Outlet />
      ) : (
        <>
          <SiteHeader />
          <main className="min-h-screen pt-20 pb-20 md:pb-0">
            <Outlet />
          </main>
          <SiteFooter />
          <WhatsAppButton />
          <StickyCTA />
        </>
      )}
      <Toaster position="bottom-left" />
    </QueryClientProvider>
  );
}
