import { motion } from 'framer-motion';
import { ArrowDown, Pin, Paperclip } from 'lucide-react';
import Container from '../ui/Container';

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const journey = ['LEARN', 'BUILD', 'SHIP', 'IMPROVE'];

const codeLines = [
  { type: 'keyword', text: 'const' },
  { type: 'var',     text: 'developer' },
  { type: 'punct',   text: '=' },
  { type: 'punct',   text: '{' },
  { type: 'key',     text: '  name:' },
  { type: 'string',  text: '"Uttam Maji"' },
  { type: 'punct',   text: ',' },
  { type: 'key',     text: '  role:' },
  { type: 'string',  text: '"Full-Stack Developer"' },
  { type: 'punct',   text: ',' },
  { type: 'key',     text: '  stack:' },
  { type: 'punct',   text: '[' },
  { type: 'string',  text: '"React", "Node.js", "Express", "MongoDB"' },
  { type: 'punct',   text: '],' },
  { type: 'key',     text: '  mindset:' },
  { type: 'string',  text: '"Build → Learn → Ship → Improve"' },
  { type: 'punct',   text: '' },
  { type: 'punct',   text: '};' },
];

const colorMap = {
  keyword: 'text-purple-400',
  var:     'text-blue-400',
  punct:   'text-muted',
  key:     'text-cyan-400',
  string:  'text-accent',
};

/* ------------------------------------------------------------------ */
/*  HANDMADE PAPER NOTE                                                */
/* ------------------------------------------------------------------ */

function PaperNote({ children, rotate = -2, tape = 'left', className = '' }) {
  return (
    <div
      className={`relative inline-block ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {tape === 'left' && (
        <span className="absolute -top-2 -left-3 w-10 h-4 bg-[#F5F5F5]/15 rotate-[-25deg] backdrop-blur-sm border border-[#F5F5F5]/10" />
      )}
      {tape === 'right' && (
        <span className="absolute -top-2 -right-3 w-10 h-4 bg-[#F5F5F5]/15 rotate-[25deg] backdrop-blur-sm border border-[#F5F5F5]/10" />
      )}
      {tape === 'pin' && (
        <Pin className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 text-[#E5C07B]/70 rotate-12" />
      )}

      <div className="relative bg-[#0F0F0F] border border-[#252525] px-3 py-1.5 shadow-[0_2px_0_rgba(255,255,255,0.03),0_8px_20px_rgba(0,0,0,0.5)]">
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  HANDWRITTEN UNDERLINE — teal curve under the last word             */
/* ------------------------------------------------------------------ */

function UnderlinedWord({ children }) {
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
          stroke="#2DD4BF"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  ABOUT                                                              */
/* ------------------------------------------------------------------ */

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      {/* faint grid behind everything */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <Container>
        {/* ============================================================ */}
        {/* SECTION HEADING — handwritten title + teal underline         */}
        {/* ============================================================ */}
        <div className="mb-12">
          {/* index + label + divider row */}
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-sm text-accent">01</span>
            <span className="font-mono text-sm text-muted uppercase tracking-widest">
              ABOUT
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* terminal command line */}
          <div className="font-mono text-xs text-muted mb-4">
            <span className="text-accent">$</span> cat about.md
          </div>

          {/* handwritten title */}
          <h2
            className="font-handwritten"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: 1.15,
              fontWeight: 400,
              color: '#F5F5F5',
              transform: 'rotate(-1deg)',
              transformOrigin: 'left center',
            }}
          >
            A developer who thinks beyond the{' '}
            <UnderlinedWord>frontend</UnderlinedWord>.
          </h2>
        </div>

        <div className="relative grid lg:grid-cols-2 gap-12 items-start">
          {/* ======================= LEFT COLUMN ======================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg text-secondary leading-relaxed mb-6">
              I'm a Full-Stack MERN Developer focused on building modern web
              applications across frontend interfaces, backend APIs, databases
              and deployment.
            </p>
            <p className="text-lg text-secondary leading-relaxed mb-8">
              I enjoy solving practical engineering problems, designing clean
              APIs, working with databases, building real-time systems and
              turning ideas into usable products.
            </p>

            {/* ---- HANDMADE PAPER NOTES ---- */}
            <div className="relative mb-10">
              <PaperNote tape="left" rotate={-2.5} className="mb-2">
                <span className="font-mono text-[10px] text-muted tracking-wider">
                  // NOTE
                </span>{' '}
                <span className="font-handwritten text-xl text-[#F5F5F5]">
                  still curious, still shipping
                </span>
              </PaperNote>

              <PaperNote tape="right" rotate={1.5} className="ml-6">
                <span className="font-mono text-[10px] text-muted tracking-wider">
                  // CURRENTLY
                </span>{' '}
                <span className="font-handwritten text-xl text-[#A3FFB0]">
                  learning AWS &amp; DevOps
                </span>
              </PaperNote>
            </div>

            {/* ---- journey ladder ---- */}
            <div className="mb-8">
              <div className="font-mono text-xs text-muted uppercase tracking-wider mb-4">
                / developer journey
              </div>
              <div className="flex flex-col gap-0">
                {journey.map((step, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <span className="font-mono text-sm text-accent font-bold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="font-mono text-sm text-foreground tracking-wider">
                      {step}
                    </span>
                    {i < journey.length - 1 && (
                      <ArrowDown className="w-3 h-3 text-muted" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ---- status chips ---- */}
            <div className="flex flex-wrap gap-3 font-mono text-xs text-muted">
              <span className="border border-border px-3 py-1">
                MODE: FULL_STACK
              </span>
              <span className="border border-border px-3 py-1">
                STACK: MERN
              </span>
              <span className="border border-border px-3 py-1">
                ENV: DEVELOPMENT
              </span>
            </div>
          </motion.div>

          {/* ======================= RIGHT COLUMN ======================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* tape on the top corners of the code window */}
              <span className="absolute -top-2 -left-4 w-14 h-5 bg-[#F5F5F5]/15 rotate-[-20deg] backdrop-blur-sm border border-[#F5F5F5]/10 z-10" />
              <span className="absolute -top-2 -right-4 w-14 h-5 bg-[#F5F5F5]/15 rotate-[20deg] backdrop-blur-sm border border-[#F5F5F5]/10 z-10" />

              {/* code terminal window */}
              <div className="terminal-window relative">
                <div className="terminal-header">
                  <span className="terminal-dot bg-red-500/70" />
                  <span className="terminal-dot bg-yellow-500/70" />
                  <span className="terminal-dot bg-green-500/70" />
                  <span className="ml-3 font-mono text-xs text-muted">
                    developer.js
                  </span>
                </div>

                <div className="p-5 font-mono text-sm leading-relaxed overflow-x-auto">
                  {codeLines.map((line, i) => (
                    <div key={i} className="flex">
                      <span className="text-muted/50 select-none w-8 text-right mr-4">
                        {i + 1}
                      </span>
                      <span>
                        {line.text && (
                          <span className={colorMap[line.type] || 'text-foreground'}>
                            {line.text}
                          </span>
                        )}
                        {line.text === '' && <span> </span>}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* handwritten annotation */}
              <div className="absolute -bottom-4 -right-3 z-20 hidden sm:block">
                <PaperNote tape="pin" rotate={3}>
                  <span className="font-handwritten text-lg text-[#E5C07B]">
                    ← my daily tools
                  </span>
                </PaperNote>
              </div>
            </div>

            {/* ---- education + focus — paper cards ---- */}
            <div className="mt-6 grid grid-cols-2 gap-3">
              <PaperNote tape="left" rotate={-1} className="block">
                <div className="px-1 py-1">
                  <div className="font-mono text-[10px] text-muted mb-1 tracking-wider">
                    / EDUCATION
                  </div>
                  <div className="font-handwritten text-lg text-[#F5F5F5] leading-tight">
                    B.Tech in CSE
                  </div>
                  <div className="text-xs text-secondary mt-0.5">
                    Brainware University
                  </div>
                </div>
              </PaperNote>

              <PaperNote tape="right" rotate={1.2} className="block">
                <div className="px-1 py-1">
                  <div className="font-mono text-[10px] text-muted mb-1 tracking-wider">
                    / FOCUS
                  </div>
                  <div className="font-handwritten text-lg text-[#A3FFB0] leading-tight">
                    Full-Stack Eng.
                  </div>
                  <div className="text-xs text-secondary mt-0.5">
                    Real-time &amp; APIs
                  </div>
                </div>
              </PaperNote>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}