# Prodclas — Maison de Ceramică

Site complet cu admin panel pentru Prodclas.md. **Next.js 15** (App Router) + **Supabase** (Postgres + Auth + Storage).

## Ce ai în pachet

- **Site public** cu 5 pagini: Acasă, Produse (catalog cu filtre), Promoții, Arhitecți, Contacte
- **Admin panel** la `/admin` cu CRUD pentru:
  - Produse (cu upload imagine)
  - Colecții
  - Promoții (cu upload imagine)
  - Articole (pentru blog viitor, cu cover image)
  - Inbox (mesaje de la formularele de contact)
- **23 de produse seedate** cu prețurile și datele originale
- **Server actions** pentru toate operațiunile (zero API routes manuale)
- **ISR** (Incremental Static Regeneration) — paginile publice se regenerează la 60s sau imediat după edit
- **RLS policies** pe Supabase — public read, doar admin scrie
- **SEO-ready** — metadata, sitemap auto via Next, server-side rendering

## Instalare rapidă

### 1. Creează proiect Supabase

1. Mergi pe [supabase.com](https://supabase.com) → New Project
2. Salvează **Database password** undeva (nu o vei vedea din nou)
3. Așteaptă 1-2 min să se aprovizioneze

### 2. Rulează schema SQL

În Supabase Dashboard:
- **SQL Editor** → **New Query**
- Copiază tot conținutul din `supabase/schema.sql`
- Click **Run**

Asta creează:
- 5 tabele (collections, products, promotions, articles, contact_submissions)
- Row Level Security pe toate
- Bucket de storage pentru poze
- Triggere pentru `updated_at` automat

### 3. Creează user admin

- **Authentication** → **Users** → **Add user** → **Create new user**
- Email + parolă (bifează "Auto Confirm User")
- Acest user va putea intra pe `/admin`

### 4. Configurează env vars

```bash
cp .env.local.example .env.local
```

Editează `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL` → din Settings → API → "Project URL"
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` → din Settings → API → "anon public"
- `SUPABASE_SERVICE_ROLE_KEY` → din Settings → API → "service_role" (DOAR pentru seed, nu îl pune în prod)

### 5. Instalează și rulează

```bash
npm install
npm run db:seed      # populează cele 23 de produse
npm run dev          # http://localhost:3000
```

Admin: http://localhost:3000/admin (login cu user-ul creat la pasul 3)

## Deploy pe Vercel

1. Push proiectul pe GitHub
2. [vercel.com](https://vercel.com) → New Project → Import repo
3. Adaugă env vars în Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - (NU adăuga service_role în Vercel — nu e necesar la runtime)
4. Deploy

Domeniu custom: Vercel → Project → Settings → Domains → adaugă `prodclas.md`. Vei primi DNS records de pus la registrar.

## Cum să adaugi conținut

### Adăugare produs

1. Login pe `/admin`
2. **Produse** → **+ Adaugă produs**
3. Completează numele, slug-ul (URL-friendly, fără diacritice), colecția, prețul
4. **Image**: încarcă o poză JPG/PNG (recomandat 800×1000px, sub 5MB) — automat se urcă în Supabase Storage și se generează URL public
5. Bifează **Featured** dacă vrei să apară pe homepage la "Selecția sezonului"
6. **Salvează**

Modificarea apare instant pe site (revalidatePath rulează automat).

### Promoții și articole

Aceeași flux. Promoțiile inactive sunt ascunse public; articolele nepublicate la fel.

### Mesaje primite

Toate formularele (contact, aplicații arhitecți, newsletter) ajung în **Inbox**. Apare badge pe homepage cu numărul de necitite.

## Structură proiect

```
src/
├── app/
│   ├── (public pages)/        # /, /produse, /promotii, /arhitecti, /contacte
│   ├── admin/                  # toata zona admin (protejata via middleware)
│   │   ├── produse/           # listare, [id] editare, nou creare
│   │   ├── promotii/
│   │   ├── colectii/
│   │   ├── articole/
│   │   ├── inbox/
│   │   ├── login/
│   │   ├── layout.tsx         # sidebar admin
│   │   └── page.tsx           # dashboard
│   ├── actions/contact.ts     # server actions pentru formulare publice
│   └── layout.tsx             # root
├── components/
│   ├── admin/                  # forms pentru admin
│   └── ...                     # Nav, Footer, ProductCard, etc.
├── lib/
│   ├── supabase/
│   │   ├── client.ts          # browser client
│   │   └── server.ts          # server client
│   ├── data.ts                # query helpers
│   ├── types.ts               # TypeScript types
│   ├── placeholder.ts         # SVG fallback pentru produse fara poza
│   └── interiors.ts           # decoruri SVG pentru hero
└── middleware.ts              # refresh session + protejeaza /admin
supabase/schema.sql            # tot SQL-ul, ruleaza o data
scripts/seed.mjs               # popureaza DB cu produse initiale
```

## Customizări utile

### Schimbă paleta de culori

`tailwind.config.ts` → secțiunea `colors`. Toate componentele folosesc tokens (bg, ink, brass) deci o schimbare se propagă peste tot.

### Adaugă pagină de articole publice

Articolele sunt deja în DB. Pentru a le afișa public, creează `src/app/articole/page.tsx` și folosește `getArticles()` din `lib/data.ts`.

### Modifică câmpurile unui produs

1. Adaugă coloana în SQL (`alter table products add column ...`)
2. Actualizează tipul în `src/lib/types.ts`
3. Adaugă field-ul în `src/components/admin/ProductForm.tsx`
4. Adaugă în `parseForm` în `src/app/admin/produse/actions.ts`

## Stack & costuri

- **Next.js 15** (App Router, React 19) — gratuit
- **Vercel Hobby** — gratuit (100GB bandwidth/lună, suficient pentru un site B2B)
- **Supabase Free Tier**:
  - 500MB Postgres
  - 1GB Storage (cam 200-400 poze produse)
  - 50,000 monthly active users (pentru auth)
  - Suficient pentru anii următori

**Total: 0 lei/lună** până la trafic mare. Când treci de free tier, Supabase Pro = $25/lună.

## Probleme cunoscute

- Pozele placeholder (SVG generat) apar până clientul încarcă poze reale prin admin
- Editorul de articole e textarea simplu. Dacă vrei rich text (bold/italic/imagini inline), poți adăuga TipTap sau Editor.js — vreo 2 ore de muncă
- Newsletter-ul din footer doar salvează emailuri în DB. Pentru a trimite efectiv newslettere, integrează Resend sau Brevo (5 minute)

## Comenzi disponibile

```bash
npm run dev      # development
npm run build    # production build
npm start        # rulează build-ul
npm run lint     # ESLint
npm run db:seed  # populează DB cu produse
```
