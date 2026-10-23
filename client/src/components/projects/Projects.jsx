import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  ExternalLink,
  ArrowUpRight,
  ChevronRight,
  Terminal,
  GitBranch,
  Star,
  GitFork,
  Globe,
  Eye,
} from 'lucide-react';
import Container from '@/components/ui/Container';

/* ================================================================== */
/*  FEATURED PROJECTS — curated, real, no API                          */
/* ================================================================== */

const PROJECTS = [
  {
    slug: 'freelancer-marketplace',
    name: 'Freelancer-Marketplace',
    category: 'Marketplace',
    description:
      'A full-stack freelance marketplace where clients post jobs and freelancers bid — with authentication, proposals, and project tracking.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    structure: ['client/', 'server/', 'middleware/', 'README.md'],
    github: 'https://github.com/uttammaji/Freelancer-Marketplace',
    demo: null,
    stars: 2,
    forks: 0,
    language: 'JavaScript',
  },
  {
    slug: 'gym',
    name: 'Gym',
    category: 'Fitness / Full-Stack',
    description:
      'A gym management platform with membership plans, workout tracking, and a clean React + Express dashboard.',
    stack: ['React', 'Express', 'Node.js', 'MongoDB'],
    structure: ['src/', 'api/', 'public/', 'README.md'],
    github: 'https://github.com/uttammaji/Gym',
    demo: null,
    stars: 0,
    forks: 0,
    language: 'JavaScript',
  },
  {
    slug: 'ai-code-review',
    name: 'ai-code-review',
    category: 'AI / Dev Tools',
    description:
      'AI-powered code review platform that analyses pull requests, suggests improvements, and flags potential bugs.',
    stack: ['React', 'Node.js', 'OpenAI', 'MongoDB'],
    structure: ['client/', 'server/', 'ai/', 'README.md'],
    github: 'https://github.com/uttammaji/ai-code-review',
    demo: 'https://ai-code-review-u.vercel.app/',
    stars: 0,
    forks: 0,
    language: 'JavaScript',
  },
  {
    slug: 'event-booking-system',
    name: 'event-booking-system',
    category: 'Full-Stack',
    description:
      'Event booking platform with seat selection, booking confirmation, and admin tools for managing events and attendees.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    structure: ['client/', 'server/', 'models/', 'README.md'],
    github: 'https://github.com/uttammaji/event-booking-system',
    demo: null,
    stars: 0,
    forks: 0,
    language: 'JavaScript',
  },
];

/* ================================================================== */
/*  LANGUAGE COLORS                                                    */
/* ================================================================== */

const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
};

/* ================================================================== */
/*  MAC-STYLE GREEN FOLDER ICON                                        */
/* ================================================================== */

function MacFolderIcon({ open = false, size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0"
    >
      <defs>
        <linearGradient id="macFolderBack" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4CB52B" />
          <stop offset="100%" stopColor="#3F9E22" />
        </linearGradient>
        <linearGradient id="macFolderFront" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7EE06A" />
          <stop offset="35%" stopColor="#6AD24E" />
          <stop offset="70%" stopColor="#5CC63D" />
          <stop offset="100%" stopColor="#4CB52B" />
        </linearGradient>
        <linearGradient id="macFolderGloss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>

      <path
        d="M6 10 Q 6 4, 14 4 L 34 4 Q 40 4, 44 10 L 48 16 L 88 16 Q 96 16, 96 24 L 96 68 Q 96 76, 88 76 L 12 76 Q 4 76, 4 68 L 4 18 Z"
        fill="url(#macFolderBack)"
      />
      <path
        d="M6 24 Q 6 20, 10 20 L 90 20 Q 96 20, 96 26 L 96 68 Q 96 76, 88 76 L 12 76 Q 4 76, 4 68 Z"
        fill="url(#macFolderFront)"
      />
      <path
        d="M6 24 Q 6 20, 10 20 L 90 20 Q 96 20, 96 26 L 96 48 Q 50 52, 4 48 Z"
        fill="url(#macFolderGloss)"
        opacity="0.7"
      />
      <path
        d="M6 21 Q 6 20.5, 10 20.5 L 90 20.5 Q 95 20.5, 95.5 21"
        stroke="rgba(255,255,255,0.55)"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
      />
      <rect x="10" y="66" width="80" height="2" rx="1" fill="rgba(0,0,0,0.15)" />

      {open && (
        <g>
          <rect x="18" y="8" width="64" height="14" rx="1.5" fill="#F5F5F5" opacity="0.9" />
          <rect x="22" y="11" width="30" height="2" rx="1" fill="#A1A1A1" opacity="0.5" />
          <rect x="22" y="15" width="44" height="2" rx="1" fill="#A1A1A1" opacity="0.35" />
        </g>
      )}
    </svg>
  );
}

/* ================================================================== */
/*  YELLOW HANDWRITTEN UNDERLINE                                       */
/* ================================================================== */

function YellowUnderline({ children }) {
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
          stroke="#E5C07B"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/* ================================================================== */
/*  TERMINAL CHROME                                                    */
/* ================================================================== */

function TerminalChrome({ title }) {
  return (
    <div className="terminal-header">
      <span className="terminal-dot bg-red-500/70" />
      <span className="terminal-dot bg-yellow-500/70" />
      <span className="terminal-dot bg-green-500/70" />
      <span className="ml-3 font-mono text-xs text-muted">{title}</span>
    </div>
  );
}

/* ================================================================== */
/*  PREVIEW PANEL — live iframe or stylish 404                         */
/* ================================================================== */

function PreviewFrame({ url, name }) {
  const [status, setStatus] = useState(url ? 'loading' : 'missing');

  /* No live URL — stylish 404 */
  if (!url) {
    return (
      <div className="relative border border-border bg-[#0B0B0B] overflow-hidden">
        <div className="relative aspect-[16/9] flex items-center justify-center">
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

          <div className="relative text-center px-6">
            <div
              className="font-handwritten text-7xl sm:text-8xl leading-none mb-3"
              style={{
                color: 'transparent',
                WebkitTextStroke: '1.5px #A78BFA',
                transform: 'rotate(-2deg)',
              }}
            >
              404
            </div>
            <div className="font-mono text-[10px] text-[#A78BFA]/70 tracking-widest uppercase mb-3">
              // preview not available
            </div>
            <p className="text-xs text-secondary max-w-xs mx-auto leading-relaxed">
              No live URL for{' '}
              <span className="text-foreground font-mono">{name}</span>. Open
              the repo to explore the code.
            </p>
          </div>

          <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-[#A78BFA]/40" />
          <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-[#A78BFA]/40" />
          <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-[#A78BFA]/40" />
          <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-[#A78BFA]/40" />
        </div>
      </div>
    );
  }

  /* Has a live URL — iframe */
  return (
    <div className="relative border border-border bg-[#0B0B0B] overflow-hidden">
      <div className="flex items-center gap-3 px-3 py-2 border-b border-border bg-[#0F0F0F]">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-red-500/70" />
          <span className="w-2 h-2 rounded-full bg-yellow-500/70" />
          <span className="w-2 h-2 rounded-full bg-green-500/70" />
        </div>
        <div className="flex-1 min-w-0 flex items-center gap-2">
          <Globe className="w-3 h-3 text-muted shrink-0" />
          <span className="font-mono text-[10px] text-muted truncate">
            {url.replace(/^https?:\/\//, '')}
          </span>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[10px] text-accent hover:underline shrink-0"
        >
          open ↗
        </a>
      </div>

      <div className="relative aspect-[16/9] bg-[#0a0a0a]">
        {status === 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center gap-2 font-mono text-xs text-muted">
            loading preview…
          </div>
        )}

        {status === 'blocked' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <Eye className="w-5 h-5 text-[#E5C07B]" />
            <div className="font-mono text-[10px] text-[#E5C07B] tracking-widest uppercase">
              // preview blocked
            </div>
            <p className="text-xs text-secondary max-w-sm">
              This site doesn&apos;t allow being embedded. Open it in a new tab.
            </p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border px-3 py-1.5 font-mono text-[11px] text-foreground hover:border-accent hover:text-accent transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
              Open live site
            </a>
          </div>
        )}

        <iframe
          src={url}
          title={`${name} live preview`}
          loading="lazy"
          className={`absolute inset-0 w-full h-full border-0 ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-300`}
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('blocked')}
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
}

/* ================================================================== */
/*  PROJECT FOLDER                                                     */
/* ================================================================== */

function ProjectFolder({ project, index }) {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((o) => !o);
  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  const langColor = LANGUAGE_COLORS[project.language] || '#888';
  const hasLiveDemo = Boolean(project.demo);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="border border-border bg-card overflow-hidden"
    >
      {/* ---------- header ---------- */}
      <button
        type="button"
        onClick={toggle}
        onKeyDown={handleKey}
        aria-expanded={open}
        aria-label={open ? `Close ${project.name}` : `Open ${project.name}`}
        className="w-full flex items-center gap-4 px-5 py-4 hover:bg-[#0B0B0B] transition-colors text-left outline-none focus-visible:ring-1 focus-visible:ring-accent/60"
      >
        <span className="shrink-0">
          <MacFolderIcon open={open} size={28} />
        </span>

        <span className="font-mono text-[10px] text-muted/70 w-6 shrink-0">
          {String(index + 1).padStart(2, '0')}
        </span>

        <span className="flex-1 min-w-0">
          <span className="block font-mono text-sm text-foreground truncate">
            {project.slug}/
          </span>
          <span className="block font-mono text-[10px] text-muted mt-0.5 truncate">
            {project.category.toUpperCase()}
          </span>
        </span>

        {/* live badge */}
        {hasLiveDemo && (
          <span className="hidden sm:inline-flex items-center gap-1.5 font-mono text-[10px] text-accent border border-accent/30 px-2 py-0.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            LIVE
          </span>
        )}

        {/* mini stats */}
        <span className="hidden md:flex items-center gap-3 font-mono text-[10px] text-muted shrink-0">
          {project.language && (
            <span className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: langColor }}
              />
              {project.language}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3" />
            {project.stars}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="w-3 h-3" />
            {project.forks}
          </span>
        </span>

        <ChevronRight
          className={`w-4 h-4 text-muted shrink-0 transition-transform duration-300 ${
            open ? 'rotate-90 text-accent' : ''
          }`}
        />
      </button>

      {/* ---------- expanded ---------- */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border"
          >
            <div className="p-5 space-y-5">
              {/* description */}
              <p className="text-sm text-secondary leading-relaxed">
                {project.description}
              </p>

              {/* file structure */}
              <div className="border border-border bg-[#0B0B0B] p-4 font-mono text-xs">
                <div className="flex items-center gap-2 text-muted mb-3">
                  <Terminal className="w-3 h-3" />
                  <span className="tracking-wider">/ {project.slug}</span>
                </div>
                <div className="space-y-0.5">
                  {project.structure.map((file, j) => {
                    const isLast = j === project.structure.length - 1;
                    return (
                      <div
                        key={file}
                        className="flex items-center gap-2 text-muted"
                      >
                        <span>{isLast ? '└──' : '├──'}</span>
                        <span className="text-secondary">{file}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* stack chips */}
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] text-muted border border-border px-2 py-0.5"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* preview — live iframe or 404 */}
              <PreviewFrame url={project.demo} name={project.name} />

              {/* actions */}
              <div className="flex flex-wrap gap-2 pt-1">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-border px-3 py-2 font-mono text-xs text-foreground hover:border-accent hover:text-accent transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>View code</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>

                {project.demo ? (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-accent text-background px-3 py-2 font-mono text-xs hover:bg-accent/90 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live demo</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 border border-border px-3 py-2 font-mono text-xs text-muted cursor-not-allowed">
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live demo — soon</span>
                  </span>
                )}

                <a
                  href={`${project.github}/issues`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-border px-3 py-2 font-mono text-xs text-foreground hover:border-accent hover:text-accent transition-colors ml-auto"
                >
                  <GitBranch className="w-3.5 h-3.5" />
                  <span>Issues</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ================================================================== */
/*  PROJECTS SECTION                                                   */
/* ================================================================== */

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <Container>
        {/* ---------- HEADER ---------- */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-sm text-accent">03</span>
            <span className="font-mono text-sm text-muted uppercase tracking-widest">
              PROJECTS
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="font-mono text-xs text-muted mb-4">
            <span className="text-accent">$</span> ls -la ./projects
          </div>

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
            Selected <YellowUnderline>work</YellowUnderline>.
          </h2>

          <p className="mt-4 text-base text-secondary leading-relaxed max-w-2xl">
            Full-stack applications built with real-time features, clean APIs,
            and production-grade architecture. Click any folder to explore.
          </p>
        </div>

        {/* ---------- TERMINAL PREVIEW ---------- */}
        <div className="terminal-window mb-10">
          <TerminalChrome title="bash — uttam@dev" />
          <div className="p-5 font-mono text-sm overflow-x-auto">
            <div className="text-secondary mb-2">
              <span className="text-accent">$</span> ls -la ./projects
            </div>
            <div className="text-muted">/projects</div>
            <div className="mt-2 space-y-1">
              {PROJECTS.map((project, idx) => (
                <div key={project.slug}>
                  <div className="flex items-center gap-2 text-foreground">
                    <span className="text-muted">
                      {idx === PROJECTS.length - 1 ? '└──' : '├──'}
                    </span>
                    <MacFolderIcon size={16} />
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors"
                    >
                      {project.slug}/
                    </a>
                    {project.demo && (
                      <span className="font-mono text-[10px] text-accent ml-1">
                        ● live
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ---------- FOLDER LIST ---------- */}
        <div className="space-y-3">
          {PROJECTS.map((project, i) => (
            <ProjectFolder key={project.slug} project={project} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}