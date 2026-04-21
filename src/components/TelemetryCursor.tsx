import { useEffect, useRef } from 'react';

const CLICKABLE_SELECTOR = 'a, button, input, select, textarea, [role="button"], [tabindex]:not([tabindex="-1"])';

export default function TelemetryCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    let cursorX = -100;
    let cursorY = -100;
    let dotX = -100;
    let dotY = -100;
    let rafId = 0;

    const setClickable = (target: EventTarget | null) => {
      const element = target instanceof Element ? target : null;
      const isClickable = Boolean(element?.closest(CLICKABLE_SELECTOR));
      cursor.dataset.clickable = String(isClickable);
    };

    const onMove = (event: MouseEvent) => {
      cursorX = event.clientX;
      cursorY = event.clientY;
      dotX = event.clientX;
      dotY = event.clientY;
      cursor.dataset.visible = 'true';
      setClickable(event.target);
    };

    const onLeave = () => {
      cursor.dataset.visible = 'false';
    };

    const render = () => {
      const currentX = Number(cursor.dataset.x ?? cursorX);
      const currentY = Number(cursor.dataset.y ?? cursorY);
      const nextX = currentX + (cursorX - currentX) * 0.2;
      const nextY = currentY + (cursorY - currentY) * 0.2;

      cursor.dataset.x = String(nextX);
      cursor.dataset.y = String(nextY);
      cursor.style.transform = `translate3d(${nextX}px, ${nextY}px, 0) translate(-50%, -50%)`;
      dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        data-visible="false"
        data-clickable="false"
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden h-9 w-9 rounded-full border border-[var(--accent)] opacity-0 mix-blend-multiply transition-[width,height,background-color,border-color,opacity] duration-200 ease-out data-[clickable=true]:h-12 data-[clickable=true]:w-12 data-[clickable=true]:border-[rgba(var(--accent-rgb),0.18)] data-[clickable=true]:bg-[rgba(var(--accent-rgb),0.82)] data-[visible=true]:opacity-100 md:block"
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[10000] hidden h-1.5 w-1.5 rounded-full bg-[var(--accent)] mix-blend-multiply md:block"
      />
    </>
  );
}
