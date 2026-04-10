"use client"

import BackgroundPlane from '@/components/ui/3d/BackgroundPlane'
import LiquidCapsule from '@/components/ui/3d/CustomCursor'
import DynamicLights from '@/components/ui/3d/DynamicLights'
import Scene from '@/components/ui/3d/Scene'
import { OrthographicCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { Suspense } from 'react'

function page() {
    return (
        <div className='relative min-h-screen flex flex-col justify-center items-center'>
            <img src={"/images/titre4.jpg"} className='absolute w-full h-full inset-0' />
            <div className="main-container h-screen w-screen">
                <Canvas className='min-h-full w-full'>
                    <OrthographicCamera
                        makeDefault
                        position={[0,0,10]}
                        zoom={100}
                    />
                    <ambientLight intensity={5} />
                    <BackgroundPlane />
                    <Suspense fallback={null}>
                        <DynamicLights />
                        <LiquidCapsule label='test html' />
                        <LiquidCapsule position={[0, -0.8, -1]} label='test html 2 ' />
                        <LiquidCapsule position={[0, -1.6, -1]} label='test html 3 ' />
                        <LiquidCapsule position={[0, -2.4, -1]} label='test html 4 ' />
                        <LiquidCapsule position={[0, -3.2, -1]} label='test html 5 ' />
                        <LiquidCapsule position={[0, -4, -1]} label='test html 5 ' />
                        <LiquidCapsule position={[0, -4.8, -1]} label='test html 5 ' />
                        <LiquidCapsule position={[0, -5.6, -1]} label='test html 5 ' />
                        <LiquidCapsule position={[0, -6.4, -1]} label='test html 5 ' />
                        <LiquidCapsule position={[0, -7.2, -1]} label='test html 5 ' />
                    </Suspense>         
                </Canvas>
            </div>
        </div>
    )
}

export default page;