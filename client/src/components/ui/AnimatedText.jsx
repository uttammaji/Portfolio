import { motion } from 'framer-motion';

export default function AnimatedText({ text, className = '', delay = 0, once = true }) {
  const words = text.split(' ');

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            initial={{ y: '100%' }}
            whileInView={once ? { y: 0 } : undefined}
            animate={once ? undefined : { y: 0 }}
            transition={{ duration: 0.5, delay: delay + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="inline-block"
          >
            {word}
            {i < words.length - 1 && '\u00A0'}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
