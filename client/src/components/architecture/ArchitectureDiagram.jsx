import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';

/* ================================================================== */
/*  DATA                                                               */
/* ================================================================== */

const nodes = [
  { id: 'client',   label: 'CLIENT',     sub: 'React / Next',        x: '50%', y: '0%'  },
  { id: 'api',      label: 'API LAYER',  sub: 'Node / Express',      x: '50%', y: '33%' },
  { id: 'mongo',    label: 'MongoDB',    sub: 'Document Store',      x: '15%', y: '70%' },
  { id: 'redis',    label: 'Redis',      sub: 'Cache / Pub-Sub',     x: '50%', y: '70%' },
  { id: 'postgres', label: 'PostgreSQL', sub: 'Relational',          x: '85%', y: '70%' },
];

const connections = [
  { from: 'client', to: 'api' },
  { from: 'api',    to: 'mongo' },
  { from: 'api',    to: 'redis' },
  { from: 'api',    to: 'postgres' },
];

/* ================================================================== */
/*  HANDWRITTEN GREEN UNDERLINE                                        */
/* ================================================================== */

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
/*  SECTION                                                            */
/* ================================================================== */

export default function ArchitectureDiagram() {
  return (
    <section id="architecture" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <Container>
        {/* ============================================================ */}
        {/* HEADING — normal + handwritten "design" with green underline  */}
        {/* ============================================================ */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-sm text-accent">04</span>
            <span className="font-mono text-sm text-muted uppercase tracking-widest">
              ARCHITECTURE
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="font-mono text-xs text-muted mb-4">
            <span className="text-accent">$</span> cat architecture.md
          </div>

          <h2
            className="font-bold tracking-tight"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: 1.15,
              color: '#F5F5F5',
            }}
          >
            Systems I{' '}
            <span className="font-handwritten" style={{ fontWeight: 400 }}>
              <GreenUnderline>design</GreenUnderline>
            </span>
            .
          </h2>

          <p className="mt-4 text-base text-secondary leading-relaxed max-w-2xl">
            A typical full-stack architecture — client, API layer, and data
            stores working together with real-time communication.
          </p>
        </div>

        {/* ============================================================ */}
        {/* DIAGRAM                                                      */}
        {/* ============================================================ */}
        <div className="relative max-w-3xl mx-auto h-[420px] flex items-center justify-center">
          <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

          {connections.map((conn, i) => {
            const from = nodes.find((n) => n.id === conn.from);
            const to = nodes.find((n) => n.id === conn.to);
            return (
              <svg
                key={i}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ zIndex: 1 }}
              >
                <motion.line
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.15 }}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="rgb(var(--color-border))"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <motion.circle
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: [0, 1, 0] }}
                  viewport={{ once: false }}
                  transition={{
                    duration: 2,
                    delay: 0.5 + i * 0.15,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                  r="3"
                  fill="rgb(var(--color-accent))"
                >
                  <animateMotion
                    dur="2s"
                    repeatCount="indefinite"
                    path={`M ${parseFloat(from.x) * 6},${parseFloat(from.y) * 4.2} L ${parseFloat(to.x) * 6},${parseFloat(to.y) * 4.2}`}
                  />
                </motion.circle>
              </svg>
            );
          })}

          {nodes.map((node, i) => (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="absolute border border-border bg-card px-5 py-3 text-center"
              style={{
                left: node.x,
                top: node.y,
                transform: 'translate(-50%, -50%)',
                zIndex: 2,
              }}
            >
              <div className="font-mono text-xs font-bold text-foreground">
                {node.label}
              </div>
              <div className="font-mono text-[10px] text-muted mt-0.5">
                {node.sub}
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}