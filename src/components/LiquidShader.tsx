import { useEffect, useRef } from 'react';

interface WaveLayer {
  amp: number;
  freq: number;
  speed: number;
  phase: number;
  color: string;
  alpha: number;
}

const LAYERS: WaveLayer[] = [
  { amp: 0.055, freq: 0.011, speed: 0.38, phase: 0, color: '255,40,0', alpha: 0.10 },
  { amp: 0.04, freq: 0.018, speed: 0.55, phase: 1.2, color: '255,40,0', alpha: 0.07 },
  { amp: 0.065, freq: 0.007, speed: 0.28, phase: 2.4, color: '180,0,0', alpha: 0.12 },
  { amp: 0.03, freq: 0.025, speed: 0.7, phase: 0.8, color: '255,80,20', alpha: 0.05 },
];

export default function LiquidShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let t = 0;
    let rafId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      const { width: W, height: H } = canvas;
      ctx.clearRect(0, 0, W, H);

      LAYERS.forEach((layer) => {
        const ampPx = H * layer.amp;
        ctx.beginPath();

        for (let x = 0; x <= W; x += 3) {
          const y =
            H * 0.52 +
            Math.sin(x * layer.freq + t * layer.speed + layer.phase) * ampPx +
            Math.sin(x * layer.freq * 0.43 - t * layer.speed * 0.6 + layer.phase) *
              (ampPx * 0.45);

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.lineTo(W, H);
        ctx.lineTo(0, H);
        ctx.closePath();
        ctx.fillStyle = `rgba(${layer.color}, ${layer.alpha})`;
        ctx.fill();
      });

      t += 0.018;
      rafId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
    />
  );
}
