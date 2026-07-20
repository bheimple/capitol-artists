"use client";

import { useEffect, useRef } from "react";

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];

    type Particle = {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      life: number;
      maxLife: number;
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const createParticle = (): Particle => {
      const maxLife = 200 + Math.random() * 300;
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        size: 1 + Math.random() * 2,
        speedY: 0.2 + Math.random() * 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: 0,
        life: 0,
        maxLife,
      };
    };

    // Reduced particle count for performance
    const PARTICLE_COUNT = 18;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = createParticle();
      p.y = Math.random() * canvas.height;
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.life++;
        p.y -= p.speedY;
        p.x += p.speedX;

        if (p.life < 60) {
          p.opacity = p.life / 60;
        } else if (p.life > p.maxLife - 60) {
          p.opacity = (p.maxLife - p.life) / 60;
        } else {
          p.opacity = 1;
        }

        // Simple solid circle instead of expensive radial gradient
        ctx.fillStyle = `rgba(107, 142, 90, ${p.opacity * 0.6})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Subtle glow only on larger particles, using shadowBlur
        if (p.size > 1.5) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = `rgba(107, 142, 90, ${p.opacity * 0.4})`;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        if (p.life >= p.maxLife || p.y < -20) {
          particles[i] = createParticle();
        }
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
    />
  );
}
