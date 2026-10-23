import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '@/data/projects';
import { skillCategories } from '@/data/skills';

const helpText = `Available commands:

  about       → Learn about me
  skills      → View technology stack
  projects    → Explore projects
  experience  → Experience
  github      → Open GitHub
  contact     → Get in touch
  clear       → Clear terminal`;

const aboutText = `Uttam Maji
Full-Stack MERN Developer

Building scalable, performant and thoughtfully designed
digital products with modern JavaScript technologies.

B.Tech in Computer Science & Engineering
Brainware University`;

const skillsText = skillCategories.map((cat) => {
  const lines = cat.skills.map((s) => `├── ${s.name}`);
  return `${cat.label}\n${lines.join('\n')}`;
}).join('\n\n');

const projectsText = projects.map((p, i) => `[${String(i + 1).padStart(2, '0')}] ${p.name}`).join('\n') + '\n\nType "open trackgo" to explore.';

const contactText = `Email: uttam.maji@example.com
GitHub: github.com/uttammaji
LinkedIn: linkedin.com/in/uttammaji

Or use the contact form on the contact page.`;

const githubText = `Opening GitHub profile...
→ github.com/uttammaji`;

function processCommand(cmd) {
  const trimmed = cmd.trim().toLowerCase();
  const parts = trimmed.split(/\s+/);
  const command = parts[0];

  switch (command) {
    case 'help':
      return { text: helpText, type: 'normal' };
    case 'about':
      return { text: aboutText, type: 'normal' };
    case 'skills':
      return { text: skillsText, type: 'normal' };
    case 'projects':
      return { text: projectsText, type: 'normal' };
    case 'experience':
      return { text: 'Type "experience" is available on the About page.\nUse the navigation or command palette to visit.', type: 'normal' };
    case 'github':
      return { text: githubText, type: 'link', href: 'https://github.com/uttammaji' };
    case 'contact':
      return { text: contactText, type: 'normal' };
    case 'clear':
      return { text: '', type: 'clear' };
    case 'sudo':
      if (parts.includes('hire') && parts.includes('uttam')) {
        return { text: 'Permission granted.\n\nLet\'s build something useful.', type: 'normal' };
      }
      return { text: `sudo: ${parts.slice(1).join(' ')}: command not found`, type: 'error' };
    case 'npm':
      if (parts[1] === 'run' && parts[2] === 'hire-uttam') {
        return { text: '✓ Portfolio scanned\n✓ Skills verified\n✓ Projects reviewed\n\nReady to build.', type: 'normal' };
      }
      return { text: `npm: ${parts.slice(1).join(' ')}: command not found`, type: 'error' };
    case 'open':
      return { text: `Opening ${parts[1] || '...'} — use the Projects page to explore case studies.`, type: 'normal' };
    case 'whoami':
      return { text: 'uttam-maji', type: 'normal' };
    case 'ls':
      return { text: 'about.md  projects/  skills.json  blog/  build.log', type: 'normal' };
    case '':
      return { text: '', type: 'empty' };
    default:
      return { text: `command not found: ${command}\nType "help" for available commands.`, type: 'error' };
  }
}

export default function Terminal() {
  const [lines, setLines] = useState([
    { type: 'output', text: 'Welcome to the interactive terminal. Type "help" to get started.' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cmd = input;
    setInput('');
    setHistory((h) => [...h, cmd]);
    setHistoryIndex(-1);

    const result = processCommand(cmd);

    if (result.type === 'clear') {
      setLines([]);
      return;
    }

    setLines((prev) => [
      ...prev,
      { type: 'command', text: cmd },
      ...(result.type === 'empty' ? [] : [{ type: 'output', text: result.text, outputType: result.type, href: result.href }]),
    ]);

    if (result.type === 'link' && result.href) {
      setTimeout(() => window.open(result.href, '_blank'), 500);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const idx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(idx);
        setInput(history[idx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const idx = historyIndex + 1;
        if (idx >= history.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(idx);
          setInput(history[idx]);
        }
      }
    }
  };

  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <span className="terminal-dot bg-red-500/70" />
        <span className="terminal-dot bg-yellow-500/70" />
        <span className="terminal-dot bg-green-500/70" />
        <span className="ml-3 font-mono text-xs text-muted">$ explore uttam</span>
      </div>
      <div
        ref={containerRef}
        className="p-5 font-mono text-sm h-[360px] overflow-y-auto"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line, i) => (
          <div key={i} className="mb-2">
            {line.type === 'command' ? (
              <div className="text-secondary">
                <span className="text-accent">uttam@dev:~$</span> {line.text}
              </div>
            ) : (
              <div className={`whitespace-pre-wrap ${line.outputType === 'error' ? 'text-red-400' : 'text-foreground/90'}`}>
                {line.text}
              </div>
            )}
          </div>
        ))}

        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <span className="text-accent">uttam@dev:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-foreground caret-accent"
            autoComplete="off"
            spellCheck="false"
            aria-label="Terminal input"
          />
        </form>
      </div>
    </div>
  );
}
