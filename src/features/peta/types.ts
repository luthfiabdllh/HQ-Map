/**
 * Tipe data untuk fitur Peta 3D Agrowisata
 * Koordinat X,Y,Z sesuai skala model 3D hasil export Blender.
 * Saat model Blender tersedia, nilai `posisi` di lokasi.ts yang perlu disesuaikan.
 */

export type Kategori = 'kebun' | 'fasilitas' | 'air' | 'bangunan';

export interface Posisi3D {
  x: number;
  y: number;
  z: number;
}

export interface LokasiItem {
  id: string;
  nama: string;
  kategori: Kategori;
  posisi: Posisi3D;
  deskripsi: string;
  foto?: string;
  jamOperasional?: string;
}

export interface KameraTarget {
  posisi: Posisi3D;
  lokasiId: string;
}

/** Warna per kategori — konsisten antara marker 3D dan badge UI */
export const WARNA_KATEGORI: Record<Kategori, string> = {
  kebun: '#22c55e',     // green-500
  fasilitas: '#f59e0b', // amber-500
  air: '#3b82f6',       // blue-500
  bangunan: '#8b5cf6',  // violet-500
};

/** Label tampilan per kategori */
export const LABEL_KATEGORI: Record<Kategori, string> = {
  kebun: 'Kebun',
  fasilitas: 'Fasilitas',
  air: 'Area Air',
  bangunan: 'Bangunan',
};
