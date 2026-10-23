import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import { buildLog } from '@/data/buildLog';

export default function BuildLog() {
  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5 }}
        className="terminal-window"
      >
        <div className="terminal-header">
          <span className="terminal-dot bg-red-500/70" />
          <span className="terminal-dot bg-yellow-500/70" />
          <span className="terminal-dot bg-green-500/70" />
          <span className="ml-3 font-mono text-xs text-muted">build.log</span>
        </div>
        <div className="p-5 font-mono text-sm">
          <div className="text-secondary mb-4">
            <span className="text-accent">$</span> cat build.log
          </div>
          <div className="space-y-2">
            {buildLog.map((entry, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex items-start gap-3"
              >
                <span className="text-muted">[{entry.date}]</span>
                <span className="text-secondary">{entry.message}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </Container>
  );
}
