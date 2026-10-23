import { motion } from 'framer-motion';
import { Boxes, Zap, ShieldCheck, Eye, GitBranch } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Container from '@/components/ui/Container';

const principles = [
  {
    icon: Boxes,
    title: 'Architecture',
    description: 'Build systems that are easy to extend. Structure code so new features slot in without rewriting existing logic.',
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Optimize where it matters. Measure first, then improve the bottlenecks that actually affect users.',
  },
  {
    icon: ShieldCheck,
    title: 'Security',
    description: 'Treat validation, authentication and authorization as first-class concerns, not afterthoughts.',
  },
  {
    icon: Eye,
    title: 'UX',
    description: 'Good engineering should create a good user experience. Fast, responsive, and intuitive by default.',
  },
  {
    icon: GitBranch,
    title: 'Maintainability',
    description: 'Write code another developer can understand. Clear naming, consistent patterns, sensible structure.',
  },
];

export default function EngineeringPrinciples() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHeading
          index="04"
          label="ENGINEERING"
          terminal="cat engineering.md"
          title="Principles I build by."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {principles.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.08 }}
                className="border border-border rounded-xl p-6 bg-card hover:border-accent/20 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg border border-border flex items-center justify-center mb-4 group-hover:border-accent/40 transition-colors">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-bold mb-2">{p.title}</h3>
                <p className="text-sm text-secondary leading-relaxed">{p.description}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
