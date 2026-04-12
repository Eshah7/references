'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export function NavigationProgress() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  useEffect(() => {
    clear();
    setWidth(0);
    setVisible(true);

    // Advance quickly to 70%, then stall
    timerRef.current = setTimeout(() => setWidth(70), 40);
    timerRef.current = setTimeout(() => setWidth(85), 300);
    // Complete and fade
    timerRef.current = setTimeout(() => {
      setWidth(100);
      timerRef.current = setTimeout(() => setVisible(false), 300);
    }, 500);

    return clear;
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 z-[200] h-[2px] bg-accent transition-all ease-out pointer-events-none"
      style={{
        width: `${width}%`,
        transitionDuration: width === 100 ? '200ms' : '400ms',
        opacity: width === 100 ? 0 : 1,
      }}
    />
  );
}
