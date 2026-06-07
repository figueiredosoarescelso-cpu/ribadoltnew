## Área de Administrador — Plano

Site público continua igual, mas passa a ler conteúdos da base de dados (Lovable Cloud) em vez dos ficheiros estáticos. Tu acedes a `/admin` com login e geres tudo.

### 1. Base de dados

Tabelas a criar:

- **investments** — slug, name, tagline, location, status, hero_image, description, highlights (json), features (json), gallery (json), lat, lng, featured (bool), is_featured_home (bool — só um pode estar a true), sort_order, published
- **obras** — name, location, year, status, image, description, sort_order, published
- **site_settings** — pares chave/valor (textos da home, hero, institucional, contactos, telefone, email, morada)
- **leads** — formulários de contacto (já preparado para fase futura)
- **user_roles** — tabela separada (segurança correta, sem privilege escalation) com role `admin`
- Função `has_role(user_id, role)` (security definer) para RLS

### 2. Storage

Bucket público `media` para upload de fotos (hero, galerias, obras).

### 3. Autenticação

- Login por **email/password** + **Google**
- A primeira conta que criares fica automaticamente como admin (via trigger no primeiro signup)
- Página `/login` pública

### 4. Painel `/admin` (rota protegida)

Layout com sidebar e estas secções:

- **Dashboard** — visão geral (nº investimentos, obras, leads)
- **Investimentos** — listar, criar, editar, eliminar, **marcar como destaque da home**, ordenar, upload do hero + galeria
- **Obras** — CRUD + upload de imagem
- **Textos do site** — editar todos os textos da home (hero, institucional, CTAs) e dados de contactos
- **Leads** (preparado, vazio para já)
- **Sair**

Botão "Admin" discreto aparece no header **apenas** quando estás autenticado como admin.

### 5. Site público

As páginas (`/`, `/investimentos`, `/investimentos/$slug`, `/obras`, `/contactos`) passam a carregar dados da BD via `createServerFn` (com SSR para SEO).

O investimento marcado como "destaque da home" é o que abre quando se clica "Ver Investimento" no hero.

Os ficheiros estáticos atuais (`src/data/investments.ts` e `src/data/obras.ts`) ficam como **seed inicial** — corro um script de seed para que arranques já com os dados que tens hoje.

### 6. RLS (segurança)

- Leitura pública: investments (published=true), obras (published=true), site_settings
- Escrita: só admins (via `has_role()`)
- Leads: insert público, leitura só admins
- Storage `media`: leitura pública, upload só admins

---

### O que precisas fazer depois de eu construir

1. Ir a `/login` e criar a tua conta com o teu email → ficas admin automaticamente
2. Entrar em `/admin` e começar a gerir

### Fora do âmbito (para fases futuras se quiseres)

- Multi-idioma (EN/FR/IT) — a estrutura fica preparada mas só PT preenchido
- Notificações email de novos leads
- Drag-to-reorder com mouse (por agora ordenas por número)
- Editor rich-text (por agora textos simples e markdown leve)

Confirmas que avanço com tudo isto?