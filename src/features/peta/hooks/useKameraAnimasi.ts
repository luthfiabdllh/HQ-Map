'use client';

import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { usePetaStore } from '@/store/peta.store';

const LERP_SPEED = 0.08;
const KAMERA_KETINGGIAN = 30; // unit di atas titik target

/**
 * KameraController — komponen dummy yang harus di-render di dalam <Canvas>.
 * Menganimasikan kamera ke `kameraTarget` dari Zustand store menggunakan lerp.
 *
 * Contoh pemakaian:
 *   <Canvas>
 *     <KameraController />
 *     ...
 *   </Canvas>
 */
export function KameraController() {
  const { camera } = useThree();
  const kameraTarget = usePetaStore((s) => s.kameraTarget);
  const setKameraTarget = usePetaStore((s) => s.setKameraTarget);

  const targetPos = useRef<THREE.Vector3 | null>(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    if (kameraTarget) {
      const { x, z } = kameraTarget.posisi;
      targetPos.current = new THREE.Vector3(x, KAMERA_KETINGGIAN, z + 15);
      isAnimating.current = true;
    }
  }, [kameraTarget]);

  useFrame(() => {
    if (!isAnimating.current || !targetPos.current) return;

    camera.position.lerp(targetPos.current, LERP_SPEED);

    // Selesai animasi jika sudah sangat dekat ke target
    if (camera.position.distanceTo(targetPos.current) < 0.05) {
      camera.position.copy(targetPos.current);
      isAnimating.current = false;
      setKameraTarget(null);
    }
  });

  return null;
}
