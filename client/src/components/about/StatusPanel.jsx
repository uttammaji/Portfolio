import { motion } from 'framer-motion';
import { Activity, Cpu, Database, Terminal, Zap, Cloud } from 'lucide-react';
import Container from '@/components/ui/Container';

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const stackItems = [
  { label: 'FRONTEND',       value: 'React',               icon: Cpu      },
  { label: 'BACKEND',        value: 'Node.js / Express',   icon: Terminal },
  { label: 'DATABASE',       value: 'MongoDB / PostgreSQL', icon: Database },
  { label: 'REAL-TIME',      value: 'Socket.IO / Redis',   icon: Zap      },
  { label: 'INFRASTRUCTURE', value: 'Docker / AWS',        icon: Cloud    },
];

const snapshotItems = [
  { num: '01', label: 'FULL-STACK',      detail: 'end-to-end ownership' },
  { num: '02', label: 'REAL-TIME',       detail: 'websockets & events'  },
  { num: '03', label: 'API ENGINEERING', detail: 'REST & clean contracts' },
  { num: '04', label: 'DATABASES',       detail: 'SQL · NoSQL · caching' },
  { num: '05', label: 'CLOUD / DEVOPS',  detail: 'containers & pipelines' },
];

/* ------------------------------------------------------------------ */
/*  STATUS PANEL                                                       */
/* ------------------------------------------------------------------ */

export default function StatusPanel() {
  return (
    <Container>
      <div className="grid lg:grid-cols-2 gap-8">
        {/* ============ LEFT — CURRENT STACK ============ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="relative border border-border bg-card overflow-hidden"
        >
          {/* top-edge highlight */}
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F5F5F5]/15 to-transparent"
          />

          {/* header strip */}
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-accent" />
              <span className="font-mono text-xs text-muted uppercase tracking-widest">
                / current-stack
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span>ONLINE</span>
            </div>
          </div>

          {/* body */}
          <div className="p-5">
            <div className="space-y-3">
              {stackItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.35 }}
                    className="group flex items-center gap-4 py-2 border-b border-border/60 last:border-b-0"
                  >
                    {/* index */}
                    <span className="font-mono text-[10px] text-muted/70 w-6 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    {/* icon */}
                    <Icon className="w-4 h-4 text-muted group-hover:text-accent transition-colors shrink-0" />

                    {/* label */}
                    <span className="font-mono text-xs text-muted w-32 shrink-0 tracking-wider">
                      {item.label}
                    </span>

                    {/* dots */}
                    <span
                      aria-hidden="true"
                      className="flex-1 border-b border-dashed border-border/70 translate-y-[-2px]"
                    />

                    {/* value */}
                    <span className="text-sm text-foreground font-medium text-right">
                      {item.value}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ============ RIGHT — DEVELOPER SNAPSHOT ============ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative border border-border bg-card overflow-hidden"
        >
          {/* top-edge highlight */}
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F5F5F5]/15 to-transparent"
          />

          {/* header strip */}
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-accent" />
              <span className="font-mono text-xs text-muted uppercase tracking-widest">
                / developer-snapshot
              </span>
            </div>
            <span className="font-mono text-[10px] text-muted">
              v.2026
            </span>
          </div>

          {/* body */}
          <div className="p-5">
            <div className="grid grid-cols-1 gap-2">
              {snapshotItems.map((item, i) => (
                <motion.div
                  key={item.num}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.35 }}
                  className="group flex items-center gap-4 px-3 py-3 border border-border/60 hover:border-accent/40 hover:bg-[#0B0B0B] transition-colors"
                >
                  {/* number */}
                  <span className="font-mono text-2xl font-bold text-muted/50 group-hover:text-accent transition-colors w-10 text-right tabular-nums">
                    {item.num}
                  </span>

                  {/* divider */}
                  <span
                    aria-hidden="true"
                    className="w-px h-8 bg-border group-hover:bg-accent/30 transition-colors"
                  />

                  {/* text block */}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-foreground font-medium tracking-wide">
                      {item.label}
                    </div>
                    <div className="font-mono text-[10px] text-muted mt-0.5">
                      {item.detail}
                    </div>
                  </div>

                  {/* right arrow that appears on hover */}
                  <span
                    aria-hidden="true"
                    className="font-mono text-xs text-muted/40 group-hover:text-accent group-hover:translate-x-0.5 transition-all"
                  >
                    →
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </Container>
  );
}