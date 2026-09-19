import { create } from 'zustand';
import type { LokasiItem, Kategori, KameraTarget } from '@/features/peta/types';

interface PetaStore {
  /** Lokasi yang popup-nya sedang terbuka */
  selectedLokasi: LokasiItem | null;
  setSelectedLokasi: (lokasi: LokasiItem | null) => void;

  /** Set kategori yang saat ini ditampilkan markernya */
  visibleKategori: Set<Kategori>;
  toggleKategori: (kategori: Kategori) => void;
  setAllKategori: (visible: boolean) => void;

  /** Target animasi kamera (fly-to) */
  kameraTarget: KameraTarget | null;
  setKameraTarget: (target: KameraTarget | null) => void;
}

const SEMUA_KATEGORI: Kategori[] = ['kebun', 'fasilitas', 'air', 'bangunan'];

export const usePetaStore = create<PetaStore>((set) => ({
  selectedLokasi: null,
  setSelectedLokasi: (lokasi) => set({ selectedLokasi: lokasi }),

  visibleKategori: new Set(SEMUA_KATEGORI),
  toggleKategori: (kategori) =>
    set((state) => {
      const next = new Set(state.visibleKategori);
      if (next.has(kategori)) {
        next.delete(kategori);
      } else {
        next.add(kategori);
      }
      return { visibleKategori: next };
    }),
  setAllKategori: (visible) =>
    set({
      visibleKategori: visible ? new Set(SEMUA_KATEGORI) : new Set(),
    }),

  kameraTarget: null,
  setKameraTarget: (target) => set({ kameraTarget: target }),
}));
