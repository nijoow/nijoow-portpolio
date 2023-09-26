import React from 'react'

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.9} />
      <directionalLight castShadow position={[0, 0, 1]} intensity={2} />
      <directionalLight position={[-3, -3, -3]} intensity={0.4} />
      <directionalLight position={[3, 3, 3]} intensity={0.8} />
    </>
  )
}

export default Lights
