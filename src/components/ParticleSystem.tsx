'use client';

import React, { forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleSystemProps {}

const ParticleSystem = forwardRef<any, ParticleSystemProps>((_, ref) => {
  const particles = useRef<THREE.Points | null>(null);

  useEffect(() => {
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.PointsMaterial({ color: 0xff0000, size: 0.05 });
    particles.current = new THREE.Points(geometry, material);
  }, []);

  useFrame(() => {
    if (particles.current) {
      // Animar partículas aquí
    }
  });

  useImperativeHandle(ref, () => ({
    updateParticles: (midiData: Uint8Array | null) => {
      if (particles.current) {
        // Actualizar partículas aquí
      }
    }
  }));

  return particles.current ? <primitive object={particles.current} /> : null;
});

export { ParticleSystem as Particles };