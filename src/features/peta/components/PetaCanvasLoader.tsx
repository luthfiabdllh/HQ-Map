'use client';

import dynamic from 'next/dynamic';

/**
 * PetaCanvasLoader — Client Component wrapper yang menangani dynamic import
 * PetaCanvas dengan ssr:false.
 *
 * `ssr: false` hanya diperbolehkan di Client Components di Next.js 16.
 * Halaman (RSC) cukup mengimport komponen ini.
 */
const PetaCanvas = dynamic(
  () =>
    import('./PetaCanvas').then((m) => m.PetaCanvas),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a1a0a 0%, #0d2b1a 50%, #0a1a0a 100%)',
          color: '#86efac',
          fontFamily: 'Inter, sans-serif',
          gap: 16,
        }}
      >
        <div style={{ fontSize: 48 }}>🌿</div>
        <div style={{ fontSize: 18, fontWeight: 700 }}>Memuat Peta Agrowisata...</div>
        <div style={{ fontSize: 13, color: '#4ade80', opacity: 0.7 }}>
          Menyiapkan scene 3D interaktif
        </div>
      </div>
    ),
  }
);

export function PetaCanvasLoader() {
  return <PetaCanvas />;
}
