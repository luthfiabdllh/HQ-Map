# HQ-Map — Peta 3D Interaktif Agrowisata

Aplikasi web 3D interaktif berbasis **React Three Fiber** + **Next.js 16** untuk memetakan kawasan agrowisata perkebunan secara visual. Dirancang sebagai alat presentasi bagi investor/stakeholder sekaligus alat kerja teknis untuk tim perencanaan.

> 🌿 Akses peta di: [http://localhost:3000/peta](http://localhost:3000/peta) — publik, tanpa login.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Arsitektur Peta 3D](#arsitektur-peta-3d)
- [Menambah Fitur / Feature Domain](#menambah-fitur--feature-domain)
- [Auth & Keamanan](#auth--keamanan)
- [Testing](#testing)
- [CI/CD Pipeline](#cicd-pipeline)
- [Available Scripts](#available-scripts)

---

## Tech Stack

| Kategori | Teknologi |
|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript 5 (strict mode) |
| **Rendering 3D** | React Three Fiber + `@react-three/drei` |
| **Styling** | Tailwind CSS v4 (CSS-first) + shadcn/ui |
| **UI Components** | shadcn/ui + Radix UI + Lucide Icons |
| **Server State** | TanStack Query v5 (+ RSC prefetching) |
| **UI State** | Zustand v5 |
| **Forms** | React Hook Form + Zod v4 |
| **HTTP Client** | Axios (with refresh token interceptor) |
| **Auth** | httpOnly cookies + `jose` (JWT verification) |
| **Env Validation** | T3 Env (`@t3-oss/env-nextjs`) |
| **Unit Tests** | Vitest + Testing Library |
| **E2E Tests** | Playwright (Chromium, Mobile) |
| **Git Hooks** | Husky v9 + lint-staged |
| **CI/CD** | GitHub Actions |

---

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (HTML, providers, Toaster)
│   ├── page.tsx                  # Root → redirect ke /dashboard
│   ├── globals.css               # Tailwind v4 + shadcn CSS variables
│   ├── peta/
│   │   └── page.tsx              # 🗺 Halaman peta 3D (publik)
│   ├── (auth)/
│   │   └── login/page.tsx        # Halaman login
│   ├── (dashboard)/
│   │   ├── layout.tsx            # ⚠️ Authoritative JWT check di sini
│   │   └── dashboard/page.tsx    # Dashboard utama
│   └── api/
│       └── auth/
│           ├── login/route.ts    # BFF: validasi + set cookie
│           ├── logout/route.ts   # BFF: hapus cookie
│           └── refresh/route.ts  # BFF: refresh token
├── components/
│   ├── ui/                       # shadcn/ui primitives (jangan diedit langsung)
│   └── layouts/                  # Shell komponen
│       ├── dashboard-header.tsx
│       └── dashboard-sidebar.tsx
├── data/
│   └── lokasi.ts                 # 🗺 Data marker lokasi (placeholder, ganti saat GLB tersedia)
├── features/
│   ├── auth/                     # Domain autentikasi
│   │   ├── api/                  # query-keys, server-fetch, hooks
│   │   ├── components/           # login-form.tsx
│   │   └── types/index.ts        # Zod schemas + TS types
│   └── peta/                     # 🗺 Domain peta 3D
│       ├── components/
│       │   ├── PetaCanvas.tsx        # Canvas utama (Canvas + OrbitControls)
│       │   ├── PetaCanvasLoader.tsx  # Client wrapper dynamic import ssr:false
│       │   ├── PetaControls.tsx      # Panel UI: search + filter kategori
│       │   ├── PetaControlPad.tsx    # D-pad on-screen (zoom, pan, reset)
│       │   ├── TerrainPlaceholder.tsx# Terrain sementara (ganti dengan GLB)
│       │   ├── MarkerGroup.tsx       # Render marker berdasarkan filter aktif
│       │   ├── Marker.tsx            # Marker 3D per lokasi
│       │   └── LokasiPopup.tsx       # Popup info (Html dari drei)
│       ├── hooks/
│       │   └── useKameraAnimasi.ts   # KameraController: lerp fly-to
│       └── types.ts                  # LokasiItem, Kategori, WARNA_KATEGORI
├── lib/
│   ├── api-client.ts             # Axios + refresh interceptor
│   ├── get-query-client.ts       # Singleton QueryClient (React cache)
│   ├── verify-session.ts         # jose JWT verification (server-only)
│   └── utils.ts                  # cn(), formatDate(), dsb.
├── providers/
│   └── query-provider.tsx        # TanStack Query provider
├── store/
│   ├── ui.store.ts               # Zustand: sidebar, theme
│   └── peta.store.ts             # 🗺 Zustand: selectedLokasi, visibleKategori, kameraTarget
├── proxy.ts                      # ⚠️ Next.js 16 proxy (bukan middleware.ts)
└── env.ts                        # T3 Env schema (divalidasi saat startup)

e2e/
└── auth.spec.ts                  # Playwright E2E (auth flow)

.github/
└── workflows/
    └── ci.yml                    # GitHub Actions: Lint→TS→Test→Build→E2E
```

---

## Getting Started

### 1. Clone dan install

```bash
git clone <your-repo-url> hq-map
cd hq-map
npm install
```

### 2. Konfigurasi environment

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
BACKEND_API_URL=https://api.your-backend.com
JWT_SECRET=your-secret-key-at-least-32-characters-long
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
ALLOWED_ORIGINS=http://localhost:3000
```

> **Penting:** `JWT_SECRET` harus **sama** dengan yang dipakai backend untuk menandatangani JWT.

### 3. Mulai development

```bash
npm run dev
```

- Buka [http://localhost:3000/peta](http://localhost:3000/peta) → **Peta 3D Agrowisata** (publik)
- Buka [http://localhost:3000/dashboard](http://localhost:3000/dashboard) → Dashboard (membutuhkan login)

---

## Environment Variables

| Variable | Sisi | Keterangan |
|---|---|---|
| `BACKEND_API_URL` | Server | Base URL backend (contoh: `https://api.example.com`) |
| `JWT_SECRET` | Server | Secret verifikasi JWT (min 32 karakter) |
| `ACCESS_TOKEN_TTL` | Server | Masa berlaku access token dalam detik (default: `900`) |
| `REFRESH_TOKEN_TTL` | Server | Masa berlaku refresh token dalam detik (default: `604800`) |
| `ALLOWED_ORIGINS` | Server | Daftar origin yang diizinkan (pisah koma) |
| `NEXT_PUBLIC_APP_URL` | Client | URL publik aplikasi |
| `NEXT_PUBLIC_API_URL` | Client | URL BFF API publik (biasanya `<APP_URL>/api`) |

Semua variabel divalidasi saat startup via **T3 Env** (`src/env.ts`).

---

## Arsitektur Peta 3D

### Kontrol Kamera

| Platform | Geser (Pan) | Rotasi | Zoom |
|---|---|---|---|
| **Desktop** | Klik kiri + seret | Klik kanan + seret | Scroll |
| **Mobile** | 1 jari | 2 jari drag | 2 jari pinch |
| **Tombol layar** | D-pad ↑↓←→ | — | Tombol +/− |

### Mengganti Terrain Placeholder dengan Model Blender

Saat model GLB dari Blender sudah tersedia:

1. Letakkan file di `public/models/terrain.glb`
2. Edit `src/features/peta/components/TerrainPlaceholder.tsx`, ganti isi dengan:
   ```tsx
   import { useGLTF } from '@react-three/drei';
   
   export function TerrainPlaceholder() {
     const { scene } = useGLTF('/models/terrain.glb');
     return <primitive object={scene} />;
   }
   ```
3. Update koordinat `posisi` di `src/data/lokasi.ts` sesuai koordinat aktual di scene Blender.

### Menambah Lokasi Marker

Edit `src/data/lokasi.ts`:

```ts
{
  id: 'lokasi-baru',
  nama: 'Nama Lokasi',
  kategori: 'kebun', // 'kebun' | 'fasilitas' | 'air' | 'bangunan'
  posisi: { x: 10, y: 0, z: -20 }, // koordinat 3D
  deskripsi: 'Deskripsi singkat lokasi ini.',
  jamOperasional: '08:00 - 17:00',
}
```

---

## Auth & Keamanan

### Two-Layer Auth

```
Request → [Layer 1: proxy.ts] → [Layer 2: dashboard layout]
```

**Layer 1 — `src/proxy.ts` (Thin Check)**
- Cek *keberadaan* cookie saja (`access_token` ada atau tidak)
- Validasi CSRF origin pada request mutating
- **TIDAK** verifikasi JWT (mencegah logout loop)
- Redirect ke `/login` jika cookie tidak ada

**Layer 2 — `src/app/(dashboard)/layout.tsx` (Authoritative Check)**
- Memanggil `verifySession()` — verifikasi signature + algoritma + expiry via `jose`
- Menangkap token invalid meskipun Layer 1 dilewati
- Redirect ke `/login` jika token invalid atau expired

> ⚠️ **Jangan** verifikasi JWT di `proxy.ts`. Selalu lakukan di Server Component layout.

### BFF Route Handlers

`src/app/api/auth/` bertindak sebagai **Backend For Frontend (BFF)**:
- Menerima request dari client (via Axios)
- Meneruskan ke backend sebenarnya
- Set/hapus `httpOnly` cookie — **client JS tidak pernah menyentuh token secara langsung**

---

## Menambah Fitur / Feature Domain

Ikuti struktur domain `auth` sebagai blueprint. Buat `src/features/nama-fitur/`:

```
src/features/produk/
├── api/
│   ├── query-keys.ts        # Factory cache key
│   ├── server-fetch.ts      # Fetch server-only (gunakan native fetch)
│   ├── use-queries.ts       # Hook TanStack Query
│   └── use-mutations.ts     # Hook TanStack Mutation
├── components/
│   └── produk-form.tsx
├── hooks/
└── types/
    └── index.ts             # Zod schemas + TS types
```

**Checklist:**
- [ ] Zod schema di `types/index.ts`
- [ ] Query key factory di `api/query-keys.ts`
- [ ] Server fetch di `api/server-fetch.ts` (native `fetch`, bukan Axios)
- [ ] Client hooks di `api/use-queries.ts` + `use-mutations.ts` (gunakan `apiClient` Axios)
- [ ] Prefetch di Server Component dengan `HydrationBoundary`
- [ ] BFF Route Handler di `src/app/api/nama-fitur/route.ts` jika perlu
- [ ] Unit test untuk schema dan query keys
- [ ] Skenario E2E di `e2e/`

---

## Testing

### Unit Tests (Vitest)

```bash
# Jalankan semua unit test + coverage
npm run test:unit

# Mode watch (saat development)
npm run test:unit:watch
```

Test berada di `src/**/__tests__/`. Coverage report di folder `coverage/`.

### E2E Tests (Playwright)

```bash
# Install browser (hanya pertama kali)
npx playwright install --with-deps chromium

# Jalankan semua E2E test
npm run test:e2e

# Buka Playwright UI
npm run test:e2e:ui
```

---

## CI/CD Pipeline

GitHub Actions (`.github/workflows/ci.yml`) berjalan setiap push ke `main` dan setiap pull request:

```
1. Lint        — ESLint across src/
2. TypeScript  — tsc --noEmit
3. Unit Tests  — Vitest with coverage
4. Build       — next build
5. E2E Tests   — Playwright on Chromium
```

---

## Available Scripts

| Command | Keterangan |
|---|---|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Build untuk production |
| `npm run start` | Start production server |
| `npm run lint` | Jalankan ESLint |
| `npm run typecheck` | TypeScript compiler check |
| `npm run test:unit` | Vitest dengan coverage |
| `npm run test:unit:watch` | Vitest mode watch |
| `npm run test:e2e` | Playwright E2E tests |
| `npm run test:e2e:ui` | Playwright UI mode |

---

## License

MIT
