
import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

function ThreeModel({ members, nodes }) {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const newLines = [];
    
    for (let index = 0; index < members.length; index++) {
      const member = members[index];
      const startNode = nodes[member.start];
      const endNode = nodes[member.end];
  
      if (startNode && endNode) {
        const points = [
          new THREE.Vector3(...startNode),
          new THREE.Vector3(...endNode),
        ];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
  
        newLines.push(
          <line key={index}>
            <primitive object={geometry} attach="geometry" />
            <lineBasicMaterial attach="material" color="black" />
          </line>
        );
      }
    }
  
    setLines(newLines);
  }, [members, nodes]);
  

  const createDottedAxisLine = (start, end, color) => {
    const points = [start, end];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    return (
      <lineSegments geometry={geometry}>
        <lineDashedMaterial
          attach="material"
          color={color}
          dashSize={0.5}
          gapSize={0.2}
          linewidth={1}
        />
      </lineSegments>
    );
  };

  return (
    <>
      {lines}
      <mesh position={[5, 0, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <mesh position={[0, 5, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="green" />
      </mesh>
      <mesh position={[0, 0, 5]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="blue" />
      </mesh>

      {createDottedAxisLine(new THREE.Vector3(0, 0, 0), new THREE.Vector3(15, 0, 0), "red")}
      {createDottedAxisLine(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 15, 0), "green")}
      {createDottedAxisLine(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 15), "blue")}

      <Text position={[11, 0, 0]} color="red" fontSize={3} anchorX="center" anchorY="right">
        X
      </Text>
      <Text position={[0, 11, 0]} color="green" fontSize={3} anchorX="left" anchorY="bottom">
        Y
      </Text>
      <Text position={[0, 0, 11]} color="blue" fontSize={3} anchorX="right" anchorY="top">
        Z
      </Text>
    </>
  );
}

export default ThreeModel;
