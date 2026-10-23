import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Command } from 'lucide-react';
import Button from '@/components/ui/Button';

const navLinks = [
  { label: 'Work',    to: '/projects' },
  { label: 'About',   to: '/about' },
  { label: 'Stack',   to: '/#stack' },
  { label: 'Writing', to: '/blog' },
];

/* ------------------------------------------------------------------ */
/*  HANDWRITTEN UNDERLINE — green curve under active section           */
/* ------------------------------------------------------------------ */

function HandUnderline() {
  return (
    <motion.svg
      layoutId="nav-active-underline"
      aria-hidden="true"
      viewBox="0 0 120 10"
      preserveAspectRatio="none"
      className="absolute left-2 right-2 -bottom-0.5 w-[calc(100%-1rem)] h-2 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <path
        d="M2 6 C 25 2, 55 8, 80 4 S 110 7, 118 5"
        fill="none"
        stroke="#7CFF9B"
        strokeWidth="2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </motion.svg>
  );
}

export default function Navbar({ onOpenCommand }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  /* Lock scroll while mobile menu is open */
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const isActive = (to) => {
    if (to.startsWith('/#')) return location.pathname === '/';
    return location.pathname === to;
  };

  const activeLink = navLinks.find((l) => isActive(l.to));

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-2' : 'py-4'
        }`}
      >
        <div className="mx-auto px-4 sm:px-6 max-w-7xl">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              scrolled
                ? 'bg-surface/80 backdrop-blur-xl border border-border px-4 py-2.5'
                : 'px-2'
            }`}
          >
            {/* ---------- logo ---------- */}
            <Link to="/" className="flex items-center gap-2 group">
              <span className="font-mono font-bold text-sm tracking-tight">
                uttam<span className="text-accent">.</span>maji
              </span>
            </Link>

            {/* ---------- desktop nav ---------- */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.to);
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`relative px-4 py-2 transition-colors ${
                      active
                        ? 'text-foreground'
                        : 'text-secondary hover:text-foreground'
                    }`}
                  >
                    {/* handwritten label */}
                    <span
                      className="font-handwritten text-lg leading-none"
                      style={{ display: 'inline-block' }}
                    >
                      {link.label}
                    </span>

                    {/* active underline — animated between links */}
                    {active && <HandUnderline />}
                  </Link>
                );
              })}
            </nav>

            {/* ---------- right actions ---------- */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={onOpenCommand}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-mono text-muted border border-border hover:border-accent/50 hover:text-accent transition-colors"
                aria-label="Open command palette"
              >
                <Command className="w-3 h-3" />K
              </button>
              <Button to="/contact" size="sm" variant="terminal">
                ./talk
              </Button>
            </div>

            {/* ---------- mobile toggle ---------- */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-foreground"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ---------- mobile menu ---------- */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden bg-background/95 backdrop-blur-xl"
          >
            {/* faint grid overlay */}
            <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

            <div className="relative flex flex-col items-center justify-center h-full gap-8 px-8">
              {/* terminal label */}
              <div className="font-mono text-[11px] text-muted tracking-widest uppercase mb-4">
                <span className="text-accent">$</span> navigate
              </div>

              {navLinks.map((link, i) => {
                const active = isActive(link.to);
                return (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: i * 0.05 }}
                    className="relative"
                  >
                    <Link
                      to={link.to}
                      className={`relative inline-block ${
                        active ? 'text-accent' : 'text-foreground'
                      }`}
                    >
                      <span
                        className="font-handwritten text-4xl leading-none"
                        style={{ display: 'inline-block' }}
                      >
                        {link.label}
                      </span>

                      {/* active underline on mobile too */}
                      {active && (
                        <svg
                          aria-hidden="true"
                          viewBox="0 0 120 10"
                          preserveAspectRatio="none"
                          className="absolute left-0 right-0 -bottom-1 w-full h-2 pointer-events-none"
                        >
                          <path
                            d="M2 6 C 25 2, 55 8, 80 4 S 110 7, 118 5"
                            fill="none"
                            stroke="#7CFF9B"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                    </Link>
                  </motion.div>
                );
              })}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.25 }}
                className="mt-4"
              >
                <Button to="/contact" size="lg" variant="primary">
                  ./contact-me
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}