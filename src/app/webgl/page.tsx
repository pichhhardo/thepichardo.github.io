// src/pages/webgl/index.tsx
'use client';

import { useRef, useEffect } from 'react';

export default function WebGLProject() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext('webgl');

    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }, []);

  return <canvas ref={canvasRef} width={400} height={400}></canvas>;
}