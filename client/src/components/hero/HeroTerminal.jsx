import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/* ------------------------------------------------------------------ */
/*  TERMINAL DATA                                                      */
/* ------------------------------------------------------------------ */

const lines = [
  { command: 'whoami',         output: 'uttam-maji' },
  { command: 'role',           output: 'Full-Stack MERN Developer' },
  { command: 'stack --primary', output: 'React · Node · Express · MongoDB' },
  { command: 'status',         output: '● open-to-opportunities' },
  { command: 'location',       output: 'India' },
];

const TYPE_SPEED_MS  = 45;   // per character
const COMMAND_PAUSE  = 550;  // ms before output starts
const LINE_PAUSE     = 550;  // ms after output finishes

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

export default function HeroTerminal() {
  const prefersReducedMotion = useReducedMotion();

  const [visibleLines, setVisibleLines] = useState(0);
  const [typedOutput, setTypedOutput] = useState('');
  const [phase, setPhase] = useState('command'); // 'command' | 'output' | 'done'
  const containerRef = useRef(null);

  /* ---------------- boot sequence driver ---------------- */
  useEffect(() => {
    if (visibleLines >= lines.length) {
      setPhase('done');
      return;
    }

    const current = lines[visibleLines];

    /* Reduced motion → jump straight to the end */
    if (prefersReducedMotion) {
      setTypedOutput(current.output);
      const t = setTimeout(() => {
        setVisibleLines((v) => v + 1);
        setTypedOutput('');
      }, 300);
      return () => clearTimeout(t);
    }

    /* PHASE 1 — brief pause after the command is printed */
    if (phase === 'command') {
      setTypedOutput('');
      const t = setTimeout(() => setPhase('output'), COMMAND_PAUSE);
      return () => clearTimeout(t);
    }

    /* PHASE 2 — type the output character by character */
    if (phase === 'output') {
      let i = 0;
      const interval = setInterval(() => {
        i += 1;
        setTypedOutput(current.output.slice(0, i));

        if (i >= current.output.length) {
          clearInterval(interval);
          // Move to the next line after a short pause
          const t = setTimeout(() => {
            setVisibleLines((v) => v + 1);
            setPhase('command');
          }, LINE_PAUSE);
          // NOTE: this cleanup will be lost on unmount, but the interval
          // is already cleared and the timeout is short — acceptable.
        }
      }, TYPE_SPEED_MS);

      return () => clearInterval(interval);
    }
  }, [visibleLines, phase, prefersReducedMotion]);

  /* ---------------- auto-scroll to newest line ---------------- */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [visibleLines, typedOutput]);

  /* ---------------- derived state ---------------- */
  const isTyping   = visibleLines < lines.length && phase === 'output';
  const isDone     = visibleLines >= lines.length;
  const currentCmd = visibleLines < lines.length ? lines[visibleLines].command : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="terminal-window"
    >
      {/* Header */}
      <div className="terminal-header">
        <span className="terminal-dot bg-red-500/70" />
        <span className="terminal-dot bg-yellow-500/70" />
        <span className="terminal-dot bg-green-500/70" />
        <span className="ml-3 font-mono text-xs text-muted">uttam@portfolio</span>
      </div>

      {/* Body */}
      <div
        ref={containerRef}
        role="log"
        aria-live="polite"
        aria-label="Interactive terminal output"
        className="p-5 font-mono text-sm h-[280px] overflow-y-auto scroll-smooth"
      >
        {/* Completed lines */}
        {lines.slice(0, visibleLines).map((line) => (
          <div key={line.command} className="mb-3">
            <div className="text-secondary">
              <span className="text-accent">$</span> {line.command}
            </div>
            <div className="text-foreground mt-1">{line.output}</div>
          </div>
        ))}

        {/* Current line — command printed, waiting for output */}
        {visibleLines < lines.length && phase === 'command' && currentCmd && (
          <div className="mb-3">
            <div className="text-secondary">
              <span className="text-accent">$</span> {currentCmd}
              <Cursor />
            </div>
          </div>
        )}

        {/* Current line — output typing */}
        {visibleLines < lines.length && phase === 'output' && currentCmd && (
          <div className="mb-3">
            <div className="text-secondary">
              <span className="text-accent">$</span> {currentCmd}
            </div>
            <div className="text-foreground mt-1">
              {typedOutput}
              <Cursor />
            </div>
          </div>
        )}

        {/* Idle cursor when done */}
        {isDone && (
          <div className="text-secondary">
            <span className="text-accent">$</span> <Cursor />
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  CURSOR — small reusable atom                                       */
/* ------------------------------------------------------------------ */

function Cursor() {
  return (
    <span
      aria-hidden="true"
      className="inline-block w-2 h-4 bg-foreground align-middle ml-1 animate-blink"
    />
  );
}