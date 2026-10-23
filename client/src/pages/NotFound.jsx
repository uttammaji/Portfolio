import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, Home } from 'lucide-react';
import Container from '@/components/ui/Container';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Container size="narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="terminal-window max-w-md mx-auto mb-8">
            <div className="terminal-header">
              <span className="terminal-dot bg-red-500/70" />
              <span className="terminal-dot bg-yellow-500/70" />
              <span className="terminal-dot bg-green-500/70" />
              <span className="ml-3 font-mono text-xs text-muted">bash — error</span>
            </div>
            <div className="p-5 font-mono text-sm text-left">
              <div className="text-secondary">
                <span className="text-accent">$</span> cd /requested-page
              </div>
              <div className="text-red-400 mt-2">
                bash: requested-page: No such file or directory
              </div>
            </div>
          </div>

          <div className="font-mono text-6xl font-bold text-accent mb-4">ERROR 404</div>
          <p className="text-secondary mb-8">The route you're looking for doesn't exist.</p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-sm border border-border rounded-lg px-6 py-3 text-foreground hover:border-accent/50 hover:text-accent transition-colors"
          >
            <Home className="w-4 h-4" /> cd /home
          </Link>
        </motion.div>
      </Container>
    </div>
  );
}
