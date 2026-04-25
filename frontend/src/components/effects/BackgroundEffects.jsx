import { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';

const BackgroundEffects = () => {
  const [particles, setParticles] = useState([]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);

    const shapes = ['dot', 'ring', 'cross', 'square'];
    const generatedParticles = Array.from({ length: 35 }).map((_, i) => {
      const type = shapes[Math.floor(Math.random() * shapes.length)];
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: type === 'dot' ? Math.random() * 3 + 1 : Math.random() * 20 + 10,
        duration: Math.random() * 25 + 15,
        delay: Math.random() * 15,
        type: type,
        rotation: Math.random() * 360,
        direction: Math.random() > 0.5 ? 1 : -1
      };
    });
    setParticles(generatedParticles);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const spotlightBackground = useMotionTemplate`radial-gradient(800px circle at ${smoothX}px ${smoothY}px, rgba(34, 211, 238, 0.08), transparent 80%)`;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1] bg-zinc-950">
      {/* Interactive Mouse Spotlight */}
      <motion.div className="absolute inset-0 z-0" style={{ background: spotlightBackground }} />

      {/* Tech Grid Pattern */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#4f4f4f15_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f15_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Floating Geometric Particles */}
      <div className="absolute inset-0 z-0">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute flex items-center justify-center opacity-0"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
            }}
            animate={{
              y: [0, -400],
              x: [0, p.direction * 100],
              opacity: [0, 0.6, 0],
              rotate: [p.rotation, p.rotation + (360 * p.direction)],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
          >
            {p.type === 'dot' && (
              <div className="w-full h-full bg-cyan-400/60 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
            )}
            {p.type === 'ring' && (
              <div className="w-full h-full border border-violet-500/30 rounded-full" />
            )}
            {p.type === 'square' && (
              <div className="w-full h-full border border-cyan-500/20 rounded-md" />
            )}
            {p.type === 'cross' && (
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-zinc-500/40"
              >
                <path d="M12 2v20M2 12h20" />
              </svg>
            )}
          </motion.div>
        ))}
      </div>

      {/* Glowing Ambient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-900/10 blur-[120px] z-[-1]"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -100, 0],
          y: [0, -50, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-violet-900/10 blur-[120px] z-[-1]"
      />
    </div>
  );
};

export default BackgroundEffects;