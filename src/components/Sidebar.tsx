const LINKS = [
  { icon: '𝕏', label: 'Twitter / X', url: 'https://twitter.com/charles_leclerc' },
  { icon: '📷', label: 'Instagram', url: 'https://instagram.com/charles_leclerc' },
  { icon: '🏎️', label: 'Scuderia Ferrari', url: 'https://ferrari.com/en-EN/formula1' },
  { icon: '🎵', label: 'Lec2 Music', url: 'https://open.spotify.com' },
  { icon: '🏪', label: 'Official Store', url: '#' },
];

export default function Sidebar() {
  return (
    <aside className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2">
      {/* Vertical label */}
      <div
        className="mb-3 font-orbitron text-[8px] tracking-[0.3em] select-none"
        style={{
          color: 'rgba(255,40,0,0.3)',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          transform: 'rotate(180deg)',
          marginLeft: '50%',
        }}
      >
        LINKS
      </div>

      {LINKS.map((link) => (
        <a
          key={link.label}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          title={link.label}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all duration-250"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = 'rgba(var(--accent-rgb), 0.15)';
            el.style.borderColor = 'rgba(var(--accent-rgb), 0.4)';
            el.style.transform = 'scale(1.12) translateX(-3px)';
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.background = 'rgba(255,255,255,0.04)';
            el.style.borderColor = 'rgba(255,255,255,0.08)';
            el.style.transform = '';
          }}
        >
          {link.icon}
        </a>
      ))}

      {/* Decorative line */}
      <div
        className="mt-3 mx-auto"
        style={{
          width: 1,
          height: 40,
          background: 'linear-gradient(to bottom, rgba(255,40,0,0.3), transparent)',
        }}
      />
    </aside>
  );
}
