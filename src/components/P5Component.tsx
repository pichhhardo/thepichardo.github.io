// src/components/P5Component.tsx

'use client';

import { useEffect, useRef } from 'react';
import p5 from 'p5';

const P5Component = () => {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sketch = (p: any) => {
      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight).parent(canvasRef.current!);
      };

      p.draw = () => {
        p.background(200);
        p.ellipse(p.mouseX, p.mouseY, 50, 50);
      };
    };

    const myP5 = new p5(sketch);

    return () => {
      myP5.remove();
    };
  }, []);

  return <div ref={canvasRef} />;
};

export default P5Component;