import { motion } from 'framer-motion';

export default function SectionHeading({ index, label, terminal, title, description }) {
  return (
    <div className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4 mb-6"
      >
        <span className="font-mono text-sm text-accent">{index}</span>
        <span className="font-mono text-sm text-muted uppercase tracking-widest">{label}</span>
        <div className="h-px flex-1 bg-border" />
      </motion.div>

      {terminal && (
        <div className="mb-6 font-mono text-sm text-muted">
          <span className="text-accent">$</span> {terminal}
        </div>
      )}

      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-display font-bold tracking-tight text-balance"
        >
          {title}
        </motion.h2>
      )}

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-lg text-secondary max-w-2xl leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
