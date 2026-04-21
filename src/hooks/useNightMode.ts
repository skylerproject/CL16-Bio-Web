import { useState, useEffect } from 'react';

function isNightTime(): boolean {
  const h = new Date().getHours();
  return h >= 18 || h < 6;
}

export function useNightMode() {
  const [isNight, setIsNight] = useState<boolean>(isNightTime);

  useEffect(() => {
    // Check every 30 seconds if the hour has crossed 18:00 or 06:00
    const interval = setInterval(() => {
      setIsNight(isNightTime());
    }, 30_000);
    return () => clearInterval(interval);
  }, []);

  return { isNight, setIsNight };
}
