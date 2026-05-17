'use client';

import { useEffect, useMemo, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

interface NeuralTopologyProps {
  density?: number; // nodes
  speed?: number;
  className?: string;
}

export function NeuralTopology({ density = 70, speed = 0.25, className }: NeuralTopologyProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const sizeRef = useRef<{ w: number; h: number; dpr: number }>({ w: 0, h: 0, dpr: 1 });

  const palette = useMemo(
    () => ({
      node: 'rgba(96, 165, 250, 0.85)',
      core: 'rgba(167, 139, 250, 0.95)',
      line: (alpha: number) => `rgba(96, 165, 250, ${alpha})`,
      glow: 'rgba(139, 92, 246, 0.55)',
    }),
    [],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      sizeRef.current = { w, h, dpr };
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function initNodes() {
      const { w, h } = sizeRef.current;
      const count = Math.min(density, Math.floor((w * h) / 18000));
      nodesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        r: Math.random() * 1.4 + 0.4,
      }));
    }

    function step() {
      if (!ctx) return;
      const { w, h } = sizeRef.current;
      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;
      const maxDist = 130;

      // update + draw nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        if (mouse) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 22000) {
            const f = (22000 - d2) / 22000;
            n.x += (dx / Math.sqrt(d2 + 1)) * f * 0.6;
            n.y += (dy / Math.sqrt(d2 + 1)) * f * 0.6;
          }
        }

        ctx.beginPath();
        ctx.fillStyle = palette.node;
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxDist) {
            const alpha = (1 - d / maxDist) * 0.35;
            ctx.beginPath();
            ctx.strokeStyle = palette.line(alpha);
            ctx.lineWidth = 0.6;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      animationRef.current = requestAnimationFrame(step);
    }

    function onMouseMove(e: MouseEvent) {
      if (!canvas) return;
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    }
    function onMouseLeave() {
      mouseRef.current = null;
    }

    resize();
    initNodes();
    step();

    window.addEventListener('resize', () => {
      resize();
      initNodes();
    });
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [density, speed, palette]);

  return <canvas ref={canvasRef} className={className} />;
}
