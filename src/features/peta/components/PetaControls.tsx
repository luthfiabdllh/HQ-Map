'use client';

import { useState, useMemo } from 'react';
import { usePetaStore } from '@/store/peta.store';
import { dataLokasi } from '@/data/lokasi';
import { WARNA_KATEGORI, LABEL_KATEGORI } from '@/features/peta/types';
import type { Kategori } from '@/features/peta/types';

const SEMUA_KATEGORI: Kategori[] = ['kebun', 'fasilitas', 'air', 'bangunan'];

/**
 * PetaControls — panel kontrol HTML mengambang di pojok kiri atas.
 * Berisi SearchBar dan FilterKategori.
 * Ditempatkan di luar <Canvas> tapi berinteraksi lewat Zustand store.
 */
export function PetaControls() {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const visibleKategori = usePetaStore((s) => s.visibleKategori);
  const toggleKategori = usePetaStore((s) => s.toggleKategori);
  const setKameraTarget = usePetaStore((s) => s.setKameraTarget);
  const setSelectedLokasi = usePetaStore((s) => s.setSelectedLokasi);

  const suggestions = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return dataLokasi.filter(
      (l) =>
        l.nama.toLowerCase().includes(q) ||
        l.deskripsi.toLowerCase().includes(q)
    );
  }, [query]);

  const handleSelect = (lokasiId: string) => {
    const lokasi = dataLokasi.find((l) => l.id === lokasiId);
    if (!lokasi) return;
    setKameraTarget({ posisi: lokasi.posisi, lokasiId: lokasi.id });
    setSelectedLokasi(lokasi);
    setQuery(lokasi.nama);
    setShowSuggestions(false);
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        fontFamily: 'Inter, sans-serif',
        userSelect: 'none',
      }}
    >
      {/* ── Logo / Judul ── */}
      <div
        style={{
          background: 'rgba(10, 30, 10, 0.88)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(74, 222, 128, 0.3)',
          borderRadius: 12,
          padding: '10px 14px',
          color: '#fff',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 20 }}>🌿</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 13, lineHeight: 1.2 }}>
              Peta Agrowisata
            </div>
            <div style={{ fontSize: 10, color: '#86efac', letterSpacing: '0.05em' }}>
              INTERACTIVE MAP
            </div>
          </div>
        </div>
      </div>

      {/* ── Search Bar ── */}
      <div style={{ position: 'relative' }}>
        <div
          style={{
            background: 'rgba(10, 30, 10, 0.88)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(74, 222, 128, 0.3)',
            borderRadius: 10,
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span style={{ fontSize: 14, opacity: 0.7 }}>🔍</span>
          <input
            type="text"
            placeholder="Cari lokasi..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              color: '#fff',
              fontSize: 13,
              width: 180,
              fontFamily: 'inherit',
            }}
          />
          {query && (
            <button
              onClick={() => { setQuery(''); setShowSuggestions(false); }}
              style={{
                background: 'none',
                border: 'none',
                color: '#6b7280',
                cursor: 'pointer',
                fontSize: 14,
                padding: 0,
                lineHeight: 1,
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Dropdown autocomplete */}
        {showSuggestions && suggestions.length > 0 && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              marginTop: 4,
              background: 'rgba(10, 25, 10, 0.97)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(74, 222, 128, 0.3)',
              borderRadius: 10,
              overflow: 'hidden',
            }}
          >
            {suggestions.map((l) => (
              <button
                key={l.id}
                onMouseDown={() => handleSelect(l.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  padding: '9px 12px',
                  cursor: 'pointer',
                  color: '#fff',
                  textAlign: 'left',
                  fontFamily: 'inherit',
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: WARNA_KATEGORI[l.kategori],
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600 }}>{l.nama}</div>
                  <div style={{ fontSize: 10, color: '#9ca3af' }}>
                    {LABEL_KATEGORI[l.kategori]}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Filter Kategori ── */}
      <div
        style={{
          background: 'rgba(10, 30, 10, 0.88)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(74, 222, 128, 0.3)',
          borderRadius: 10,
          padding: '10px 12px',
        }}
      >
        <div
          style={{
            fontSize: 10,
            color: '#86efac',
            fontWeight: 700,
            letterSpacing: '0.08em',
            marginBottom: 8,
            textTransform: 'uppercase',
          }}
        >
          Filter Kategori
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {SEMUA_KATEGORI.map((kat) => {
            const aktif = visibleKategori.has(kat);
            const warna = WARNA_KATEGORI[kat];
            return (
              <button
                key={kat}
                onClick={() => toggleKategori(kat)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: aktif ? warna + '18' : 'transparent',
                  border: `1px solid ${aktif ? warna : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: 7,
                  padding: '5px 10px',
                  cursor: 'pointer',
                  color: aktif ? '#fff' : '#6b7280',
                  fontFamily: 'inherit',
                  fontSize: 12,
                  fontWeight: 600,
                  transition: 'all 0.15s',
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: aktif ? warna : '#374151',
                    flexShrink: 0,
                  }}
                />
                {LABEL_KATEGORI[kat]}
                {!aktif && (
                  <span style={{ marginLeft: 'auto', fontSize: 10, opacity: 0.5 }}>
                    tersembunyi
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Bantuan navigasi ── */}
      <div
        style={{
          background: 'rgba(10, 30, 10, 0.75)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(74, 222, 128, 0.15)',
          borderRadius: 10,
          padding: '8px 12px',
          fontSize: 10,
          color: '#6b7280',
          lineHeight: 1.6,
        }}
      >
        🖱 Klik & seret — geser peta<br />
        🖱 Scroll — zoom in/out<br />
        📍 Klik marker — lihat info
      </div>
    </div>
  );
}
