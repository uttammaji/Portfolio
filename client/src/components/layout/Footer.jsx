import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, ArrowUp, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative mt-32">
      {/* Rounded dark card wrapper */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 pb-6">
        <div className="relative bg-[#0B0B0B] border border-[#1f1f1f] rounded-[28px] overflow-hidden">
          {/* subtle grid */}
          <div className="absolute inset-0 grid-bg opacity-[0.05] pointer-events-none" />
          {/* soft green glow */}
          <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

          {/* top-right pill */}
          <a
            href="#top"
            className="absolute top-5 right-5 sm:top-6 sm:right-6 z-20 inline-flex items-center gap-2 bg-[#E5C07B] text-[#050505] px-4 py-2 rounded-full font-medium text-xs sm:text-sm hover:bg-[#d8b370] transition-colors"
          >
            <span>send me back up</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <div className="relative py-16 px-6 sm:px-10 lg:px-14 pt-20 lg:pt-16">
            {/* ---------- top row ---------- */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
              {/* brand + handwritten note */}
              <div className="md:col-span-2">
                <div className="font-mono font-bold text-lg mb-3">
                  uttam<span className="text-accent">.</span>maji
                </div>

                <p className="text-secondary text-sm max-w-sm leading-relaxed mb-6">
                  Full-Stack MERN Developer building useful software with modern
                  technologies.
                </p>

                <div
                  className="inline-block mb-5"
                  style={{ transform: 'rotate(-2deg)' }}
                >
                  <div className="font-handwritten text-2xl text-[#A3FFB0]/85 leading-none">
                    built with care, shipped with intent
                  </div>
                  <div className="mt-1 h-px w-40 bg-gradient-to-r from-[#A3FFB0]/60 to-transparent" />
                </div>

                <div className="font-mono text-xs text-muted space-y-1">
                  <div>
                    <span className="text-accent">$</span> built with React
                  </div>
                  <div>
                    <span className="text-accent">$</span> designed with intent
                  </div>
                </div>
              </div>

              {/* navigate */}
              <div>
                <div className="font-mono text-xs text-muted uppercase tracking-wider mb-4">
                  / navigate
                </div>
                <div className="flex flex-col gap-2.5">
                  {[
                    { label: 'Work',    to: '/projects' },
                    { label: 'About',   to: '/about'    },
                    { label: 'Writing', to: '/blog'     },
                    { label: 'Contact', to: '/contact'  },
                  ].map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="group text-sm text-secondary hover:text-accent transition-colors flex items-center gap-2"
                    >
                      <span className="text-muted/60 group-hover:text-accent transition-colors">
                        └─
                      </span>
                      <span className="group-hover:translate-x-0.5 transition-transform">
                        {link.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* connect */}
              <div>
                <div className="font-mono text-xs text-muted uppercase tracking-wider mb-4">
                  / connect
                </div>
                <div className="flex flex-col gap-2.5">
                  <a
                    href="https://github.com/uttammaji"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-sm text-secondary hover:text-accent transition-colors flex items-center gap-2"
                  >
                    <Github className="w-3.5 h-3.5 text-muted group-hover:text-accent transition-colors" />
                    <span>GitHub</span>
                    <span className="ml-auto text-muted/50 group-hover:text-accent transition-colors">
                      ↗
                    </span>
                  </a>
                  <a
                    href="https://linkedin.com/in/uttam-maji-99070p0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group text-sm text-secondary hover:text-accent transition-colors flex items-center gap-2"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-muted group-hover:text-accent transition-colors" />
                    <span>LinkedIn</span>
                    <span className="ml-auto text-muted/50 group-hover:text-accent transition-colors">
                      ↗
                    </span>
                  </a>
                  <a
                    href="mailto:uttam.maji@example.com"
                    className="group text-sm text-secondary hover:text-accent transition-colors flex items-center gap-2"
                  >
                    <Mail className="w-3.5 h-3.5 text-muted group-hover:text-accent transition-colors" />
                    <span>Email</span>
                    <span className="ml-auto text-muted/50 group-hover:text-accent transition-colors">
                      ↗
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* ---------- big statement headline (style element) ---------- */}
            <div className="border-t border-[#1f1f1f] pt-10 mb-10">
              <h2
                className="font-bold tracking-[-0.03em] leading-[0.9] text-[#F5F5F5]"
                style={{ fontSize: 'clamp(2.5rem, 9vw, 7rem)' }}
              >
                Building Something
                <br />
                that Matters
              </h2>
            </div>

            {/* ---------- bottom row ---------- */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-[#1f1f1f]">
              <div className="font-mono text-xs text-muted">
                <span className="text-accent">$</span> exit{' '}
                <span className="text-muted/60">—</span>{' '}
                <span className="font-handwritten text-base text-[#A3FFB0]/70">
                  thanks for visiting
                </span>
              </div>

              <div className="font-mono text-xs text-muted">
                © 2026 Uttam Maji
              </div>

              <a
                href="#top"
                className="flex items-center gap-1.5 text-xs font-mono text-muted hover:text-accent transition-colors"
              >
                <ArrowUp className="w-3 h-3" /> back to top
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}