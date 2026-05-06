import { Suspense, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { EffectComposer, DepthOfField, Bloom, Vignette } from "@react-three/postprocessing";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import Sneaker from "./Sneaker";

gsap.registerPlugin(ScrollTrigger);

const Rig = ({ pointer }: { pointer: React.MutableRefObject<{ x: number; y: number }> }) => {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    // Cinematic intro: shoe drops from above
    if (!groupRef.current) return;
    gsap.fromTo(
      groupRef.current.position,
      { y: 8 },
      { y: 0, duration: 1.8, ease: "bounce.out", delay: 0.2 }
    );
    gsap.fromTo(
      camera.position,
      { z: 8, y: 2 },
      { z: 5, y: 0.5, duration: 2, ease: "power3.out" }
    );
  }, [camera]);

  useEffect(() => {
    // Scroll-driven camera dolly + group movement
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#leo-scroll-root",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
      },
    });

    tl.to(camera.position, { z: 4, y: 0.2, x: 1.2, ease: "none" }, 0)
      .to(camera.rotation, { y: -0.15, ease: "none" }, 0)
      .to(groupRef.current!.position, { y: -0.3, x: -0.5, ease: "none" }, 0)
      .to(groupRef.current!.rotation, { y: Math.PI * 1.2, ease: "none" }, 0)
      .to(camera.position, { z: 3.2, y: -0.4, x: -0.8, ease: "none" }, 0.5)
      .to(groupRef.current!.rotation, { y: Math.PI * 2.5, x: 0.3, ease: "none" }, 0.5);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [camera]);

  return (
    <group ref={groupRef}>
      <Sneaker pointer={pointer} />
    </group>
  );
};

const Scene = () => {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0.5, 5], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#08080a"]} />
      <fog attach="fog" args={["#08080a", 8, 20]} />

      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 6, 4]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <spotLight position={[-4, 5, 3]} intensity={0.8} color="#C9A24A" angle={0.6} penumbra={1} />
      <pointLight position={[0, -2, 3]} intensity={0.3} color="#ffffff" />

      <Suspense fallback={null}>
        <Environment preset="studio" />
        <Rig pointer={pointer} />
        <ContactShadows
          position={[0, -1.1, 0]}
          opacity={0.6}
          scale={10}
          blur={2.4}
          far={3}
        />
      </Suspense>

      <EffectComposer multisampling={0}>
        <DepthOfField focusDistance={0.015} focalLength={0.04} bokehScale={3} />
        <Bloom intensity={0.35} luminanceThreshold={0.85} luminanceSmoothing={0.4} />
        <Vignette eskil={false} offset={0.2} darkness={0.7} />
      </EffectComposer>
    </Canvas>
  );
};

export default Scene;
