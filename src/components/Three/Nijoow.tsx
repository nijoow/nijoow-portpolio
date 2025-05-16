import React, { useState, useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import { Group } from 'three';

type GLTFResult = GLTF & {
  nodes: {
    Curve003: THREE.Mesh;
  };
  materials: {
    ['Material.001']: THREE.MeshStandardMaterial;
  };
};

export default function Nijoow() {
  const group = useRef<Group>(null);
  const [isClicked, setIsClicked] = useState(false);
  const { nodes, materials } = useGLTF('/3D/nijoowPurple.glb') as GLTFResult;

  useFrame(() => {
    if (!group.current) return;
    !isClicked && (group.current.rotation.y += 0.004);
  });

  return (
    <group
      ref={group}
      dispose={null}
      onPointerDown={(event) => {
        event.stopPropagation();
        const target = event.target as HTMLCanvasElement;
        target.setPointerCapture(event.pointerId);
        setIsClicked(true);
      }}
      onPointerUp={(event) => {
        event.stopPropagation();
        const target = event.target as HTMLCanvasElement;
        target.releasePointerCapture(event.pointerId);
        setIsClicked(false);
      }}
    >
      <mesh
        geometry={nodes.Curve003.geometry}
        material={materials['Material.001']}
        rotation={[Math.PI / 2, 0, 0]}
        scale={30}
      />
    </group>
  );
}

useGLTF.preload('/3D/nijoow.glb');
