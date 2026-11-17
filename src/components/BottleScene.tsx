"use client";
import { useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, RoundedBox, Sparkles } from "@react-three/drei";

type Props = {
  progress: MutableRefObject<number>;
  active: boolean;
  tone?: string;
};

function Bottle({ progress, tone = "#8a5a14" }: { progress: MutableRefObject<number>; tone?: string }) {
  const group = useRef<THREE.Group>(null!);
  const cap = useRef<THREE.Group>(null!);
  const smooth = useRef(0);
  const mobile = useThree((s) => s.size.width < 768);

  useFrame((state, dt) => {
    smooth.current = THREE.MathUtils.damp(smooth.current, progress.current, 4, dt);
    const p = smooth.current;

    group.current.rotation.y = 0.5 + p * Math.PI * 3;
    group.current.rotation.x = Math.sin(p * Math.PI * 2) * 0.08;
    group.current.position.y = (mobile ? -0.1 : -0.4) + Math.sin(state.clock.elapsedTime * 0.8) * 0.05;

    // cap shuru mein upar uthta hai, aakhir mein wapas aata hai
    const lift =
      THREE.MathUtils.smoothstep(p, 0.08, 0.28) - THREE.MathUtils.smoothstep(p, 0.78, 0.95);
    cap.current.position.y = 1.45 + lift * 0.9;
    cap.current.rotation.y = lift * Math.PI;
  });

  return (
    <group
      ref={group}
      position={[mobile ? 0 : 1.5, 0, 0]}
      scale={mobile ? 0.82 : 1}
    >
      {/* glass body */}
      <RoundedBox args={[1.5, 1.9, 0.9]} radius={0.08} smoothness={4}>
        <meshPhysicalMaterial
          color="#ffffff"
          transmission={1}
          thickness={0.8}
          roughness={0.04}
          ior={1.5}
          clearcoat={1}
          envMapIntensity={1.4}
        />
      </RoundedBox>

      {/* perfume liquid */}
      <RoundedBox args={[1.32, 1.5, 0.72]} radius={0.05} smoothness={4} position={[0, -0.12, 0]}>
        <meshPhysicalMaterial color={tone} roughness={0.15} transparent opacity={0.92} emissive={tone} emissiveIntensity={0.18} />
      </RoundedBox>

      {/* neck */}
      <mesh position={[0, 1.12, 0]}>
        <cylinderGeometry args={[0.2, 0.22, 0.36, 32]} />
        <meshStandardMaterial color="#c9a24b" metalness={1} roughness={0.25} envMapIntensity={1.6} />
      </mesh>

      {/* gold cap */}
      <group ref={cap} position={[0, 1.45, 0]}>
        <mesh>
          <cylinderGeometry args={[0.3, 0.3, 0.75, 48]} />
          <meshStandardMaterial color="#c9a24b" metalness={1} roughness={0.2} envMapIntensity={1.8} />
        </mesh>
        <mesh position={[0, 0.38, 0]}>
          <cylinderGeometry args={[0.31, 0.31, 0.04, 48]} />
          <meshStandardMaterial color="#f0d58a" metalness={1} roughness={0.15} envMapIntensity={2} />
        </mesh>
      </group>
    </group>
  );
}

export default function BottleScene({ progress, active, tone }: Props) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0.2, 7], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.25} />
      <spotLight position={[4, 6, 5]} angle={0.4} penumbra={1} intensity={60} color="#ffe2a8" />

      <Environment resolution={256}>
        <Lightformer form="rect" intensity={4} position={[0, 3, 4]} scale={[8, 2, 1]} color="#ffe2a8" />
        <Lightformer form="rect" intensity={3} position={[-5, 0, 2]} rotation={[0, Math.PI / 2, 0]} scale={[6, 4, 1]} color="#ffffff" />
        <Lightformer form="ring" intensity={2} position={[4, 1, -3]} scale={4} color="#c9a24b" />
      </Environment>

      <Bottle progress={progress} tone={tone} />

      <Sparkles count={90} scale={[9, 6, 4]} size={3} speed={0.3} opacity={0.8} color="#d9b866" />
    </Canvas>
  );
}