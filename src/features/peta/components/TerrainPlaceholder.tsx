'use client';

/**
 * TerrainPlaceholder — terrain sementara sebelum model GLB dari Blender tersedia.
 *
 * Untuk mengganti dengan model Blender:
 * 1. Letakkan file GLB di `public/models/terrain.glb`
 * 2. Ganti komponen ini dengan:
 *    const { scene } = useGLTF('/models/terrain.glb')
 *    return <primitive object={scene} />
 */
export function TerrainPlaceholder() {
  return (
    <group name="terrain-placeholder">
      {/* Tanah utama — padang rumput hijau */}
      <mesh
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.01, 0]}
        name="tanah"
      >
        <planeGeometry args={[200, 200, 40, 40]} />
        <meshLambertMaterial color="#4ade80" />
      </mesh>

      {/* Grid helper untuk memudahkan orientasi */}
      <gridHelper
        args={[200, 20, '#86efac', '#86efac']}
        position={[0, 0.01, 0]}
      />

      {/* Jalan setapak — dari pos masuk (z=40) ke tengah kawasan */}
      <mesh
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.02, 20]}
      >
        <planeGeometry args={[3, 40]} />
        <meshLambertMaterial color="#d4a96a" />
      </mesh>

      {/* Area kebun — warna hijau tua */}
      <mesh
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[-15, 0.02, -27]}
      >
        <planeGeometry args={[40, 30]} />
        <meshLambertMaterial color="#16a34a" />
      </mesh>

      {/* Area kolam — warna biru */}
      <mesh
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.02, 20]}
      >
        <planeGeometry args={[12, 12]} />
        <meshLambertMaterial color="#60a5fa" />
      </mesh>

      {/* Perbukitan sederhana — beberapa kotak untuk konteks terrain */}
      {[
        { x: -60, y: 3, z: -60, sx: 30, sy: 6, sz: 30 },
        { x: 60, y: 2, z: -50, sx: 20, sy: 4, sz: 25 },
        { x: -50, y: 1.5, z: 40, sx: 20, sy: 3, sz: 20 },
      ].map((hill, i) => (
        <mesh
          key={i}
          castShadow
          receiveShadow
          position={[hill.x, hill.y / 2, hill.z]}
        >
          <boxGeometry args={[hill.sx, hill.sy, hill.sz]} />
          <meshLambertMaterial color="#22c55e" />
        </mesh>
      ))}
    </group>
  );
}
