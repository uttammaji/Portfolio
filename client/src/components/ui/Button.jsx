import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Button({ children, to, href, onClick, variant = 'primary', size = 'md', className = '', icon: Icon, iconPosition = 'right' }) {
  const base = 'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 group/btn';

  const variants = {
    primary: 'bg-accent text-background hover:bg-accent-hover hover:glow-accent',
    secondary: 'border border-border bg-card text-foreground hover:border-accent/50 hover:text-accent',
    ghost: 'text-secondary hover:text-foreground',
    terminal: 'border border-border bg-surface text-foreground font-mono text-sm hover:border-accent/50 hover:text-accent',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-sm rounded-lg',
    lg: 'px-8 py-4 text-base rounded-xl',
  };

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
      {children}
      {Icon && iconPosition === 'right' && <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />}
    </>
  );

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) return <Link to={to} className={classes}>{content}</Link>;
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>{content}</a>;
  return <button onClick={onClick} className={classes}>{content}</button>;
}
