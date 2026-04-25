import { useEffect, useRef, useState, useMemo } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  motionValue,
} from 'framer-motion';

const BoomEffect = () => {
  const particles = useMemo(() =>
    [...Array(12)].map((_, i) => {
      const angle = (i / 12) * 360;
      const rad   = (angle * Math.PI) / 180;
      const dist  = 44 + (i % 3) * 14;
      return {
        id:    i,
        x:     Math.cos(rad) * dist,
        y:     Math.sin(rad) * dist,
        color: i % 3 === 0 ? '#22d3ee' : i % 3 === 1 ? '#a78bfa' : '#7c3aed',
        size:  3 + (i % 2) * 2,
      };
    }), []
  );

  return (
    <>
      {/* White flash */}
      <motion.div
        className="fixed z-[103] rounded-full pointer-events-none"
        style={{
          top: '1px', left: '50%',
          translateX: '-50%', translateY: '-50%',
          background: 'white',
        }}
        initial={{ width: 8, height: 8, opacity: 1 }}
        animate={{ width: 0,  height: 0,  opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />

      {/* Expanding rings */}
      {[
        { size: 60,  color: 'rgba(34,211,238,1)',    delay: 0.00 },
        { size: 110, color: 'rgba(167,139,250,0.8)', delay: 0.07 },
        { size: 170, color: 'rgba(124,58,237,0.5)',  delay: 0.14 },
      ].map((ring, i) => (
        <motion.div
          key={i}
          className="fixed z-[102] rounded-full pointer-events-none"
          style={{
            top: '1px', left: '50%',
            border: `2px solid ${ring.color}`,
            translateX: '-50%', translateY: '-50%',
          }}
          initial={{ width: 4,         height: 4,         opacity: 1 }}
          animate={{ width: ring.size, height: ring.size, opacity: 0 }}
          transition={{ duration: 0.85, delay: ring.delay, ease: 'easeOut' }}
        />
      ))}

      {/* Shockwave line */}
      <motion.div
        className="fixed z-[102] pointer-events-none"
        style={{
          top: '0px', left: '50%',
          height: '2px',
          translateX: '-50%',
          background:
            'linear-gradient(90deg, transparent, #22d3ee, white, #a78bfa, transparent)',
          borderRadius: '999px',
        }}
        initial={{ width: 0,   opacity: 1 }}
        animate={{ width: 240, opacity: 0 }}
        transition={{ duration: 0.55, ease: 'easeOut' }}
      />

      {/* Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="fixed z-[102] rounded-full pointer-events-none"
          style={{
            top: '1px', left: '50%',
            width:  `${p.size}px`,
            height: `${p.size}px`,
            background:  p.color,
            boxShadow:  `0 0 6px 2px ${p.color}`,
          }}
          initial={{ x: '-50%', y: '-50%', opacity: 1, scale: 1   }}
          animate={{ x: `calc(-50% + ${p.x}px)`, y: p.y - 4, opacity: 0, scale: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut', delay: 0.04 }}
        />
      ))}
    </>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  /* ── single smooth spring driving everything ── */
  const smooth = useSpring(scrollYProgress, {
    stiffness: 180,
    damping:    28,
    restDelta:  0.0005,
  });

  /* ── bar widths: 0 → 50% as scroll goes 0 → 1 ── */
  const barWidth   = useTransform(smooth, [0, 1], ['0%',  '50%']);

  /* ── orb positions as % of viewport width ── */
  const leftOrbPct  = useTransform(smooth, [0, 1], ['0%',   '50%']);
  const rightOrbPct = useTransform(smooth, [0, 1], ['100%', '50%']);

  /* ── orb opacity: hide before 0.5% and after 97% ── */
  const orbOpacity  = useTransform(smooth, [0, 0.005, 0.97, 0.985], [0, 1, 1, 0]);

  /* ── boom trigger ── */
  const [showBoom, setShowBoom] = useState(false);
  const [boomKey,  setBoomKey]  = useState(0);
  const prevRef = useRef(0);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      if (v >= 0.985 && prevRef.current < 0.985) {
        setBoomKey((k) => k + 1);
        setShowBoom(true);
        setTimeout(() => setShowBoom(false), 1500);
      }
      prevRef.current = v;
    });
    return unsub;
  }, [scrollYProgress]);

  return (
    <>
      {/* Faint track */}
      <div
        className="fixed top-0 left-0 right-0 z-[97] pointer-events-none"
        style={{ height: '2px', background: 'rgba(255,255,255,0.04)' }}
      />

      {/* Left glow blur */}
      <motion.div
        className="fixed top-0 left-0 z-[98] pointer-events-none"
        style={{
          height:     '12px',
          marginTop:  '-5px',
          width:      barWidth,
          background: 'linear-gradient(90deg, rgba(34,211,238,0.5), rgba(139,92,246,0.5))',
          filter:     'blur(6px)',
        }}
      />

      {/* Right glow blur */}
      <motion.div
        className="fixed top-0 right-0 z-[98] pointer-events-none"
        style={{
          height:     '12px',
          marginTop:  '-5px',
          width:      barWidth,
          background: 'linear-gradient(270deg, rgba(34,211,238,0.5), rgba(139,92,246,0.5))',
          filter:     'blur(6px)',
        }}
      />

      {/* Left crisp bar */}
      <motion.div
        className="fixed top-0 left-0 z-[99] pointer-events-none"
        style={{
          height:     '2px',
          width:      barWidth,
          background: 'linear-gradient(90deg, #22d3ee 0%, #a78bfa 100%)',
        }}
      />

      {/* Right crisp bar */}
      <motion.div
        className="fixed top-0 right-0 z-[99] pointer-events-none"
        style={{
          height:     '2px',
          width:      barWidth,
          background: 'linear-gradient(270deg, #22d3ee 0%, #a78bfa 100%)',
        }}
      />

      {/* Left orb — cyan */}
      <motion.div
        className="fixed z-[100] rounded-full pointer-events-none"
        style={{
          top:        '-5px',
          left:       leftOrbPct,
          translateX: '-50%',
          opacity:    orbOpacity,
          width:      '12px',
          height:     '12px',
          background: 'radial-gradient(circle at 35% 35%, #a5f3fc, #22d3ee)',
        }}
        animate={{
          boxShadow: [
            '0 0 8px 2px rgba(34,211,238,0.8), 0 0 20px 4px rgba(34,211,238,0.3)',
            '0 0 16px 5px rgba(34,211,238,1.0), 0 0 38px 10px rgba(34,211,238,0.6)',
            '0 0 8px 2px rgba(34,211,238,0.8), 0 0 20px 4px rgba(34,211,238,0.3)',
          ],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Right orb — violet */}
      <motion.div
        className="fixed z-[100] rounded-full pointer-events-none"
        style={{
          top:        '-5px',
          left:       rightOrbPct,
          translateX: '-50%',
          opacity:    orbOpacity,
          width:      '12px',
          height:     '12px',
          background: 'radial-gradient(circle at 35% 35%, #c4b5fd, #7c3aed)',
        }}
        animate={{
          boxShadow: [
            '0 0 8px 2px rgba(124,58,237,0.8), 0 0 20px 4px rgba(124,58,237,0.3)',
            '0 0 16px 5px rgba(124,58,237,1.0), 0 0 38px 10px rgba(124,58,237,0.6)',
            '0 0 8px 2px rgba(124,58,237,0.8), 0 0 20px 4px rgba(124,58,237,0.3)',
          ],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
      />

      {/* BOOM */}
      {showBoom && <BoomEffect key={boomKey} />}
    </>
  );
};

export default ScrollProgress;