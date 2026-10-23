import { motion } from 'framer-motion';
import { GitCommit } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Container from '@/components/ui/Container';
import { experience } from '@/data/experience';

export default function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32 bg-surface/30">
      <Container>
        <SectionHeading
          index="05"
          label="EXPERIENCE"
          terminal="git log --oneline"
          title="My journey so far."
        />

        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />

          {experience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1 }}
              className="relative pl-12 pb-12 last:pb-0"
            >
              <div className="absolute left-0 top-1.5 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-accent bg-background" />

              <div className="flex items-center gap-2 mb-2">
                <GitCommit className="w-3.5 h-3.5 text-muted" />
                <span className="font-mono text-sm text-accent font-bold">{exp.year}</span>
                <span className="font-mono text-xs text-muted">HEAD → main</span>
              </div>

              <div className="border border-border rounded-xl p-5 bg-card">
                <h3 className="font-bold text-lg mb-1">{exp.role}</h3>
                <div className="font-mono text-xs text-muted mb-3">{exp.company}</div>
                <p className="text-sm text-secondary leading-relaxed mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {exp.tags.map((tag) => (
                    <span key={tag} className="font-mono text-xs text-muted border border-border rounded-full px-2 py-0.5">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
