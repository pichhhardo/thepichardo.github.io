// src/pages/d3/index.tsx
'use client';

import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export default function D3Project() {
  const d3Container = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3.select(d3Container.current)
      .attr('width', 400)
      .attr('height', 400);

    svg.append('circle')
      .attr('cx', 200)
      .attr('cy', 200)
      .attr('r', 50)
      .style('fill', 'blue');
  }, []);

  return <svg ref={d3Container}></svg>;
}