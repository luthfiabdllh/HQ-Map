import type { Metadata } from 'next';
import { PetaCanvasLoader } from '@/features/peta/components/PetaCanvasLoader';

export const metadata: Metadata = {
  title: 'Peta Agrowisata | HQ-Map',
  description:
    'Jelajahi kawasan agrowisata perkebunan secara interaktif — lihat kebun, kolam, fasilitas, dan bangunan dalam tampilan peta 3D.',
};

/**
 * PetaPage — Server Component (RSC).
 * Rendering 3D (WebGL) didelegasikan ke PetaCanvasLoader,
 * sebuah Client Component yang menangani dynamic import dengan ssr:false.
 *
 * `ssr: false` tidak diperbolehkan langsung di Server Component di Next.js 16.
 */
export default function PetaPage() {
  return (
    <main
      id="peta-utama"
      aria-label="Peta 3D Agrowisata"
      style={{ overflow: 'hidden' }}
    >
      <PetaCanvasLoader />
    </main>
  );
}
