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
        size: 1 + Math.random() * 3,
        speedY: 0.3 + Math.random() * 0.8,
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: 0,
        life: 0,
        maxLife,
      };
    };

    // Initialize particles
    for (let i = 0; i < 40; i++) {
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

        // Fade in then out
        if (p.life < 60) {
          p.opacity = p.life / 60;
        } else if (p.life > p.maxLife - 60) {
          p.opacity = (p.maxLife - p.life) / 60;
        } else {
          p.opacity = 1;
        }

        // Subtle size pulse
        const pulse = 1 + Math.sin(p.life * 0.05) * 0.3;
        const drawSize = p.size * pulse;

        // Draw glow
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, drawSize * 4
        );
        gradient.addColorStop(0, `rgba(212, 175, 55, ${p.opacity * 0.8})`);
        gradient.addColorStop(0.5, `rgba(212, 175, 55, ${p.opacity * 0.2})`);
        gradient.addColorStop(1, "rgba(212, 175, 55, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, drawSize * 4, 0, Math.PI * 2);
        ctx.fill();

        // Draw core
        ctx.fillStyle = `rgba(255, 220, 120, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, drawSize, 0, Math.PI * 2);
        ctx.fill();

        // Recycle
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
