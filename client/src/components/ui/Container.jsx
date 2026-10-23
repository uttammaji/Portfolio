export default function Container({ children, className = '', size = 'default' }) {
  const sizes = {
    default: 'max-w-6xl',
    wide: 'max-w-7xl',
    narrow: 'max-w-4xl',
  };

  return (
    <div className={`mx-auto px-6 sm:px-8 ${sizes[size]} ${className}`}>
      {children}
    </div>
  );
}
