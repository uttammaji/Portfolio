import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Check } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { projects } from '@/data/projects';

const sectionLabels = [
  'OVERVIEW',
  'PROBLEM',
  'SOLUTION',
  'ARCHITECTURE',
  'FEATURES',
  'ENGINEERING CHALLENGES',
  'TECHNOLOGY',
  'LINKS',
];

export default function ProjectDetails() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="pt-32 min-h-screen flex items-center justify-center">
        <Container>
          <div className="text-center">
            <div className="font-mono text-sm text-muted mb-4">404 — Project not found</div>
            <Button to="/projects" variant="secondary">← Back to projects</Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-12">
      <Container>
        <Link to="/projects" className="inline-flex items-center gap-2 font-mono text-sm text-muted hover:text-accent transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" /> cd ../projects
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="font-mono text-xs text-accent mb-2 uppercase tracking-wider">{project.category}</div>
          <h1 className="text-display font-bold mb-4">{project.name}</h1>
          <p className="text-lg text-secondary max-w-2xl leading-relaxed mb-8">{project.description}</p>

          <div className="flex flex-wrap gap-3 mb-12">
            <Button href={project.liveDemo} variant="primary" size="md" icon={ExternalLink} iconPosition="left">
              Live Demo
            </Button>
            <Button href={project.github} variant="secondary" size="md" icon={Github} iconPosition="left">
              GitHub
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`relative h-64 rounded-2xl overflow-hidden bg-gradient-to-br ${project.color} border border-border mb-16`}
        >
          <div className="absolute inset-0 grid-bg opacity-30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="font-mono text-sm text-muted">[ {project.name} preview ]</div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-16">
            <section>
              <div className="font-mono text-xs text-accent mb-2">01 / OVERVIEW</div>
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-secondary leading-relaxed">{project.description}</p>
            </section>

            <section>
              <div className="font-mono text-xs text-accent mb-2">02 / PROBLEM</div>
              <h2 className="text-2xl font-bold mb-4">The Problem</h2>
              <p className="text-secondary leading-relaxed">
                {project.tagline} The challenge was building a system that handles real-world complexity while remaining maintainable and performant.
              </p>
            </section>

            <section>
              <div className="font-mono text-xs text-accent mb-2">03 / SOLUTION</div>
              <h2 className="text-2xl font-bold mb-4">The Solution</h2>
              <p className="text-secondary leading-relaxed">
                A full-stack application built with {project.stack.slice(0, 3).join(', ')}. The architecture separates concerns cleanly — a React frontend communicates with a REST API, which manages data persistence and business logic.
              </p>
            </section>

            <section>
              <div className="font-mono text-xs text-accent mb-2">04 / ARCHITECTURE</div>
              <h2 className="text-2xl font-bold mb-4">Architecture</h2>
              <div className="border border-border rounded-xl p-6 bg-card">
                {Object.entries(project.architecture).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                    <span className="font-mono text-xs text-muted uppercase w-24 shrink-0">{key}</span>
                    <span className="text-sm text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="font-mono text-xs text-accent mb-2">05 / FEATURES</div>
              <h2 className="text-2xl font-bold mb-4">Features</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {project.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3 p-3 border border-border rounded-lg bg-card">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm text-secondary">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {project.challenges && project.challenges.length > 0 && (
              <section>
                <div className="font-mono text-xs text-accent mb-2">06 / ENGINEERING CHALLENGES</div>
                <h2 className="text-2xl font-bold mb-4">Engineering Challenges</h2>
                <div className="space-y-3">
                  {project.challenges.map((challenge, i) => (
                    <div key={i} className="border border-border rounded-xl p-5 bg-card">
                      <div className="font-mono text-xs text-muted mb-2">Challenge {String(i + 1).padStart(2, '0')}</div>
                      <p className="text-sm text-secondary leading-relaxed">{challenge}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section>
              <div className="font-mono text-xs text-accent mb-2">07 / TECHNOLOGY</div>
              <h2 className="text-2xl font-bold mb-4">Technology Stack</h2>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="font-mono text-sm text-foreground border border-border rounded-full px-3 py-1.5 bg-card">
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <div className="font-mono text-xs text-accent mb-2">08 / LINKS</div>
              <h2 className="text-2xl font-bold mb-4">Links</h2>
              <div className="flex flex-wrap gap-3">
                <Button href={project.liveDemo} variant="primary" size="md" icon={ExternalLink} iconPosition="left">
                  Live Demo
                </Button>
                <Button href={project.github} variant="secondary" size="md" icon={Github} iconPosition="left">
                  GitHub
                </Button>
              </div>
            </section>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <div className="font-mono text-xs text-muted uppercase tracking-wider mb-4">Contents</div>
              <nav className="space-y-2">
                {sectionLabels.map((label, i) => (
                  <a
                    key={label}
                    href={`#section-${i}`}
                    className="block font-mono text-xs text-muted hover:text-accent transition-colors"
                  >
                    {String(i + 1).padStart(2, '0')} — {label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
