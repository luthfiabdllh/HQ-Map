'use client';

import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { TerrainPlaceholder } from './TerrainPlaceholder';
import { MarkerGroup } from './MarkerGroup';
import { PetaControls } from './PetaControls';
import { PetaControlPad } from './PetaControlPad';
import { KameraController } from '../hooks/useKameraAnimasi';

/**
 * PetaCanvas — komponen utama peta 3D.
 *
 * Kontrol kamera:
 *   Desktop  : klik kiri+drag = geser (pan) | klik kanan+drag = rotasi | scroll = zoom
 *   Mobile   : 1 jari = geser (pan)         | 2 jari pinch   = zoom    | 2 jari drag = rotasi
 *   On-screen: D-pad arah, zoom +/-, tombol reset
 */
export function PetaCanvas() {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#87ceeb',
      }}
    >
      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{
          position: [0, 60, 80],
          fov: 45,
          near: 0.1,
          far: 1000,
        }}
        gl={{ antialias: true }}
        style={{ position: 'absolute', inset: 0 }}
      >
        {/* Animasi kamera fly-to saat user search */}
        <KameraController />

        {/* Langit siang hari */}
        <Sky
          distance={450000}
          sunPosition={[100, 20, 100]}
          inclination={0.5}
          azimuth={0.25}
        />

        {/* Pencahayaan */}
        <ambientLight intensity={0.8} color="#fff5e0" />
        <directionalLight
          castShadow
          position={[50, 80, 30]}
          intensity={1.5}
          shadow-mapSize={[2048, 2048]}
          shadow-camera-far={200}
          shadow-camera-left={-100}
          shadow-camera-right={100}
          shadow-camera-top={100}
          shadow-camera-bottom={-100}
        />
        <hemisphereLight args={['#87ceeb', '#4ade80', 0.4]} />

        {/* Fog */}
        <fog attach="fog" args={['#c9e8f5', 100, 300]} />

        {/* Scene */}
        <Suspense fallback={null}>
          <TerrainPlaceholder />
          <MarkerGroup />
        </Suspense>

        {/*
          Kontrol intuitif bergaya Google Maps:
            Desktop  — LEFT = PAN, RIGHT = ROTATE, MIDDLE/SCROLL = ZOOM
            Mobile   — 1 jari = PAN, 2 jari = ZOOM + ROTATE
        */}
        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.1}
          minDistance={8}
          maxDistance={200}
          maxPolarAngle={Math.PI / 2 - 0.04}
          target={[0, 0, 0]}
          mouseButtons={{
            LEFT: THREE.MOUSE.PAN,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.ROTATE,
          }}
          touches={{
            ONE: THREE.TOUCH.PAN,
            TWO: THREE.TOUCH.DOLLY_ROTATE,
          }}
          panSpeed={1.2}
          rotateSpeed={0.6}
          zoomSpeed={1.0}
        />

      </Canvas>

      {/* Panel Kontrol HTML (search + filter) */}
      <PetaControls />

      {/* D-pad on-screen — di luar Canvas (HTML element, bukan Three.js object) */}
      <PetaControlPad controlsRef={controlsRef} />

      {/* Hint kontrol pojok kanan bawah */}
      <div
        style={{
          position: 'absolute',
          bottom: 16,
          right: 168,
          fontSize: 10,
          color: 'rgba(255,255,255,0.45)',
          fontFamily: 'Inter, sans-serif',
          pointerEvents: 'none',
          textAlign: 'right',
          lineHeight: 1.8,
        }}
      >
        🖱 Kiri+seret = Geser &nbsp;|&nbsp; Kanan+seret = Rotasi &nbsp;|&nbsp; Scroll = Zoom<br />
        📱 1 jari = Geser &nbsp;|&nbsp; 2 jari = Zoom &amp; Rotasi
      </div>
    </div>
  );
}
