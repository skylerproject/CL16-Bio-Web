import { useState, useEffect } from 'react';

const SECRET = 'STUPID';

export function useEasterEgg(): boolean {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let buffer = '';
    let resetTimer: ReturnType<typeof setTimeout>;

    const handleKey = (e: KeyboardEvent) => {
      // Accumulate key presses, only last N chars
      buffer = (buffer + e.key.toUpperCase()).slice(-SECRET.length);

      if (buffer === SECRET) {
        setActive(true);
        buffer = '';
        clearTimeout(resetTimer);
        // Easter egg lasts 8 seconds then self-destructs
        resetTimer = setTimeout(() => setActive(false), 8_000);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      clearTimeout(resetTimer);
    };
  }, []);

  return active;
}
