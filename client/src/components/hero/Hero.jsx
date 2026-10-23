import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download } from 'lucide-react';
import Button from '@/components/ui/Button';
import HeroTerminal from '@/components/hero/HeroTerminal';

/* ------------------------------------------------------------------ */
/*  BOOT SEQUENCE                                                      */
/* ------------------------------------------------------------------ */

const bootLines = [
  { text: '$ ssh uttam@portfolio',                   type: 'cmd'    },
  { text: '> Authenticating...',                     type: 'muted'  },
  { text: '> Initializing portfolio...',             type: 'muted'  },
  { text: '> Loading developer profile...',          type: 'muted'  },
  { text: '> Loading projects...',                   type: 'muted'  },
  { text: '> Loading experience...',                 type: 'muted'  },
  { text: '> Connecting systems...',                 type: 'muted'  },
  { text: '> All systems online.',                   type: 'accent' },
];

/* ------------------------------------------------------------------ */
/*  MARQUEE                                                            */
/* ------------------------------------------------------------------ */

const marqueeItems = [
  'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'PostgreSQL',
  'Next.js', 'TypeScript', 'Tailwind CSS', 'REST APIs', 'Socket.IO',
  'Redis', 'Git', 'Docker', 'AWS', 'Linux',
];

function TechMarquee() {
  return (
    <div className="relative overflow-hidden border-y border-border bg-surface/50 py-3">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...marqueeItems, ...marqueeItems].map((item, i) => (
          <span key={i} className="flex items-center gap-3 mx-4 font-mono text-sm text-muted">
            <span className="w-1 h-1 rounded-full bg-accent/40" />
            {item}
          </span>
        ))}
      </div>
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FLOATING CODE TAGS                                                 */
/* ------------------------------------------------------------------ */

const floatingTags = [
  { label: '{ React }',      top: '8%',  left: '4%',   delay: 0.8 },
  { label: 'npm install',    top: '18%', right: '6%',  delay: 1.0 },
  { label: 'async/await',    top: '55%', left: '2%',   delay: 1.2 },
  { label: 'git push',       bottom: '12%', right: '4%', delay: 0.9 },
  { label: 'const dev = {}', bottom: '20%', left: '6%', delay: 1.1 },
];

/* ------------------------------------------------------------------ */
/*  HANDWRITTEN GREEN WORD + YELLOW UNDERLINE                          */
/* ------------------------------------------------------------------ */

function WorkWord({ children }) {
  return (
    <span className="relative inline-block">
      {/* handwritten word */}
      <span
        className="font-handwritten"
        style={{
          fontWeight: 400,
          color: '#7CFF9B',         /* green */
          fontSize: '1.05em',
        }}
      >
        {children}
      </span>

      {/* yellow curved underline */}
      <svg
        aria-hidden="true"
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        className="absolute left-0 right-0 -bottom-1 w-full h-3 pointer-events-none"
      >
        <path
          d="M2 8 C 40 3, 90 3, 130 6 S 180 9, 198 5"
          fill="none"
          stroke="#E5C07B"          /* yellow */
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  TERMINAL GATE — full screen "enter" screen                        */
/* ------------------------------------------------------------------ */

function TerminalGate({ onEnter, onSkip }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [ready, setReady] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [shake, setShake] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (visibleLines >= bootLines.length) {
      const t = setTimeout(() => setReady(true), 300);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setVisibleLines((n) => n + 1), 320);
    return () => clearTimeout(t);
  }, [visibleLines]);

  useEffect(() => {
    if (ready) inputRef.current?.focus();
  }, [ready]);

  const handleSubmit = useCallback(() => {
    const v = inputValue.trim().toLowerCase();
    if (v === '' || v === 'enter' || v === 'y' || v === 'yes' || v === 'go' || v === 'start') {
      onEnter();
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      setInputValue('');
    }
  }, [inputValue, onEnter]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onSkip();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') onSkip();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onSkip]);

  return (
    <motion.div
      key="gate"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[999] bg-[#050505] flex items-center justify-center px-6"
    >
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="absolute inset-0 terminal-scanline pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl border border-border bg-[#0B0B0B]/80 backdrop-blur-sm"
        style={{ boxShadow: '0 0 80px rgba(163,255,176,0.05)' }}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          </div>
          <span className="font-mono text-[11px] text-muted tracking-wider">
            uttam@portfolio: ~
          </span>
          <button
            onClick={onSkip}
            className="font-mono text-[11px] text-muted hover:text-accent transition-colors"
            aria-label="Skip intro"
          >
            [skip]
          </button>
        </div>

        <div className="p-6 font-mono text-sm leading-relaxed min-h-[340px]">
          <div className="space-y-1.5">
            {bootLines.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={
                  line.type === 'accent'
                    ? 'text-[#A3FFB0]'
                    : line.type === 'cmd'
                    ? 'text-[#F5F5F5]'
                    : 'text-[#A1A1A1]'
                }
              >
                {line.text}
              </motion.div>
            ))}

            {visibleLines < bootLines.length && (
              <span className="inline-block w-2 h-4 bg-[#A3FFB0] animate-blink align-middle" />
            )}
          </div>

          <AnimatePresence>
            {ready && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6"
              >
                <div className="text-[#666666] mb-2">
                  # type <span className="text-[#A3FFB0]">enter</span> to access portfolio
                </div>
                <motion.div
                  animate={shake ? { x: [0, -6, 6, -4, 4, 0] } : {}}
                  transition={{ duration: 0.35 }}
                  className="flex items-center gap-2 border border-border bg-[#101010] px-3 py-2"
                >
                  <span className="text-[#A3FFB0]">uttam@portfolio:~$</span>
                  <input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                    spellCheck={false}
                    autoComplete="off"
                    className="flex-1 bg-transparent border-none outline-none text-[#F5F5F5] font-mono text-sm placeholder:text-[#666666]"
                    placeholder="enter"
                    aria-label="Type enter to access portfolio"
                  />
                  <span className="w-2 h-4 bg-[#A3FFB0] animate-blink" />
                </motion.div>

                <div className="mt-4 flex items-center gap-4 text-[11px] text-[#666666]">
                  <button
                    onClick={handleSubmit}
                    className="text-[#A3FFB0] hover:underline"
                  >
                    [↵ execute]
                  </button>
                  <button
                    onClick={onSkip}
                    className="hover:text-[#A1A1A1] transition-colors"
                  >
                    [skip intro]
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO                                                               */
/* ------------------------------------------------------------------ */

export default function Hero() {
  const [entered, setEntered] = useState(false);
  const [bootDone, setBootDone] = useState(false);
  const [bootIndex, setBootIndex] = useState(0);
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const seen = sessionStorage.getItem('portfolio.entered');
    if (seen === 'true') {
      setEntered(true);
      setBootDone(true);
    }
  }, []);

  const handleEnter = () => {
    sessionStorage.setItem('portfolio.entered', 'true');
    setEntered(true);
  };
  const handleSkip = () => {
    sessionStorage.setItem('portfolio.entered', 'true');
    setEntered(true);
    setBootDone(true);
  };

  useEffect(() => {
    if (!entered) return;
    if (bootIndex >= bootLines.length) {
      const t = setTimeout(() => setBootDone(true), 250);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setBootIndex((i) => i + 1), 220);
    return () => clearTimeout(t);
  }, [entered, bootIndex]);

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <>
      <AnimatePresence>
        {!entered && (
          <TerminalGate onEnter={handleEnter} onSkip={handleSkip} />
        )}
      </AnimatePresence>

      <section
        ref={heroRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-screen flex flex-col justify-center pt-24 pb-12 overflow-hidden"
      >
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-0 noise-bg" />
        <div
          className="absolute inset-0 spotlight"
          style={{ '--mouse-x': `${mousePos.x}%`, '--mouse-y': `${mousePos.y}%` }}
        />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />

        {bootDone &&
          floatingTags.map((tag, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: tag.delay, duration: 0.5 }}
              className="absolute hidden lg:block font-mono text-xs text-muted/40 border border-border/50 px-2.5 py-1 bg-card/30 backdrop-blur-sm pointer-events-none"
              style={{ top: tag.top, left: tag.left, right: tag.right, bottom: tag.bottom }}
            >
              <motion.span
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: tag.delay, ease: 'easeInOut' }}
                className="block"
              >
                {tag.label}
              </motion.span>
            </motion.div>
          ))}

        <div className="relative mx-auto px-6 sm:px-8 max-w-7xl w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div>
              <AnimatePresence mode="wait">
                {!bootDone ? (
                  <motion.div
                    key="boot"
                    exit={{ opacity: 0, y: -10 }}
                    className="font-mono text-sm space-y-1.5 mb-8"
                  >
                    <div className="text-muted mb-4">01 / SYSTEM INITIALIZATION</div>
                    {bootLines.slice(0, bootIndex).map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={i === bootLines.length - 1 ? 'text-accent' : 'text-muted'}
                      >
                        {line.text}
                      </motion.div>
                    ))}
                    {bootIndex < bootLines.length && (
                      <span className="inline-block w-2 h-4 bg-accent animate-blink align-middle" />
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="font-mono text-xs text-accent mb-4 tracking-widest uppercase"
                    >
                      Full-Stack MERN Developer
                    </motion.div>

                    {/* ============================================== */}
                    {/* HEADLINE — normal font + handwritten "work"    */}
                    {/* ============================================== */}
                    <h1
                      className="font-bold tracking-tight mb-6"
                      style={{
                        fontSize: 'clamp(2.25rem, 6vw, 4.5rem)',
                        lineHeight: 1.05,
                        color: '#F5F5F5',
                      }}
                    >
                      <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="block"
                      >
                        I build digital
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="block"
                      >
                        products that feel
                      </motion.span>
                      <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="block"
                      >
                        as good as they <WorkWord>work</WorkWord>.
                      </motion.span>
                    </h1>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-lg text-secondary max-w-md leading-relaxed mb-8"
                    >
                      Full-stack developer focused on building scalable, performant and
                      thoughtfully designed web applications.
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="flex flex-wrap items-center gap-3 mb-8"
                    >
                      <Button to="/projects" variant="primary" size="md">
                        ./view-work
                      </Button>
                      <Button to="/contact" variant="secondary" size="md">
                        ./contact-me
                      </Button>
                      {/* ── Download CV button ── */}
                      <motion.a
                        href="/UttamMaji_CV.docx"
                        download="UttamMaji_CV.docx"
                        whileHover={{ scale: 1.04, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        className="inline-flex items-center gap-2 border border-border bg-card/80 hover:border-accent/50 hover:bg-card text-foreground font-mono text-sm px-4 py-2 transition-colors group"
                      >
                        <Download className="w-3.5 h-3.5 text-accent group-hover:animate-bounce" />
                        ./download-cv
                      </motion.a>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="flex flex-wrap items-center gap-6 font-mono text-xs text-muted"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        <span>AVAILABLE FOR OPPORTUNITIES</span>
                      </div>
                      <div>INDIA</div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: bootDone ? 1 : 0, x: bootDone ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <HeroTerminal />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: bootDone ? 1 : 0 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="font-mono text-xs text-muted">↓ scroll to explore</span>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <TechMarquee />
        </div>
      </section>
    </>
  );
}