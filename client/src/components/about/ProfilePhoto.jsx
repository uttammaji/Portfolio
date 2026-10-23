import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Briefcase, GraduationCap, Code2 } from 'lucide-react';
import Container from '@/components/ui/Container';
import mypic1 from '@/assets/mypic1.jpeg';
import mypic2 from '@/assets/mypic2.jpeg';

/* ================================================================== */
/*  CONSTANTS                                                          */
/* ================================================================== */

const STATS = [
  { icon: Code2,         label: 'FOCUS',     value: 'Full-Stack' },
  { icon: Briefcase,     label: 'STACK',     value: 'MERN' },
  { icon: GraduationCap, label: 'EDUCATION', value: 'B.Tech CSE' },
  { icon: MapPin,        label: 'LOCATION',  value: 'India' },
];

const MOBILE_BREAKPOINT = 768;

/* ================================================================== */
/*  HOOKS                                                              */
/* ================================================================== */

function useIsMobile(breakpoint = MOBILE_BREAKPOINT) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [breakpoint]);
  return isMobile;
}

/* ================================================================== */
/*  SHARED PIECES                                                      */
/* ================================================================== */

function TapeStrip({ rotate = 0, top = '-10px', left = '50%', width = '60px' }) {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute z-40 h-4 bg-[#F5F5F5]/18 border border-[#F5F5F5]/12 backdrop-blur-sm"
      style={{
        top,
        left,
        width,
        transform: `translateX(-50%) rotate(${rotate}deg)`,
        boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
      }}
    />
  );
}

function TornEdge({ position = 'top' }) {
  const isTop = position === 'top';
  return (
    <div
      aria-hidden="true"
      className="absolute left-0 right-0 z-10 h-2.5 pointer-events-none"
      style={{
        [isTop ? 'top' : 'bottom']: '-1px',
        background:
          'repeating-linear-gradient(90deg, transparent 0 4px, #0F0F0F 4px 8px)',
        maskImage:
          'repeating-linear-gradient(90deg, transparent 0 4px, black 4px 6px, transparent 6px 9px)',
        WebkitMaskImage:
          'repeating-linear-gradient(90deg, transparent 0 4px, black 4px 6px, transparent 6px 9px)',
        transform: isTop ? 'none' : 'scaleY(-1)',
      }}
    />
  );
}

function GreenUnderline({ children }) {
  return (
    <span className="relative inline-block">
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        className="absolute left-0 right-0 -bottom-1 w-full h-3 pointer-events-none"
      >
        <path
          d="M2 8 C 40 3, 90 3, 130 6 S 180 9, 198 5"
          fill="none"
          stroke="#7CFF9B"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/* ================================================================== */
/*  HANDMADE NOTE                                                      */
/* ================================================================== */

function HandNote({ children, rotate = -2, className = '' }) {
  return (
    <div
      className={`relative inline-block ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <TapeStrip rotate={-4} top="-8px" left="50%" width="55px" />
      <div className="relative bg-[#0F0F0F] border border-[#252525] px-3 py-2 shadow-[0_2px_0_rgba(255,255,255,0.03),0_8px_20px_rgba(0,0,0,0.5)]">
        {children}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  PHOTO 3D STAGE                                                     */
/* ================================================================== */

/**
 * Photo3DStage — immersive 3D photo display.
 * Features: perspective cards, cursor tilt, floating animation,
 * particle sparks, glowing rings, animated border lines.
 */
function Photo3DStage({ isMobile, reducedMotion }) {
  /* subtle cursor-driven tilt on desktop */
  const stageRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(null); // 1 | 2 | null

  useEffect(() => {
    if (isMobile || reducedMotion) return;
    const el = stageRef.current;
    if (!el) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const nx = (e.clientX - cx) / (rect.width / 2);
      const ny = (e.clientY - cy) / (rect.height / 2);
      setTilt({ x: ny * 7, y: nx * -7 });
    };
    const onLeave = () => setTilt({ x: 0, y: 0 });

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [isMobile, reducedMotion]);

  /* floating keyframe config */
  const floatA = reducedMotion ? {} : {
    animate: { y: [0, -14, 0] },
    transition: { duration: 4.8, repeat: Infinity, ease: 'easeInOut' },
  };
  const floatB = reducedMotion ? {} : {
    animate: { y: [0, -10, 2, 0] },
    transition: { duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.1 },
  };

  /* card sizes */
  const cardW = isMobile ? 148 : 196;
  const cardH = isMobile ? 198 : 262;

  /* spark dots */
  const sparks = [
    { top: '12%',  left: '18%',  delay: 0,    size: 3, color: '#7CFF9B' },
    { top: '22%',  right: '14%', delay: 0.5,  size: 2, color: '#A3FFB0' },
    { top: '65%',  left: '8%',   delay: 1.0,  size: 2, color: '#7CFF9B' },
    { top: '78%',  right: '10%', delay: 0.3,  size: 3, color: '#E5C07B' },
    { top: '45%',  right: '5%',  delay: 1.5,  size: 2, color: '#E5C07B' },
    { top: '88%',  left: '25%',  delay: 0.8,  size: 2, color: '#7CFF9B' },
  ];

  return (
    <div
      ref={stageRef}
      className="relative w-full h-full flex items-center justify-center select-none"
      style={{ perspective: '1000px' }}
    >
      {/* ---- Animated spark dots ---- */}
      {!reducedMotion && sparks.map((s, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="absolute rounded-full pointer-events-none"
          style={{
            width: s.size, height: s.size,
            background: s.color,
            top: s.top, left: s.left, right: s.right,
            boxShadow: `0 0 6px 2px ${s.color}55`,
          }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
        />
      ))}

      {/* ---- ambient glow orb ---- */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 52% 52%, rgba(124,255,155,0.11) 0%, rgba(124,255,155,0.04) 55%, transparent 100%)',
        }}
      />

      {/* ---- outer glow ring (animated) ---- */}
      {!reducedMotion && (
        <motion.div
          aria-hidden="true"
          className="absolute pointer-events-none rounded-full"
          style={{
            width: isMobile ? 260 : 390,
            height: isMobile ? 260 : 390,
            background: 'transparent',
            border: '1px solid rgba(124,255,155,0.08)',
            boxShadow: '0 0 60px 12px rgba(124,255,155,0.05)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* ---- second ring (dashed, slower, counter-rotate) ---- */}
      {!reducedMotion && (
        <motion.div
          aria-hidden="true"
          className="absolute pointer-events-none rounded-full"
          style={{
            width: isMobile ? 300 : 450,
            height: isMobile ? 300 : 450,
            background: 'transparent',
            border: '1px dashed rgba(229,192,123,0.06)',
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {/* ============================================================ */}
      {/* SCENE — 3D container that tilts on cursor                     */}
      {/* ============================================================ */}
      <motion.div
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: 'spring', stiffness: 55, damping: 16 }}
        className="relative"
        style={{
          transformStyle: 'preserve-3d',
          width: isMobile ? 296 : 430,
          height: isMobile ? 320 : 450,
        }}
      >
        {/* ========================================================== */}
        {/* CARD 1 — mypic1                                             */}
        {/* ========================================================== */}
        <motion.div
          {...floatA}
          className="absolute"
          style={{
            width: cardW,
            height: cardH + 62,
            top: isMobile ? 28 : 38,
            left: isMobile ? 6 : 14,
            transformStyle: 'preserve-3d',
            transform: 'rotateY(-10deg) rotateZ(3.5deg)',
            zIndex: 10,
          }}
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          onHoverStart={() => setHovered(1)}
          onHoverEnd={() => setHovered(null)}
          whileHover={!isMobile ? { scale: 1.04, rotateZ: 1, zIndex: 30, transition: { duration: 0.3 } } : {}}
        >
          <div
            className="relative w-full h-full overflow-hidden transition-all duration-300"
            style={{
              background: '#0C0C0C',
              border: hovered === 1 ? '1px solid rgba(124,255,155,0.35)' : '1px solid rgba(255,255,255,0.10)',
              borderRadius: 8,
              boxShadow: hovered === 1
                ? '0 35px 80px rgba(0,0,0,0.9), 0 0 30px rgba(124,255,155,0.15), inset 0 1px 0 rgba(255,255,255,0.08)'
                : '0 30px 70px rgba(0,0,0,0.85), 0 10px 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.07)',
            }}
          >
            {/* tape */}
            <TapeStrip rotate={-5} top="-9px" left="50%" width="54px" />

            {/* photo wrapper */}
            <div
              className="relative"
              style={{
                margin: '12px 12px 0',
                height: cardH - 8,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 4,
                background: '#0a0a0a',
              }}
            >
              <img
                src={mypic1}
                alt="Uttam Maji — profile photo"
                className="w-full h-full object-cover block"
                style={{ filter: 'contrast(1.06) saturate(0.85) sepia(6%)', transition: 'filter 0.4s' }}
                loading="lazy"
              />
              {/* gradient overlay */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 40%, rgba(0,0,0,0.1) 100%)',
                }}
              />
              {/* animated corner tag */}
              <motion.div
                className="absolute top-2 left-2 font-mono text-[8px] text-accent/70 bg-black/50 backdrop-blur-sm border border-accent/20 px-1.5 py-0.5 rounded-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                profile.jpg
              </motion.div>
            </div>

            {/* caption */}
            <div className="px-3 pt-2.5 pb-3 text-center bg-[#0C0C0C]">
              <div className="font-handwritten text-base text-[#F0F0F0] leading-snug">
                The Developer
              </div>
              <div className="font-mono text-[8px] text-[#444] tracking-widest mt-0.5 uppercase">
                Uttam Maji
              </div>
            </div>

            {/* animated top-edge glow line */}
            <motion.div
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-px pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(124,255,155,0.5) 50%, transparent 100%)',
              }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        </motion.div>

        {/* ========================================================== */}
        {/* CARD 2 — mypic2                                             */}
        {/* ========================================================== */}
        <motion.div
          {...floatB}
          className="absolute"
          style={{
            width: cardW,
            height: cardH + 62,
            top: isMobile ? 72 : 95,
            left: isMobile ? 136 : 210,
            transformStyle: 'preserve-3d',
            transform: 'rotateY(8deg) rotateZ(-4.5deg)',
            zIndex: 20,
          }}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
          onHoverStart={() => setHovered(2)}
          onHoverEnd={() => setHovered(null)}
          whileHover={!isMobile ? { scale: 1.04, rotateZ: -2, zIndex: 30, transition: { duration: 0.3 } } : {}}
        >
          <div
            className="relative w-full h-full overflow-hidden transition-all duration-300"
            style={{
              background: '#0C0C0C',
              border: hovered === 2 ? '1px solid rgba(229,192,123,0.35)' : '1px solid rgba(255,255,255,0.10)',
              borderRadius: 8,
              boxShadow: hovered === 2
                ? '0 40px 90px rgba(0,0,0,0.95), 0 0 30px rgba(229,192,123,0.12), inset 0 1px 0 rgba(255,255,255,0.08)'
                : '0 35px 80px rgba(0,0,0,0.9), 0 12px 35px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.07)',
            }}
          >
            {/* tape */}
            <TapeStrip rotate={4} top="-9px" left="50%" width="54px" />

            {/* photo wrapper */}
            <div
              className="relative"
              style={{
                margin: '12px 12px 0',
                height: cardH - 8,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: 4,
                background: '#0a0a0a',
              }}
            >
              <img
                src={mypic2}
                alt="Uttam Maji — second photo"
                className="w-full h-full object-cover block"
                style={{ filter: 'contrast(1.08) saturate(0.82) sepia(4%)', transition: 'filter 0.4s' }}
                loading="lazy"
              />
              {/* gradient overlay */}
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 40%, rgba(0,0,0,0.1) 100%)',
                }}
              />
              {/* corner tag */}
              <motion.div
                className="absolute top-2 left-2 font-mono text-[8px] text-[#E5C07B]/70 bg-black/50 backdrop-blur-sm border border-[#E5C07B]/20 px-1.5 py-0.5 rounded-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                candid.jpg
              </motion.div>
            </div>

            {/* caption */}
            <div className="px-3 pt-2.5 pb-3 text-center bg-[#0C0C0C]">
              <div className="font-handwritten text-base text-[#F0F0F0] leading-snug">
                In The Zone
              </div>
              <div className="font-mono text-[8px] text-[#444] tracking-widest mt-0.5 uppercase">
                candid shot
              </div>
            </div>

            {/* animated top-edge glow line (amber) */}
            <motion.div
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-px pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(229,192,123,0.5) 50%, transparent 100%)',
              }}
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
            />
          </div>
        </motion.div>

        {/* ========================================================== */}
        {/* CORNER BADGE — "Uttam Maji" handwritten                     */}
        {/* ========================================================== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.75, rotate: 10 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 5 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          className="absolute"
          style={{
            bottom: isMobile ? 6 : 10,
            right: isMobile ? 0 : 4,
            zIndex: 30,
          }}
        >
          <div
            className="relative"
            style={{
              background: '#0F0F0F',
              border: '1px solid #252525',
              padding: '6px 12px 7px',
              boxShadow: '0 2px 0 rgba(255,255,255,0.03), 0 10px 24px rgba(0,0,0,0.55)',
            }}
          >
            {/* mini tape */}
            <span
              aria-hidden="true"
              style={{
                position: 'absolute', top: -7, left: '50%',
                transform: 'translateX(-50%) rotate(-3deg)',
                width: 38, height: 13,
                background: 'rgba(245,245,245,0.12)',
                border: '1px solid rgba(245,245,245,0.08)',
                backdropFilter: 'blur(4px)',
                display: 'block',
              }}
            />
            <span className="font-handwritten text-lg text-[#A3FFB0] block leading-snug whitespace-nowrap">
              Uttam Maji
            </span>
            <span className="font-mono text-[8px] text-[#555] tracking-widest block">
              // full-stack dev
            </span>
          </div>
        </motion.div>

        {/* ---- decorative scan-line overlay ---- */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px)',
            zIndex: 50,
            borderRadius: 4,
          }}
        />
      </motion.div>

      {/* ---- bottom label ---- */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-2 font-mono text-[10px] text-[#555] whitespace-nowrap pointer-events-none"
      >
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-[#7CFF9B] inline-block"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span>2 photos / real person</span>
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-[#E5C07B] inline-block"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
}

/* ================================================================== */
/*  PROFILE PHOTO SECTION                                              */
/* ================================================================== */

export default function ProfilePhoto() {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  const stageHeight = isMobile ? 'h-[550px]' : 'h-[700px]';

  return (
    <section
      id="profile"
      aria-labelledby="profile-heading"
      className="relative py-24 sm:py-32"
    >
      {/* Background layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="absolute inset-0 dotted-bg opacity-20" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[150px]" />
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 55%, rgba(156,124,92,0.28) 100%)',
          }}
        />
      </div>

      <Container>
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-sm text-accent">02</span>
          <span className="font-mono text-sm text-muted uppercase tracking-widest">
            PROFILE
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* ============ LEFT — text + stats ============ */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2"
          >
            <div className="font-mono text-xs text-muted mb-4">
              <span className="text-accent">$</span> cat profile.jpg
            </div>

            <h2
              id="profile-heading"
              className="font-bold tracking-tight mb-6"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                lineHeight: 1.15,
                color: '#F5F5F5',
              }}
            >
              The developer
              <br />
              behind the{' '}
              <span className="font-handwritten" style={{ fontWeight: 400 }}>
                <GreenUnderline>terminal</GreenUnderline>
              </span>
              .
            </h2>

            <p className="text-lg text-secondary leading-relaxed mb-8">
              I'm Uttam Maji — a full-stack developer who cares about both how
              software works and how it feels. I build across the entire MERN
              stack, from real-time backends to polished frontends.
            </p>

            <HandNote rotate={-2.5} className="mb-8">
              <span className="font-mono text-[10px] text-muted tracking-wider">
                // HELLO
              </span>{' '}
              <span className="font-handwritten text-xl text-[#A3FFB0]">
                nice to meet you
              </span>
            </HandNote>

            <div className="grid grid-cols-2 gap-3">
              {STATS.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="group relative border border-border p-4 bg-card hover:border-accent/30 transition-colors"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F5F5F5]/15 to-transparent"
                    />
                    <Icon className="w-4 h-4 text-accent mb-2" />
                    <div className="font-mono text-xs text-muted">
                      / {stat.label}
                    </div>
                    <div className="text-sm font-medium text-foreground mt-0.5">
                      {stat.value}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-6 flex items-center gap-2 font-mono text-xs text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>scroll to explore</span>
            </div>
          </motion.div>

          {/* ============ RIGHT — 3D photo stage ============ */}
          <div className="lg:col-span-3">
            <div
              className={`relative w-full ${stageHeight} flex items-end justify-center pb-12`}
            >
              <Photo3DStage
                isMobile={isMobile}
                reducedMotion={reducedMotion ?? false}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
