'use client'
import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Lights from './Lights'
import Nijoow from './Nijoow'

const Three = () => {
  return (
    <div className="w-full h-[200px] sm:h-[320px]">
      <Canvas camera={{ position: [0, 0, 1], fov: 70 }}>
        <OrbitControls maxDistance={2} minDistance={0.9} />
        <Lights />
        <Suspense fallback={null}>
          <Nijoow />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Three
