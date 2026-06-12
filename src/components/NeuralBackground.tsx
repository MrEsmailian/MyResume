import { useEffect, useRef } from 'react';

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse position
    const mouse = { x: -1000, y: -1000, radius: 180 };

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      pulsate: number;
      speed: number;
    }

    const particles: Particle[] = [];
    const particleCount = Math.min(Math.floor((width * height) / 11000), 120);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 2 + 1,
        pulsate: Math.random() * Math.PI,
        speed: 0.02 + Math.random() * 0.03,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Gradient background
      ctx.fillStyle = '#020617'; // slate-950 dark navy
      ctx.fillRect(0, 0, width, height);

      // Radial vignette lighting in background around mouse to simulate brain scanner illumination
      if (mouse.x > -1000) {
        const bgGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          20,
          mouse.x,
          mouse.y,
          350
        );
        bgGrad.addColorStop(0, '#091e4a'); // subtle deep blue
        bgGrad.addColorStop(1, '#020617');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw and update particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on borders
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        p.pulsate += p.speed;
        const radiusScale = p.radius + Math.sin(p.pulsate) * 0.5;

        ctx.beginPath();
        ctx.arc(p.x, p.y, radiusScale, 0, Math.PI * 2);
        ctx.fillStyle = '#3b82f6'; // electric blue
        ctx.shadowColor = '#3b82f6';
        ctx.shadowBlur = p.radius > 2 ? 4 : 0;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      });

      // Draw neural connections (edges)
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distSq = (p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2;
          const maxDistSq = 120 ** 2;

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq);
            let alpha = (1 - dist / 120) * 0.22;

            // Enhance connections near mouse cursor representing active attention neurons
            if (mouse.x > -1000) {
              const dx1 = p1.x - mouse.x;
              const dy1 = p1.y - mouse.y;
              const d1 = dx1 * dx1 + dy1 * dy1;
              
              const dx2 = p2.x - mouse.x;
              const dy2 = p2.y - mouse.y;
              const d2 = dx2 * dx2 + dy2 * dy2;

              if (d1 < mouse.radius ** 2 && d2 < mouse.radius ** 2) {
                alpha = alpha * 3.5; // significantly brighter in proximity area
              }
            }

            if (alpha > 0) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
              ctx.lineWidth = 0.6 + (1 - dist / 120) * 0.5;
              ctx.stroke();
            }
          }
        }

        // Draw light connections from mouse to particles in range
        if (mouse.x > -1000) {
          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < mouse.radius ** 2) {
            const dist = Math.sqrt(distSq);
            const alpha = (1 - dist / mouse.radius) * 0.15;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(p1.x, p1.y);
            ctx.strokeStyle = `rgba(14, 165, 233, ${alpha})`; // cyan link
            ctx.lineWidth = 0.5 + (1 - dist / mouse.radius) * 0.6;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-50 bg-slate-950 pointer-events-none"
      id="neural-background"
    />
  );
}
