import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

import vert from "../shaders/liquidGlass.vert";
import frag from "../shaders/liquidGlass.frag";

export const LiquidGlassMaterial = shaderMaterial(
  {
    uTime: 0,
    uMouse: new THREE.Vector2(),
    uTexture: null
  },
  vert,
  frag
)