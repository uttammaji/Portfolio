export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'border-border text-secondary bg-surface',
    accent: 'border-accent/30 text-accent bg-accent/5',
    active: 'border-accent/40 text-accent bg-accent/10',
  };

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-mono uppercase tracking-wider border rounded-full ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
