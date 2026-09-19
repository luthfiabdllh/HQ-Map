'use client';

import { Html } from '@react-three/drei';
import type { LokasiItem } from '@/features/peta/types';
import { WARNA_KATEGORI, LABEL_KATEGORI } from '@/features/peta/types';
import { usePetaStore } from '@/store/peta.store';

interface LokasiPopupProps {
  lokasi: LokasiItem;
}

/**
 * LokasiPopup — kartu info HTML yang mengambang di atas marker 3D.
 * Dirender menggunakan <Html> dari @react-three/drei sehingga otomatis
 * mengikuti posisi marker di dunia 3D saat kamera bergerak.
 */
export function LokasiPopup({ lokasi }: LokasiPopupProps) {
  const setSelectedLokasi = usePetaStore((s) => s.setSelectedLokasi);
  const warna = WARNA_KATEGORI[lokasi.kategori];

  return (
    <Html
      position={[0, 5, 0]}
      center
      distanceFactor={22}
      style={{ pointerEvents: 'all' }}
    >
      <div
        style={{
          width: 220,
          background: 'rgba(10, 20, 10, 0.92)',
          backdropFilter: 'blur(12px)',
          border: `1px solid ${warna}`,
          borderRadius: 12,
          padding: '14px 16px',
          color: '#fff',
          fontFamily: 'Inter, sans-serif',
          boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px ${warna}22`,
          position: 'relative',
        }}
      >
        {/* Tombol close */}
        <button
          onClick={() => setSelectedLokasi(null)}
          style={{
            position: 'absolute',
            top: 8,
            right: 10,
            background: 'none',
            border: 'none',
            color: '#9ca3af',
            cursor: 'pointer',
            fontSize: 16,
            lineHeight: 1,
            padding: 2,
          }}
          aria-label="Tutup popup"
        >
          ✕
        </button>

        {/* Badge kategori */}
        <div style={{ marginBottom: 8 }}>
          <span
            style={{
              background: warna + '22',
              color: warna,
              border: `1px solid ${warna}`,
              borderRadius: 6,
              padding: '2px 8px',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            {LABEL_KATEGORI[lokasi.kategori]}
          </span>
        </div>

        {/* Nama lokasi */}
        <h3
          style={{
            margin: '0 0 6px',
            fontSize: 14,
            fontWeight: 700,
            lineHeight: 1.3,
            paddingRight: 16,
          }}
        >
          {lokasi.nama}
        </h3>

        {/* Deskripsi */}
        <p
          style={{
            margin: '0 0 10px',
            fontSize: 12,
            color: '#d1d5db',
            lineHeight: 1.5,
          }}
        >
          {lokasi.deskripsi}
        </p>

        {/* Jam operasional */}
        {lokasi.jamOperasional && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 11,
              color: '#9ca3af',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              paddingTop: 8,
            }}
          >
            <span>🕐</span>
            <span>{lokasi.jamOperasional}</span>
          </div>
        )}
      </div>
    </Html>
  );
}
