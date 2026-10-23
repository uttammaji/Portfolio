import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || reducedMotion) return;

    setVisible(true);

    const onMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onOver = (e) => {
      const target = e.target;
      const interactive = target.closest('a, button, [role="button"], input, textarea, [data-cursor="interactive"]');
      setHovering(!!interactive);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed pointer-events-none z-[9999] mix-blend-difference" style={{ left: position.x, top: position.y }}>
      <div
        className="absolute rounded-full transition-all duration-200 ease-out"
        style={{
          width: hovering ? '40px' : '8px',
          height: hovering ? '40px' : '8px',
          transform: 'translate(-50%, -50%)',
          border: hovering ? '1px solid #A3FF12' : 'none',
          backgroundColor: hovering ? 'transparent' : '#A3FF12',
        }}
      />
    </div>
  );
}
