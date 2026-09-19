import type { LokasiItem } from '@/features/peta/types';

/**
 * Data lokasi placeholder untuk Peta 3D Agrowisata
 *
 * ⚠️  PLACEHOLDER — koordinat X,Y,Z bersifat dummy.
 * Setelah model Blender diekspor sebagai GLB, update nilai `posisi`
 * sesuai koordinat aktual objek di scene Blender.
 *
 * Skala sementara: 1 unit = ~1 meter, terrain 100×100 unit.
 */
export const dataLokasi: LokasiItem[] = [
  {
    id: 'kebun-teh-01',
    nama: 'Kebun Teh Utama',
    kategori: 'kebun',
    posisi: { x: -30, y: 0, z: -20 },
    deskripsi: 'Hamparan kebun teh seluas 5 hektar dengan pemandangan perbukitan yang memukau.',
    jamOperasional: '07:00 - 17:00',
  },
  {
    id: 'kebun-kopi-01',
    nama: 'Kebun Kopi Arabika',
    kategori: 'kebun',
    posisi: { x: 20, y: 0, z: -35 },
    deskripsi: 'Perkebunan kopi arabika organik. Pengunjung bisa ikut proses panen dan pengolahan.',
    jamOperasional: '07:00 - 16:00',
  },
  {
    id: 'kolam-01',
    nama: 'Kolam Pemancingan',
    kategori: 'air',
    posisi: { x: 10, y: 0, z: 15 },
    deskripsi: 'Kolam pemancingan alami dengan kapasitas 50 pengunjung. Tersedia alat pancing sewaan.',
    jamOperasional: '06:00 - 18:00',
  },
  {
    id: 'kolam-02',
    nama: 'Kolam Renang Alam',
    kategori: 'air',
    posisi: { x: -15, y: 0, z: 25 },
    deskripsi: 'Kolam renang alami bersumber dari mata air pegunungan. Suhu air sejuk sepanjang hari.',
    jamOperasional: '08:00 - 17:00',
  },
  {
    id: 'gazebo-01',
    nama: 'Gazebo Panorama',
    kategori: 'fasilitas',
    posisi: { x: -40, y: 0, z: 10 },
    deskripsi: 'Gazebo dengan pemandangan 360° ke seluruh kawasan. Tersedia kursi dan meja piknik.',
    jamOperasional: '08:00 - 18:00',
  },
  {
    id: 'warung-01',
    nama: 'Warung Agro',
    kategori: 'fasilitas',
    posisi: { x: 5, y: 0, z: -5 },
    deskripsi: 'Warung makan dan oleh-oleh hasil perkebunan. Tersedia menu khas lokal dan kopi segar.',
    jamOperasional: '08:00 - 17:00',
  },
  {
    id: 'toilet-01',
    nama: 'Toilet & Area Istirahat',
    kategori: 'fasilitas',
    posisi: { x: 30, y: 0, z: 5 },
    deskripsi: 'Fasilitas toilet bersih dan area istirahat berkanopi. Tersedia tempat pengisian air minum.',
    jamOperasional: 'Buka 24 jam',
  },
  {
    id: 'villa-01',
    nama: 'Villa Kebun',
    kategori: 'bangunan',
    posisi: { x: -25, y: 0, z: -40 },
    deskripsi: 'Villa dengan 3 kamar tidur di tengah kebun. Kapasitas 8 orang. Tersedia dapur dan ruang keluarga.',
    jamOperasional: 'Check-in: 14:00 | Check-out: 12:00',
  },
  {
    id: 'aula-01',
    nama: 'Aula Pertemuan',
    kategori: 'bangunan',
    posisi: { x: 35, y: 0, z: -20 },
    deskripsi: 'Aula serbaguna untuk seminar, gathering, dan acara perusahaan. Kapasitas 100 orang.',
    jamOperasional: '08:00 - 22:00',
  },
  {
    id: 'pos-masuk-01',
    nama: 'Pos Masuk Utama',
    kategori: 'bangunan',
    posisi: { x: 0, y: 0, z: 40 },
    deskripsi: 'Gerbang dan pos tiket masuk kawasan agrowisata. Tersedia peta kawasan dan pemandu wisata.',
    jamOperasional: '07:00 - 18:00',
  },
];
