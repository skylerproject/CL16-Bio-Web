import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import TelemetryCursor from './components/TelemetryCursor';
import Bio from './components/tabs/Bio';
import Links from './components/tabs/Links';
import Records from './components/tabs/Records';
import Trophy from './components/tabs/Trophy';
import type { FlavorType, TabType } from './types';

type ThemeMode = 'light' | 'night';

const FLAVORS: Record<FlavorType, { hex: string; rgb: string; label: string }> = {
  'rosso-corsa': { hex: '#FF2800', rgb: '255,40,0', label: 'Rosso Corsa' },
  pistachio: { hex: '#48A868', rgb: '72,168,104', label: 'Pistachio' },
  'salted-caramel': { hex: '#D68A32', rgb: '214,138,50', label: 'Salted Caramel' },
};

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('bio');
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [flavor, setFlavor] = useState<FlavorType>('rosso-corsa');
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const activeFlavor = FLAVORS[flavor];

    root.classList.toggle('night-mode', themeMode === 'night');
    root.style.setProperty('--accent', activeFlavor.hex);
    root.style.setProperty('--accent-rgb', activeFlavor.rgb);
    root.style.setProperty('--accent-label', `"${activeFlavor.label}"`);
  }, [flavor, themeMode]);

  const playPianoTransition = () => {
    const AudioContextCtor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextCtor) return;

    const context = audioContextRef.current ?? new AudioContextCtor();
    audioContextRef.current = context;

    const now = context.currentTime;
    const master = context.createGain();
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(0.09, now + 0.025);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
    master.connect(context.destination);

    [261.63, 329.63, 392.0, 523.25].forEach((frequency, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = 'triangle';
      oscillator.frequency.setValueAtTime(frequency, now);
      oscillator.detune.setValueAtTime(index * 2.5, now);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.42 / (index + 1), now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.05 + index * 0.04);
      oscillator.connect(gain);
      gain.connect(master);
      oscillator.start(now);
      oscillator.stop(now + 1.28);
    });
  };

  const handleTabChange = (tab: TabType) => {
    if (tab === activeTab) return;
    if (activeTab === 'bio' && tab === 'records') {
      playPianoTransition();
    }
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[28rem] bg-[linear-gradient(135deg,rgba(var(--accent-rgb),0.14),transparent_46%,rgba(209,213,219,0.24))]" />
        <div className="monaco-grid absolute inset-0 opacity-70" />
        <div className="top-fade absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-white/80 to-transparent" />
      </div>

      <div className="fixed inset-0 grain-overlay z-[1] pointer-events-none opacity-20" />

      <Navbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        themeMode={themeMode}
        onThemeChange={setThemeMode}
        flavor={flavor}
        onFlavorChange={setFlavor}
      />

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {activeTab === 'bio' && <Bio onExploreRecords={() => handleTabChange('records')} />}
            {activeTab === 'records' && <Records />}
            {activeTab === 'trophy' && <Trophy />}
            {activeTab === 'links' && <Links />}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="relative z-10 bg-[#06111f] px-4 py-10 text-white sm:px-8 lg:px-12">
        <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,transparent,var(--accent),rgba(var(--accent-rgb),0.72),transparent)]" />
        <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-orbitron text-xs font-black uppercase tracking-[0.3em] text-white">
              CL16 Light Maestro
            </p>
            <p className="mt-2 font-syne text-xs text-white/80">
              Copyright 2026. Driven by Passion.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 font-barlow text-xs font-bold uppercase tracking-[0.16em] text-white">
            <a href="https://www.instagram.com/charles_leclerc/" target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-9 w-9 place-items-center border border-white/50 transition hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white">
              IG
            </a>
            <a href="https://x.com/Charles_Leclerc" target="_blank" rel="noreferrer" aria-label="X" className="grid h-9 w-9 place-items-center border border-white/50 transition hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white">
              X
            </a>
            <a href="https://shop.charlesleclerc.com/" target="_blank" rel="noreferrer" aria-label="Store" className="grid h-9 w-9 place-items-center border border-white/50 transition hover:border-[var(--accent)] hover:bg-[var(--accent)] hover:text-white">
              ST
            </a>
          </div>
        </div>
      </footer>

      <TelemetryCursor />
    </div>
  );
}
