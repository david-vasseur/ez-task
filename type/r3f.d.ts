import { ThreeElement } from "@react-three/fiber"
import { LiquidGlassMaterial } from "@/components/3d/LiquidGlassMaterial"

declare module "@react-three/fiber" {
  interface ThreeElements {
    liquidGlassMaterial: ThreeElement<typeof LiquidGlassMaterial>
  }
}