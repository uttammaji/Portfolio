import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, CornerDownLeft, ArrowUp, ArrowDown, Github, Mail, FileText, Sun, Moon } from 'lucide-react';

const commands = [
  { id: 'home', label: 'View Home', hint: 'Go to homepage', to: '/', icon: Search, keywords: 'home main landing' },
  { id: 'projects', label: 'View Projects', hint: 'Browse project case studies', to: '/projects', icon: Search, keywords: 'work projects case study' },
  { id: 'about', label: 'About Uttam', hint: 'Learn about me', to: '/about', icon: Search, keywords: 'about me bio profile' },
  { id: 'stack', label: 'Technology Stack', hint: 'Explore my tech stack', to: '/#stack', icon: Search, keywords: 'stack skills technology tools' },
  { id: 'experience', label: 'Experience', hint: 'View my journey', to: '/about', icon: Search, keywords: 'experience work history career' },
  { id: 'writing', label: 'Writing', hint: 'Read articles', to: '/blog', icon: Search, keywords: 'writing blog articles posts' },
  { id: 'github', label: 'GitHub', hint: 'Open GitHub profile', href: 'https://github.com/uttammaji', icon: Github, keywords: 'github code repo' },
  { id: 'contact', label: 'Contact', hint: 'Get in touch', to: '/contact', icon: Mail, keywords: 'contact email talk reach' },
  { id: 'resume', label: 'Download Resume', hint: 'View resume PDF', href: '/resume.pdf', icon: FileText, keywords: 'resume cv download' },
  { id: 'theme', label: 'Toggle Theme', hint: 'Switch dark/light', action: 'theme', icon: Sun, keywords: 'theme dark light toggle' },
];

function fuzzyMatch(query, text) {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (t.includes(q)) return true;
  let qi = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) qi++;
  }
  return qi === q.length;
}

export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const filtered = useMemo(() => {
    if (!query) return commands;
    return commands.filter((c) => fuzzyMatch(query, c.label + ' ' + c.keywords + ' ' + c.hint));
  }, [query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelected(0);
  }, [query]);

  const execute = (cmd) => {
    if (cmd.to) {
      if (cmd.to.includes('#')) {
        const [path, hash] = cmd.to.split('#');
        navigate(path);
        setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' }), 100);
      } else {
        navigate(cmd.to);
      }
    } else if (cmd.href) {
      window.open(cmd.href, '_blank');
    } else if (cmd.action === 'theme') {
      const current = localStorage.getItem('theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      document.documentElement.classList.toggle('light', next === 'light');
    }
    onClose();
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelected((s) => Math.min(s + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelected((s) => Math.max(s - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selected]) execute(filtered[selected]);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, filtered, selected]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
        >
          <div className="absolute inset-0 bg-background/70 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-xl bg-card border border-border rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
              <span className="font-mono text-sm text-accent">{'>'}</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search portfolio..."
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted font-mono text-sm"
              />
              <kbd className="text-xs font-mono text-muted border border-border rounded px-1.5 py-0.5">ESC</kbd>
            </div>

            <div className="max-h-[50vh] overflow-y-auto p-2">
              {filtered.length === 0 && (
                <div className="px-4 py-8 text-center text-muted font-mono text-sm">
                  No results found for "{query}"
                </div>
              )}
              {filtered.map((cmd, i) => {
                const Icon = cmd.icon;
                return (
                  <button
                    key={cmd.id}
                    onClick={() => execute(cmd)}
                    onMouseEnter={() => setSelected(i)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                      i === selected ? 'bg-surface text-foreground' : 'text-secondary'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium">{cmd.label}</div>
                      <div className="text-xs text-muted font-mono">{cmd.hint}</div>
                    </div>
                    {i === selected && <CornerDownLeft className="w-3.5 h-3.5 text-accent" />}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between px-4 py-2.5 border-t border-border text-xs font-mono text-muted">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><ArrowUp className="w-3 h-3" /><ArrowDown className="w-3 h-3" /> navigate</span>
                <span className="flex items-center gap-1"><CornerDownLeft className="w-3 h-3" /> select</span>
              </div>
              <span>uttam@portfolio</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
