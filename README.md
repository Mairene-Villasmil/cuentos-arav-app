# Cuentos ARAV

Tienda de libros infantiles personalizados. Reescrita desde cero en Next.js
(App Router) a partir de la maqueta visual generada originalmente con
[Lovable](https://lovable.dev) (repo [`cuentos-arav`](https://github.com/Mairene-Villasmil/cuentos-arav)).

## Stack

- **Next.js 15** (App Router, Server Actions)
- **Prisma 6** + **PostgreSQL** (Supabase / Neon)
- **NextAuth (Auth.js) v5** — credenciales + JWT, roles `user` / `admin`
- **Tailwind CSS v4** + componentes propios estilo shadcn/ui (Radix UI)
- **Zustand** para el carrito (persistido en `localStorage`)

## Setup local

1. Instalá dependencias:

   ```sh
   npm install
   ```

2. Copiá `.env.example` a `.env` y completá `DATABASE_URL` con tu connection
   string de Supabase o Neon. Generá `AUTH_SECRET` con:

   ```sh
   npx auth secret
   ```

3. Corré las migraciones y el seed:

   ```sh
   npm run db:migrate
   npm run db:seed
   ```

   El seed crea un usuario admin (`admin@cuentosarav.com`, contraseña definida
   en `SEED_ADMIN_PASSWORD`) y los 6 libros de ejemplo.

4. Levantá el servidor de desarrollo:

   ```sh
   npm run dev
   ```

## Estructura

- `src/app/(site)` — sitio público (catálogo, detalle de libro, carrito,
  cuenta, páginas informativas).
- `src/app/admin` — panel de administración (protegido por rol `admin`).
- `src/actions` — Server Actions (auth, pedidos, contacto, admin).
- `prisma/schema.prisma` — modelo de datos.
- `prisma/seed.ts` — datos de ejemplo.
