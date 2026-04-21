import { useState, useEffect } from 'react';

// 2025 F1 Calendar (remaining rounds — approximate race start times UTC)
const RACES = [
  { gp: 'Miami Grand Prix', circuit: 'Miami International Autodrome', flag: '🇺🇸', date: new Date('2025-05-04T19:00:00Z') },
  { gp: 'Emilia Romagna Grand Prix', circuit: 'Autodromo Enzo e Dino Ferrari', flag: '🇮🇹', date: new Date('2025-05-18T13:00:00Z') },
  { gp: 'Monaco Grand Prix', circuit: 'Circuit de Monaco', flag: '🇲🇨', date: new Date('2025-05-25T13:00:00Z') },
  { gp: 'Spanish Grand Prix', circuit: 'Circuit de Barcelona-Catalunya', flag: '🇪🇸', date: new Date('2025-06-01T13:00:00Z') },
  { gp: 'Canadian Grand Prix', circuit: 'Circuit Gilles Villeneuve', flag: '🇨🇦', date: new Date('2025-06-15T18:00:00Z') },
  { gp: 'Austrian Grand Prix', circuit: 'Red Bull Ring', flag: '🇦🇹', date: new Date('2025-06-29T13:00:00Z') },
  { gp: 'British Grand Prix', circuit: 'Silverstone Circuit', flag: '🇬🇧', date: new Date('2025-07-06T14:00:00Z') },
  { gp: 'Belgian Grand Prix', circuit: 'Circuit de Spa-Francorchamps', flag: '🇧🇪', date: new Date('2025-07-27T13:00:00Z') },
  { gp: 'Hungarian Grand Prix', circuit: 'Hungaroring', flag: '🇭🇺', date: new Date('2025-08-03T13:00:00Z') },
  { gp: 'Dutch Grand Prix', circuit: 'Circuit Zandvoort', flag: '🇳🇱', date: new Date('2025-08-31T13:00:00Z') },
  { gp: 'Italian Grand Prix', circuit: 'Autodromo Nazionale Monza', flag: '🇮🇹', date: new Date('2025-09-07T13:00:00Z') },
  { gp: 'Singapore Grand Prix', circuit: 'Marina Bay Street Circuit', flag: '🇸🇬', date: new Date('2025-09-21T08:00:00Z') },
  { gp: 'Japanese Grand Prix', circuit: 'Suzuka International Racing Course', flag: '🇯🇵', date: new Date('2025-10-05T05:00:00Z') },
  { gp: 'United States Grand Prix', circuit: 'Circuit of the Americas', flag: '🇺🇸', date: new Date('2025-10-19T19:00:00Z') },
  { gp: 'Abu Dhabi Grand Prix', circuit: 'Yas Marina Circuit', flag: '🇦🇪', date: new Date('2025-11-30T13:00:00Z') },
];

function getNextRace() {
  const now = new Date();
  return RACES.find((r) => r.date > now) ?? RACES[RACES.length - 1];
}

export default function NextRace() {
  const race = getNextRace();
  const [remaining, setRemaining] = useState(() => race.date.getTime() - Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(race.date.getTime() - Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, [race]);

  const isNegative = remaining < 0;
  const abs = Math.abs(remaining);

  const days = Math.floor(abs / 86_400_000);
  const hours = Math.floor((abs % 86_400_000) / 3_600_000);
  const mins = Math.floor((abs % 3_600_000) / 60_000);
  const secs = Math.floor((abs % 60_000) / 1_000);

  const units = [
    { v: days, l: 'D' },
    { v: hours, l: 'H' },
    { v: mins, l: 'M' },
    { v: secs, l: 'S' },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <div
        className="rounded-2xl px-4 py-3"
        style={{
          background: 'rgba(8,8,8,0.85)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Label */}
        <div
          className="font-orbitron text-[8px] tracking-widest mb-0.5"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          {isNegative ? 'RACE IN PROGRESS' : 'NEXT RACE'} · {race.flag}
        </div>

        {/* GP name */}
        <div
          className="font-barlow font-semibold text-xs mb-2 tracking-wide"
          style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          {race.gp}
        </div>

        {/* Countdown */}
        <div className="flex gap-3 items-end">
          {units.map(({ v, l }) => (
            <div key={l} className="text-center">
              <div
                className="font-orbitron font-black text-xl leading-none tabular-nums"
                style={{ color: 'var(--accent)' }}
              >
                {String(v).padStart(2, '0')}
              </div>
              <div
                className="font-orbitron text-[7px] tracking-widest mt-0.5"
                style={{ color: 'rgba(255,255,255,0.2)' }}
              >
                {l}
              </div>
            </div>
          ))}
        </div>

        {/* Circuit */}
        <div
          className="mt-2 font-orbitron text-[7px] tracking-widest"
          style={{ color: 'rgba(var(--accent-rgb), 0.3)' }}
        >
          {race.circuit.toUpperCase()}
        </div>
      </div>
    </div>
  );
}
