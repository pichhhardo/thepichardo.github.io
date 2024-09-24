// src/pages/index.tsx
import Link from 'next/link';


export default function Home() {
  return (
    <div>
      <h1>Explore our Digital Art Museum.</h1>
      <ul>
      <li>
          <Link href="/distortion-effect">Liquify FX</Link>
        </li>
        <li>
          <Link href="/aframe">Virtual World Project</Link>
        </li>
        <li>
          <Link href="/valle-de-bravo">Valle de Bravo 360°</Link>
        </li>
        <li>
          <Link href="/midi">MIDI Visualizer Project</Link>
        </li>
        <li>
          <Link href="/three">Three.js Project</Link>
        </li>
        <li>
          <Link href="/p5">p5.js Project</Link>
        </li>
        <li>
          <Link href="/d3">D3 Project</Link>
        </li>
        <li>
          <Link href="/webgl">WebGL Project</Link>
        </li>
      </ul>
    </div>
  );
}