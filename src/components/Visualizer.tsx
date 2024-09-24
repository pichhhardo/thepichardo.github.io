'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Particles } from './ParticleSystem';

interface VisualizerProps {
  midiData: Uint8Array | null;
}

const Visualizer: React.FC<VisualizerProps> = ({ midiData }) => {
  const particlesRef = useRef<any>(null);

  useEffect(() => {
    if (particlesRef.current) {
      particlesRef.current.updateParticles(midiData);
    }
  }, [midiData]);

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Particles ref={particlesRef} />
      <OrbitControls />
    </Canvas>
  );
};

export default Visualizer;