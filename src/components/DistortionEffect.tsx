"use client";

import React, { useRef, useEffect, useState } from 'react';

const DistortionEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const image = new Image();
    image.src = '/images/pich.png';
    image.onload = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };

    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });
      setIsMouseOver(true);
    };

    const handleMouseLeave = () => {
      setIsMouseOver(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const radius = 100; // Radius of the magnifying effect
    const drawMagnifier = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const image = new Image();
      image.src = '/images/pich.png';
      image.onload = () => {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        if (isMouseOver) {
          const { x, y } = mousePos;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2, false);
          ctx.clip();

          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
          ctx.restore();
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2, false);
          ctx.strokeStyle = 'black';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      };
    };

    drawMagnifier();
    window.requestAnimationFrame(drawMagnifier);
  }, [isMouseOver, mousePos]);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh' }} />;
};

export default DistortionEffect;