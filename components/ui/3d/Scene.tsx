"use client"

import React, { Suspense } from "react";
import { Environment } from "@react-three/drei";

function Scene() {
  return (
    <>
      <Suspense fallback={null}>
        <Environment preset={"studio"} environmentIntensity={100} />
      </Suspense>
    </>
  );
}

export default Scene;