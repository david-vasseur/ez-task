"use client"; // Important pour Next.js 13+ app directory

import React, { useRef } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";

type LiquidMaterialType = {
  uTime: number
  uMouse: THREE.Vector2
}

// ---- Shader Material ----
const LiquidMaterial = shaderMaterial(
  { uTime: 0, uMouse: new THREE.Vector2() },
  `
  varying vec2 vUv;
  void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
  `,
  `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;
  void main() {
      vec2 uv = vUv;
      uv.y += 0.03 * sin(uv.x * 10.0 + uTime * 2.0);
      uv.x += 0.03 * sin(uv.y * 10.0 + uTime * 2.0);
      vec3 color = vec3(0.3, 0.8, 1.0) * (0.4 + 0.6 * uv.y);
      gl_FragColor = vec4(color, 0.3);
  }
  `
);

extend({ LiquidMaterial });

function LiquidGlassPlaneMesh() {
  const ref = useRef<LiquidMaterialType>(null);
  useFrame(({ clock, mouse }) => {
    if (ref.current) {
      ref.current.uTime = clock.getElapsedTime();
      ref.current.uMouse.set(mouse.x, mouse.y);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[3, 1]} />
      <liquidMaterial ref={ref} transparent />
    </mesh>
  );
}

export default function LiquidGlassPlane() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <LiquidGlassPlaneMesh />
      <OrbitControls />
    </Canvas>
  );
}