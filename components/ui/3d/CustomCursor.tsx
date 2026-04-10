"use client"

import { Capsule, MeshTransmissionMaterial, Html } from "@react-three/drei"
import { useRef, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

export default function LiquidCapsule({ position = [0,0,-1], label = "TEST" }) {

  const groupRef = useRef<THREE.Group>(null!)
  const { camera, raycaster, pointer } = useThree()

  const [dragging, setDragging] = useState(false)

  const plane = new THREE.Plane(new THREE.Vector3(0,0,1), 0)
  const intersection = new THREE.Vector3()

  useFrame(() => {

    if (!dragging) return

    raycaster.setFromCamera(pointer, camera)
    raycaster.ray.intersectPlane(plane, intersection)

    groupRef.current.position.x = intersection.x
  })

  return (
    <group
      ref={groupRef}
      position={position}

	  

      onPointerDown={(e)=>{
        e.stopPropagation()
        setDragging(true)
      }}

      onPointerUp={()=>{
        setDragging(false)
      }}
    >
      <Capsule
        args={[0.25, 3.2, 32, 32]}
        rotation={[0,0,-Math.PI/2]}
      >
        <MeshTransmissionMaterial
          transmission={1}
          color="white"
          roughness={0.1}
          thickness={0.6}
          ior={1}
          chromaticAberration={0.03}
          distortion={0.2}
          distortionScale={0.2}
          temporalDistortion={0.1}
          samples={2}
          resolution={512}
        />
      </Capsule>

      <Html position={[0,0,0.35]} center scale={[0.3,2.5,1]}>
        <div className="glass-button" style={{
          fontWeight:"bold",
          fontSize:"2em",
          color:"black",
          pointerEvents:"none",
		  width: "",
		  position: "absolute",
		  height: "full"

        }}>
          {label}
        </div>
      </Html>

    </group>
  )
}