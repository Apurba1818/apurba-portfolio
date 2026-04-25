import { motion, useScroll, useTransform, useMotionValue, useSpring, animate } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ChevronRight, Mail, Github, Linkedin, ArrowDown } from 'lucide-react';
import { DATA } from '../../data/portfolioData';
import { staggerContainer, fadeInUp } from '../../utils/animations';

/* ── Typewriter cycling through roles ── */
const ROLES = ['MERN Stack Developer', 'Full Stack Engineer', 'React Specialist', 'Node.js Developer'];

const Typewriter = () => {
  const [roleIdx, setRoleIdx]   = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting,  setDeleting]  = useState(false);
  const [pause,     setPause]     = useState(false);

  useEffect(() => {
    if (pause) {
      const t = setTimeout(() => { setDeleting(true); setPause(false); }, 1800);
      return () => clearTimeout(t);
    }
    const full = ROLES[roleIdx];
    if (!deleting) {
      if (displayed.length < full.length) {
        const t = setTimeout(() => setDisplayed(full.slice(0, displayed.length + 1)), 60);
        return () => clearTimeout(t);
      } else { setPause(true); }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
        return () => clearTimeout(t);
      } else { setDeleting(false); setRoleIdx((i) => (i + 1) % ROLES.length); }
    }
  }, [displayed, deleting, pause, roleIdx]);

  return (
    <span className="text-cyan-400 font-mono">
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="inline-block w-0.5 h-5 bg-cyan-400 ml-0.5 align-middle"
      />
    </span>
  );
};

/* ── Orbiting tech ring around photo ── */
const TECHS = ['React', 'Node', 'MongoDB', 'Express', 'JS', 'Tailwind', 'Git', 'REST'];

const OrbitRing = ({ radius, duration, techs, clockwise = true }) => (
  <motion.div
    className="absolute rounded-full border border-white/5"
    style={{ width: radius * 2, height: radius * 2, top: '50%', left: '50%', marginTop: -radius, marginLeft: -radius }}
    animate={{ rotate: clockwise ? 360 : -360 }}
    transition={{ duration, repeat: Infinity, ease: 'linear' }}
  >
    {techs.map((tech, i) => {
      const angle = (i / techs.length) * 2 * Math.PI;
      const x = radius * Math.cos(angle) - 20;
      const y = radius * Math.sin(angle) - 10;
      return (
        <motion.div
          key={tech}
          className="absolute px-2 py-0.5 rounded-full bg-zinc-900/80 border border-white/10 text-zinc-400 text-xs font-mono backdrop-blur-sm"
          style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
          animate={{ rotate: clockwise ? -360 : 360 }}
          transition={{ duration, repeat: Infinity, ease: 'linear' }}
          whileHover={{ scale: 1.2, color: '#22d3ee', borderColor: 'rgba(34,211,238,0.5)' }}
        >
          {tech}
        </motion.div>
      );
    })}
  </motion.div>
);

/* ── Animated stat counter ── */
const StatCard = ({ value, label, delay }) => {
  const [count, setCount] = useState(0);
  const ref  = useRef(null);
  const seen = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !seen.current) {
        seen.current = true;
        const controls = animate(0, value, {
          duration: 1.6,
          delay,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (v) => setCount(Math.floor(v)),
        });
        return () => controls.stop();
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay + 0.5, duration: 0.6 }}
      className="text-center"
    >
      <div className="text-2xl md:text-3xl font-black text-white tabular-nums">
        {count}<span className="text-cyan-400">+</span>
      </div>
      <div className="text-xs text-zinc-500 font-mono mt-0.5 whitespace-nowrap">{label}</div>
    </motion.div>
  );
};

/* ── Main Hero ── */
const Hero = () => {
  const sectionRef = useRef(null);
  const mouseX     = useMotionValue(0);
  const mouseY     = useMotionValue(0);
  const smoothX    = useSpring(mouseX, { stiffness: 80, damping: 20 });
  const smoothY    = useSpring(mouseY, { stiffness: 80, damping: 20 });
  const imgRotateX = useTransform(smoothY, [-300, 300], [8, -8]);
  const imgRotateY = useTransform(smoothX, [-300, 300], [-8, 8]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const heroOpacity  = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroY        = useTransform(scrollYProgress, [0, 0.6], [0, -60]);
  const photoOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const photoY       = useTransform(scrollYProgress, [0, 0.5], [0, -40]);

  const handleMouseMove = (e) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width  / 2);
    mouseY.set(e.clientY - rect.top  - rect.height / 2);
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden"
    >

      {/* ── always-drifting gradient blobs behind everything ── */}
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-10 left-[10%] w-80 h-80 rounded-full bg-cyan-500/5 blur-[80px] pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute bottom-20 right-[10%] w-96 h-96 rounded-full bg-violet-500/5 blur-[100px] pointer-events-none"
      />

      <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-8">

        {/* ══════════════ LEFT — text ══════════════ */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          style={{ opacity: heroOpacity, y: heroY }}
          className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left max-w-2xl"
        >

          {/* Badge */}
          <motion.div variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md"
          >
            <motion.span
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-cyan-400 block"
            />
            <span className="text-sm text-zinc-300 font-mono tracking-wide">Available for new opportunities</span>
          </motion.div>

          {/* Greeting */}
          <motion.p variants={fadeInUp} className="text-cyan-400/80 font-mono mb-3 text-base tracking-widest uppercase">
            Hi there, I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            variants={fadeInUp}
            className="text-6xl md:text-8xl font-black mb-4 tracking-tighter leading-none"
          >
            <motion.span
              className="text-transparent bg-clip-text inline-block"
              style={{
                backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #d4d4d8 40%, #71717a 100%)',
              }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            >
              {DATA.name.split(' ')[0]}
            </motion.span>
            <br />
            <motion.span
              className="text-transparent bg-clip-text inline-block"
              style={{
                backgroundImage: 'linear-gradient(135deg, #22d3ee 0%, #a78bfa 50%, #7c3aed 100%)',
                backgroundSize: '200% 200%',
              }}
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              {DATA.name.split(' ')[1]}
            </motion.span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div variants={fadeInUp} className="text-xl md:text-2xl font-semibold mb-6 h-8">
            <Typewriter />
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={fadeInUp}
            className="text-zinc-400 text-base md:text-lg mb-10 leading-relaxed max-w-xl"
          >
            I am a <span className="text-cyan-400 font-medium">MERN Stack Developer</span>{' '}
            specializing in building exceptional digital experiences. Currently focused on
            building accessible, human-centered, full-stack applications.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 mb-12">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="relative px-8 py-4 rounded-full font-bold text-white flex items-center justify-center gap-2 group overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #06b6d4, #7c3aed)' }}
            >
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'linear-gradient(135deg, #22d3ee, #a78bfa)' }}
              />
              <span className="relative z-10 flex items-center gap-2">
                View Projects
                <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </span>
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05, borderColor: 'rgba(34,211,238,0.5)' }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-full font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <Mail size={18} /> Contact Me
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={fadeInUp} className="flex items-center gap-6 mb-12">
            <span className="text-zinc-600 text-xs font-mono tracking-widest">FIND ME ON</span>
            <div className="h-px w-8 bg-zinc-700" />
            {[
              { icon: <Github size={20} />, href: DATA.socials.github,   label: 'GitHub'   },
              { icon: <Linkedin size={20} />, href: DATA.socials.linkedin, label: 'LinkedIn' },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -3, color: '#22d3ee' }}
                className="text-zinc-500 transition-colors"
              >
                {s.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center gap-8 px-6 py-4 rounded-2xl bg-white/3 border border-white/8 backdrop-blur-sm"
          >
            <StatCard value={2}  label="Projects Built"   delay={0.8} />
            <div className="w-px h-8 bg-white/10" />
            <StatCard value={5}  label="Technologies"     delay={1.0} />
            <div className="w-px h-8 bg-white/10" />
            <StatCard value={2}  label="Certifications"   delay={1.2} />
          </motion.div>
        </motion.div>

        {/* ══════════════ RIGHT — photo ══════════════ */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ opacity: photoOpacity, y: photoY }}
          className="flex-shrink-0 relative flex items-center justify-center w-[340px] h-[340px] md:w-[420px] md:h-[420px]"
        >

          {/* Outer slow-rotate ring with tech labels */}
          <OrbitRing
            radius={200}
            duration={28}
            techs={TECHS.slice(0, 4)}
            clockwise={true}
          />
          <OrbitRing
            radius={170}
            duration={20}
            techs={TECHS.slice(4)}
            clockwise={false}
          />

          {/* Pulsing aura rings */}
          {[1, 2, 3].map((n) => (
            <motion.div
              key={n}
              className="absolute rounded-full border border-cyan-400/10 pointer-events-none"
              style={{ width: 280 + n * 40, height: 280 + n * 40 }}
              animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.08, 0.3] }}
              transition={{ duration: 2.5 + n * 0.7, repeat: Infinity, ease: 'easeInOut', delay: n * 0.4 }}
            />
          ))}

          {/* Mouse-parallax 3D tilt card */}
          <motion.div
            style={{ rotateX: imgRotateX, rotateY: imgRotateY, transformStyle: 'preserve-3d' }}
            className="relative w-64 h-72 md:w-72 md:h-80"
          >
            {/* Glow behind photo */}
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 40px 10px rgba(34,211,238,0.25), 0 0 80px 20px rgba(124,58,237,0.15)',
                  '0 0 60px 20px rgba(34,211,238,0.40), 0 0 120px 40px rgba(124,58,237,0.25)',
                  '0 0 40px 10px rgba(34,211,238,0.25), 0 0 80px 20px rgba(124,58,237,0.15)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-3xl pointer-events-none z-0"
            />

            {/* Photo */}
            <img
              src="/profile.jpg"
              alt={DATA.name}
              className="w-full h-full object-cover object-top rounded-3xl relative z-10 select-none"
              style={{
                maskImage:        'linear-gradient(to bottom, black 75%, transparent 100%)',
                WebkitMaskImage:  'linear-gradient(to bottom, black 75%, transparent 100%)',
              }}
            />

            {/* Animated cyan border */}
            <motion.div
              animate={{
                borderColor: [
                  'rgba(34,211,238,0.4)',
                  'rgba(139,92,246,0.6)',
                  'rgba(34,211,238,0.4)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-3xl border-2 z-20 pointer-events-none"
            />

            {/* Floating name badge at bottom */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-30 px-4 py-2 rounded-full bg-zinc-900/90 border border-white/10 backdrop-blur-md whitespace-nowrap"
            >
              <span className="text-xs font-mono text-cyan-400">{DATA.role}</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-zinc-600 text-xs font-mono tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} className="text-zinc-600" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
