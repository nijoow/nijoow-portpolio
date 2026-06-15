import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { Group } from 'three';

interface NijoowGLTF {
  nodes: {
    Curve003: THREE.Mesh;
  };
  materials: {
    ['Material.001']: THREE.MeshStandardMaterial;
  };
}

export default function Nijoow() {
  const group = useRef<Group>(null);
  const [isClicked, setIsClicked] = useState(false);
  // useGLTF 반환 타입(GLTF)은 노드 형상을 알 수 없어 R3F 표준대로 구체 타입으로 단언한다.
  const { nodes, materials } = useGLTF(
    '/3D/nijoowPurple.glb',
  ) as unknown as NijoowGLTF;

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

useGLTF.preload('/3D/nijoowPurple.glb');
