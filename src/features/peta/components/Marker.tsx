'use client';

import { useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { LokasiItem } from '@/features/peta/types';
import { WARNA_KATEGORI } from '@/features/peta/types';
import { usePetaStore } from '@/store/peta.store';
import { LokasiPopup } from './LokasiPopup';

interface MarkerProps {
  lokasi: LokasiItem;
}

/**
 * Marker 3D — kerucut yang berdiri di posisi lokasi.
 * Klik untuk buka popup info. Hover untuk efek skala.
 */
export function Marker({ lokasi }: MarkerProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const selectedLokasi = usePetaStore((s) => s.selectedLokasi);
  const setSelectedLokasi = usePetaStore((s) => s.setSelectedLokasi);

  const isSelected = selectedLokasi?.id === lokasi.id;
  const warna = WARNA_KATEGORI[lokasi.kategori];

  // Animasi bobbing dan hover scale
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const targetScale = hovered || isSelected ? 1.4 : 1;
    meshRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.15
    );
    // Bobbing naik-turun perlahan
    meshRef.current.position.y = lokasi.posisi.y + Math.sin(t * 1.5 + lokasi.posisi.x) * 0.15 + 1.5;
  });

  return (
    <group position={[lokasi.posisi.x, lokasi.posisi.y, lokasi.posisi.z]}>
      {/* Tiang penanda */}
      <mesh position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 1.5, 8]} />
        <meshLambertMaterial color="#ffffff" />
      </mesh>

      {/* Kepala marker — kerucut */}
      <mesh
        ref={meshRef}
        position={[0, 1.5, 0]}
        rotation={[Math.PI, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedLokasi(isSelected ? null : lokasi);
        }}
        onPointerEnter={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
        castShadow
      >
        <coneGeometry args={[0.4, 1.2, 8]} />
        <meshStandardMaterial
          color={warna}
          emissive={warna}
          emissiveIntensity={hovered || isSelected ? 0.4 : 0.1}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>

      {/* Label nama selalu tampil di atas marker */}
      <Html
        position={[0, 3.2, 0]}
        center
        distanceFactor={20}
        occlude={false}
        style={{ pointerEvents: 'none' }}
      >
        <div
          style={{
            background: 'rgba(0,0,0,0.65)',
            color: '#fff',
            padding: '2px 8px',
            borderRadius: '12px',
            fontSize: '11px',
            fontWeight: 600,
            whiteSpace: 'nowrap',
            backdropFilter: 'blur(4px)',
            border: `1px solid ${warna}`,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {lokasi.nama}
        </div>
      </Html>

      {/* Popup detail — hanya tampil saat dipilih */}
      {isSelected && <LokasiPopup lokasi={lokasi} />}
    </group>
  );
}
