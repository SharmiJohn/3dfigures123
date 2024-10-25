
import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import ExcelDataReader from './ExcelDataReader';
import ThreeModel from './threeModel';
import { OrbitControls } from '@react-three/drei';
import "./App.css";

function App() {
  const [members, setMembers] = useState([]);
  const [nodes, setNodes] = useState({});

  const handleDataLoaded = (data) => {
    setMembers(data.members);
    setNodes(data.nodes);
  };

  return (
    <div className="canvasContainer">
      <ExcelDataReader onDataLoaded={handleDataLoaded} />
      <Canvas camera={{ position: [-20, 70, 100], fov: 75 }}>
        <pointLight position={[10, 10, 10]} />
        <ambientLight intensity={0.5} />
        <ThreeModel members={members} nodes={nodes} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;
