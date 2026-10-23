import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layout, Server, Database, Radio, Cloud, Wrench } from 'lucide-react';
import Container from '@/components/ui/Container';
import { skillCategories } from '@/data/skills';

const iconMap = { Layout, Server, Database, Radio, Cloud, Wrench };

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
/*  STACK                                                              */
/* ================================================================== */

export default function Stack() {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const current = skillCategories.find((c) => c.id === activeCategory);

  return (
    <section id="stack" className="relative py-24 sm:py-32">
      {/* faint grid */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <Container>
        {/* ============================================================ */}
        {/* HEADING — normal + handwritten "build" with green underline    */}
        {/* ============================================================ */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-sm text-accent">02</span>
            <span className="font-mono text-sm text-muted uppercase tracking-widest">
              STACK
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="font-mono text-xs text-muted mb-4">
            <span className="text-accent">$</span> npm list --depth=0
          </div>

          <h2
            className="font-bold tracking-tight"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: 1.15,
              color: '#F5F5F5',
            }}
          >
            Technology I{' '}
            <span className="font-handwritten" style={{ fontWeight: 400 }}>
              <GreenUnderline>build</GreenUnderline>
            </span>{' '}
            with.
          </h2>

          <p className="mt-4 text-base text-secondary leading-relaxed max-w-2xl">
            A focused toolkit for building full-stack applications — from
            frontend interfaces to real-time backends and cloud deployment.
          </p>
        </div>

        {/* ============================================================ */}
        {/* CATEGORY TABS + SKILLS                                        */}
        {/* ============================================================ */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* category list */}
          <div className="lg:col-span-1 flex flex-wrap lg:flex-col gap-2">
            {skillCategories.map((cat) => {
              const Icon = iconMap[cat.icon] || Layout;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-3 px-4 py-3 border transition-all text-left ${
                    isActive
                      ? 'border-accent/40 bg-accent/5 text-accent'
                      : 'border-border bg-card text-secondary hover:text-foreground hover:border-border'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="font-mono text-sm font-medium">
                    {cat.label}
                  </span>
                  <span className="ml-auto font-mono text-xs text-muted">
                    {cat.skills.length}
                  </span>
                </button>
              );
            })}
          </div>

          {/* skills grid */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid sm:grid-cols-2 gap-3"
              >
                {current?.skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className="relative border border-border p-5 bg-card hover:border-accent/30 transition-all group cursor-default"
                  >
                    {/* top edge highlight */}
                    <span
                      aria-hidden="true"
                      className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F5F5F5]/15 to-transparent"
                    />

                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                        {skill.name}
                      </h4>
                      <span className="font-mono text-xs text-muted">
                        {skill.use}
                      </span>
                    </div>

                    <p className="text-sm text-secondary leading-relaxed mb-3">
                      {skill.description}
                    </p>

                    <AnimatePresence>
                      {hoveredSkill === skill.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="font-mono text-xs text-muted mb-1">
                            Used in:
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {skill.projects.map((p) => (
                              <span
                                key={p}
                                className="font-mono text-xs text-accent/80 border border-accent/20 px-2 py-0.5"
                              >
                                {p}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </section>
  );
}