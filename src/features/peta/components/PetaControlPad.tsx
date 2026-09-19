'use client';

import { useRef, useCallback } from 'react';
import * as THREE from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

interface PetaControlPadProps {
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
}

const BASE_BTN: React.CSSProperties = {
  width: 40,
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(10, 30, 10, 0.82)',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(74, 222, 128, 0.35)',
  borderRadius: 8,
  color: '#86efac',
  fontSize: 18,
  cursor: 'pointer',
  userSelect: 'none',
  WebkitUserSelect: 'none',
  touchAction: 'none',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 700,
};

interface ControlBtnProps {
  children: React.ReactNode;
  onAction: () => void;
  repeat?: boolean;
  title?: string;
  style?: React.CSSProperties;
}

function ControlBtn({ children, onAction, repeat = true, title, style }: ControlBtnProps) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  return (
    <div
      style={{ ...BASE_BTN, ...style }}
      title={title}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        onAction();
        if (repeat) {
          intervalRef.current = setInterval(onAction, 16);
        }
      }}
      onPointerUp={stop}
      onPointerLeave={stop}
      onPointerCancel={stop}
    >
      {children}
    </div>
  );
}

/**
 * PetaControlPad — tombol kontrol HTML overlay di luar Canvas.
 * Akses kamera via controlsRef.current.object di dalam event handler.
 */
export function PetaControlPad({ controlsRef }: PetaControlPadProps) {
  const zoomIn = useCallback(() => {
    const ctrl = controlsRef.current;
    if (!ctrl) return;
    const cam = ctrl.object as THREE.PerspectiveCamera;
    const dir = new THREE.Vector3();
    cam.getWorldDirection(dir);
    cam.position.addScaledVector(dir, 0.6);
    ctrl.update();
  }, [controlsRef]);

  const zoomOut = useCallback(() => {
    const ctrl = controlsRef.current;
    if (!ctrl) return;
    const cam = ctrl.object as THREE.PerspectiveCamera;
    const dir = new THREE.Vector3();
    cam.getWorldDirection(dir);
    cam.position.addScaledVector(dir, -0.6);
    ctrl.update();
  }, [controlsRef]);

  const panUp = useCallback(() => {
    const ctrl = controlsRef.current;
    if (!ctrl) return;
    const d = new THREE.Vector3(0, 0, -0.6);
    (ctrl.object as THREE.Camera).position.add(d);
    ctrl.target.add(d);
    ctrl.update();
  }, [controlsRef]);

  const panDown = useCallback(() => {
    const ctrl = controlsRef.current;
    if (!ctrl) return;
    const d = new THREE.Vector3(0, 0, 0.6);
    (ctrl.object as THREE.Camera).position.add(d);
    ctrl.target.add(d);
    ctrl.update();
  }, [controlsRef]);

  const panLeft = useCallback(() => {
    const ctrl = controlsRef.current;
    if (!ctrl) return;
    const d = new THREE.Vector3(-0.6, 0, 0);
    (ctrl.object as THREE.Camera).position.add(d);
    ctrl.target.add(d);
    ctrl.update();
  }, [controlsRef]);

  const panRight = useCallback(() => {
    const ctrl = controlsRef.current;
    if (!ctrl) return;
    const d = new THREE.Vector3(0.6, 0, 0);
    (ctrl.object as THREE.Camera).position.add(d);
    ctrl.target.add(d);
    ctrl.update();
  }, [controlsRef]);

  const resetView = useCallback(() => {
    const ctrl = controlsRef.current;
    if (!ctrl) return;
    (ctrl.object as THREE.Camera).position.set(0, 60, 80);
    ctrl.target.set(0, 0, 0);
    ctrl.update();
  }, [controlsRef]);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 24,
        right: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        zIndex: 100,
      }}
    >
      {/* Zoom */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        <ControlBtn onAction={zoomIn}>+</ControlBtn>
        <ControlBtn onAction={zoomOut}>−</ControlBtn>
      </div>

      {/* D-pad */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 40px)',
          gridTemplateRows: 'repeat(3, 40px)',
          gap: 3,
          marginTop: 4,
        }}
      >
        <div />
        <ControlBtn onAction={panUp}>↑</ControlBtn>
        <div />
        <ControlBtn onAction={panLeft}>←</ControlBtn>
        <ControlBtn onAction={resetView} repeat={false} title="Reset tampilan" style={{ fontSize: 16 }}>
          ⌂
        </ControlBtn>
        <ControlBtn onAction={panRight}>→</ControlBtn>
        <div />
        <ControlBtn onAction={panDown}>↓</ControlBtn>
        <div />
      </div>
    </div>
  );
}
