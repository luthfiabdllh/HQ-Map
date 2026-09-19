'use client';

import { usePetaStore } from '@/store/peta.store';
import { dataLokasi } from '@/data/lokasi';
import { Marker } from './Marker';

/**
 * MarkerGroup — render semua marker yang kategorinya aktif di filter.
 * Bereaksi otomatis saat `visibleKategori` di store berubah.
 */
export function MarkerGroup() {
  const visibleKategori = usePetaStore((s) => s.visibleKategori);

  const lokasiVisible = dataLokasi.filter((l) =>
    visibleKategori.has(l.kategori)
  );

  return (
    <group name="markers">
      {lokasiVisible.map((lokasi) => (
        <Marker key={lokasi.id} lokasi={lokasi} />
      ))}
    </group>
  );
}
