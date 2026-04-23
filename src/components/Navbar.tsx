import { motion } from 'framer-motion';
import type { FlavorType, TabType } from '../types';

type ThemeMode = 'light' | 'night';

const TABS: { id: TabType; label: string }[] = [
  { id: 'bio', label: 'Bio' },
  { id: 'records', label: 'Records' },
  { id: 'trophy', label: 'Trophy' },
  { id: 'links', label: 'Links' },
];

const FLAVORS: { id: FlavorType; label: string; hex: string }[] = [
  { id: 'rosso-corsa', label: 'Rosso', hex: '#FF2800' },
  { id: 'pistachio', label: 'Pistachio', hex: '#48A868' },
  { id: 'salted-caramel', label: 'Caramel', hex: '#D68A32' },
];

interface NavbarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  themeMode: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
  flavor: FlavorType;
  onFlavorChange: (flavor: FlavorType) => void;
}

export default function Navbar({
  activeTab,
  onTabChange,
  themeMode,
  onThemeChange,
  flavor,
  onFlavorChange,
}: NavbarProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] bg-[rgba(255,255,255,0.50)] backdrop-blur-2xl night-nav-panel">
      <nav className="flex min-h-[76px] w-full flex-col gap-3 px-4 py-3 sm:min-h-[84px] sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-10">
        <button
          className="flex items-center gap-4 text-left"
          onClick={() => onTabChange('bio')}
          aria-label="Go to Bio"
        >
          <div className="nav-mark grid h-11 w-11 place-items-center border border-[var(--heading)] bg-[var(--heading)] font-orbitron text-sm font-black text-white">
            16
          </div>
          <div>
            <p className="font-orbitron text-sm font-black uppercase tracking-[0.32em] text-[var(--heading)]">
              CL16
            </p>
            <p className="font-syne text-[11px] uppercase tracking-[0.18em] text-[var(--text-secondary)]">
              The Light Maestro
            </p>
          </div>
        </button>

        <div className="flex min-w-0 flex-1 justify-start overflow-x-auto sm:justify-center">
          <div className="flex items-center gap-1">
            {TABS.map((tab) => {
              const isActive = tab.id === activeTab;

              return (
                <button
                  key={tab.id}
                  onClick={() => onTabChange(tab.id)}
                  className="relative px-4 py-3 font-barlow text-sm font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)] transition hover:text-[var(--heading)] sm:px-5"
                >
                  <span className={isActive ? 'text-[var(--heading)]' : ''}>{tab.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="navbar-underline"
                      className="absolute inset-x-4 bottom-1 h-0.5 bg-[var(--accent)]"
                      transition={{ type: 'spring', stiffness: 520, damping: 38 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2 sm:justify-end">
          <div className="flex border border-[var(--border)] bg-white/40 p-1 backdrop-blur-xl night-control-panel">
            <button
              onClick={() => onThemeChange(themeMode === 'night' ? 'light' : 'night')}
              className={`px-3 py-2 font-barlow text-xs font-bold uppercase tracking-[0.16em] transition ${
                themeMode === 'night'
                  ? 'bg-[#FFE66D] text-[#001C40]'
                  : 'bg-white text-[var(--heading)]'
              }`}
            >
              {themeMode === 'night' ? 'Monaco Night' : 'Light Mode'}
            </button>
          </div>

          <div className="flex gap-1 border border-[var(--border)] bg-white/40 p-1 backdrop-blur-xl night-control-panel">
            {FLAVORS.map((item) => (
              <button
                key={item.id}
                onClick={() => onFlavorChange(item.id)}
                className={`flex items-center gap-2 px-3 py-2 font-syne text-[11px] transition ${
                  flavor === item.id
                    ? 'bg-[#FFE66D] text-[#001C40]'
                    : 'text-[var(--text-secondary)]'
                }`}
                title={`LEC flavor: ${item.label}`}
              >
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: item.hex, boxShadow: `0 0 12px ${item.hex}88` }}
                />
                <span className="hidden lg:inline">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
