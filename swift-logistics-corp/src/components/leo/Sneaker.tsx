import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

/**
 * High-detail procedural sneaker built from primitives.
 * No external GLB needed — guarantees instant load and 60fps.
 */
const Sneaker = ({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) => {
  const group = useRef<THREE.Group>(null);

  useFrame((_, dt) => {
    if (!group.current) return;
    // Idle slow rotation
    group.current.rotation.y += dt * 0.25;
    // Mouse parallax tilt
    const tx = pointer.current.y * 0.25;
    const ty = pointer.current.x * 0.4;
    group.current.rotation.x += (tx - group.current.rotation.x) * 0.05;
  });

  const leather = new THREE.MeshPhysicalMaterial({
    color: "#0a0a0a",
    roughness: 0.35,
    metalness: 0.1,
    clearcoat: 0.6,
    clearcoatRoughness: 0.2,
  });
  const gold = new THREE.MeshPhysicalMaterial({
    color: "#C9A24A",
    roughness: 0.25,
    metalness: 1,
    clearcoat: 1,
  });
  const sole = new THREE.MeshStandardMaterial({ color: "#f5f5f5", roughness: 0.7 });
  const accent = new THREE.MeshPhysicalMaterial({
    color: "#1a1a1a",
    roughness: 0.5,
    metalness: 0.2,
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={group} position={[0, 0, 0]} rotation={[0, -0.4, 0]} scale={1.3}>
        {/* Sole */}
        <mesh position={[0, -0.55, 0]} castShadow receiveShadow material={sole}>
          <boxGeometry args={[2.6, 0.25, 1.05]} />
        </mesh>
        <mesh position={[0.9, -0.55, 0]} castShadow material={sole}>
          <cylinderGeometry args={[0.5, 0.55, 0.25, 32]} />
        </mesh>
        <mesh position={[-1.1, -0.55, 0]} castShadow material={sole}>
          <cylinderGeometry args={[0.4, 0.45, 0.25, 32]} />
        </mesh>
        {/* Midsole stripe */}
        <mesh position={[0, -0.4, 0]} material={gold}>
          <boxGeometry args={[2.55, 0.05, 1.06]} />
        </mesh>

        {/* Main upper — leather body */}
        <mesh position={[0, -0.05, 0]} castShadow material={leather}>
          <boxGeometry args={[2.2, 0.7, 0.95]} />
        </mesh>
        {/* Toe box (rounded) */}
        <mesh position={[0.95, -0.15, 0]} castShadow material={leather}>
          <sphereGeometry args={[0.55, 32, 32]} />
        </mesh>
        {/* Heel counter */}
        <mesh position={[-1.05, 0.05, 0]} castShadow material={leather}>
          <sphereGeometry args={[0.5, 32, 32]} />
        </mesh>
        {/* Tongue + ankle */}
        <mesh position={[-0.4, 0.35, 0]} rotation={[0, 0, -0.15]} castShadow material={accent}>
          <boxGeometry args={[0.7, 0.6, 0.85]} />
        </mesh>

        {/* Gold side swoosh */}
        <mesh position={[0.1, -0.05, 0.49]} rotation={[0, 0, -0.1]} material={gold}>
          <boxGeometry args={[1.5, 0.18, 0.04]} />
        </mesh>
        <mesh position={[0.1, -0.05, -0.49]} rotation={[0, 0, -0.1]} material={gold}>
          <boxGeometry args={[1.5, 0.18, 0.04]} />
        </mesh>

        {/* Laces (5 rungs) */}
        {[0.1, -0.05, -0.2, -0.35, -0.5].map((x, i) => (
          <mesh key={i} position={[x, 0.32, 0]} material={sole}>
            <cylinderGeometry args={[0.025, 0.025, 0.55, 12]} />
            <meshStandardMaterial color="#e8e8e8" />
          </mesh>
        ))}

        {/* Brand badge */}
        <mesh position={[-0.7, 0.1, 0.49]} material={gold}>
          <circleGeometry args={[0.08, 32]} />
        </mesh>
        <mesh position={[-0.7, 0.1, -0.49]} material={gold} rotation={[0, Math.PI, 0]}>
          <circleGeometry args={[0.08, 32]} />
        </mesh>
      </group>
    </Float>
  );
};

export default Sneaker;
