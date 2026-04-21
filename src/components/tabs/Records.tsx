import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { RACE_ARCHIVE } from '../../data/raceArchive';
import { useCountUp } from '../../hooks/useCountUp';

type RecordsView = 'dashboard' | 'archive';
type ResultFilter = 'all' | 'wins' | 'podiums' | 'points';

const CAREER_COUNTERS = [
  { label: 'Wins', value: 8, helper: 'Grand Prix victories' },
  { label: 'Poles', value: 27, helper: 'Official F1 career pole positions' },
  { label: 'Podiums', value: 52, helper: 'Career top-three finishes' },
  { label: 'Fastest Laps', value: 11, helper: 'Race fastest laps in timing archives' },
];

const SEASONS = [
  { year: '2018', points: 39 },
  { year: '2019', points: 264 },
  { year: '2020', points: 98 },
  { year: '2021', points: 159 },
  { year: '2022', points: 308 },
  { year: '2023', points: 206 },
  { year: '2024', points: 356 },
  { year: '2025', points: 242 },
  { year: '2026', points: 49 },
];

const ARCHIVE_NEWEST_FIRST = [...RACE_ARCHIVE].sort((a, b) => {
  if (b.season !== a.season) return b.season - a.season;
  return b.round - a.round;
});
const YEARS = ['all', ...Array.from(new Set(ARCHIVE_NEWEST_FIRST.map((race) => String(race.season))))];
const MAX_POINTS = Math.max(...SEASONS.map((season) => season.points));
const CHART_POINTS = SEASONS.map((season, index) => {
  const x = 34 + index * 104;
  const y = 246 - (season.points / MAX_POINTS) * 190;
  return { ...season, x, y };
});
const LINE_PATH = CHART_POINTS.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
const AREA_PATH = `${LINE_PATH} L ${CHART_POINTS[CHART_POINTS.length - 1].x} 270 L ${CHART_POINTS[0].x} 270 Z`;

function formatGapToWinner(race: (typeof RACE_ARCHIVE)[number]) {
  if (race.positionOrder === 1) return 'WINNER';
  if (/^\+\d+\s+Laps?$/i.test(race.status)) return race.status.toUpperCase();
  if (race.status === 'Finished') return 'SAME LAP';
  return race.status.toUpperCase();
}

function CounterCard({ stat, index }: { stat: (typeof CAREER_COUNTERS)[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const count = useCountUp(stat.value, 1400 + index * 180, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ delay: index * 0.08, duration: 0.55 }}
      className="border border-[var(--border)] bg-[var(--card-bg)] p-6 shadow-[0_24px_70px_rgba(0,28,64,0.08)] backdrop-blur-2xl"
    >
      <div className="mb-10 flex items-center justify-between">
        <span className="font-barlow text-xs font-bold uppercase tracking-[0.28em] text-[var(--text-secondary)]">
          {stat.label}
        </span>
        <span className="h-3 w-3 rounded-full bg-[var(--accent)] shadow-[0_0_20px_rgba(var(--accent-rgb),0.65)]" />
      </div>
      <div className="font-orbitron text-6xl font-black leading-none text-[var(--heading)]">
        {count}
      </div>
      <p className="mt-4 font-syne text-sm leading-6 text-[var(--text-secondary)]">{stat.helper}</p>
    </motion.div>
  );
}

function DashboardView({ onOpenArchive }: { onOpenArchive: () => void }) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInView = useInView(chartRef, { once: true, margin: '-100px' });

  return (
    <motion.div
      key="dashboard"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.36 }}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CAREER_COUNTERS.map((stat, index) => (
          <CounterCard key={stat.label} stat={stat} index={index} />
        ))}
      </div>

      <div ref={chartRef} className="mt-6 border border-[var(--border)] bg-[var(--card-bg)] p-5 shadow-[0_28px_90px_rgba(0,28,64,0.10)] backdrop-blur-2xl sm:p-8">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-orbitron text-xs uppercase tracking-[0.34em] text-[var(--accent)]">
              Season Telemetry
            </p>
            <h2 className="mt-2 font-barlow text-4xl font-bold uppercase text-[var(--heading)]">
              Points per season
            </h2>
          </div>
          <p className="font-syne text-xs text-[var(--text-secondary)]">
            Current-season value is snapshot data.
          </p>
        </div>

        <div className="overflow-x-auto">
          <svg viewBox="0 0 900 310" className="min-w-[820px]" role="img" aria-label="Charles Leclerc points per season line chart">
            <defs>
              <linearGradient id="seasonArea" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.24" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[56, 104, 151, 199, 246].map((y) => (
              <line key={y} x1="30" x2="870" y1={y} y2={y} stroke="rgba(0,28,64,0.10)" strokeDasharray="4 8" />
            ))}
            <motion.path
              d={AREA_PATH}
              fill="url(#seasonArea)"
              initial={{ opacity: 0 }}
              animate={chartInView ? { opacity: 1 } : undefined}
              transition={{ duration: 0.8 }}
            />
            <motion.path
              d={LINE_PATH}
              fill="none"
              stroke="var(--accent)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="5"
              initial={{ pathLength: 0 }}
              animate={chartInView ? { pathLength: 1 } : undefined}
              transition={{ duration: 1.4, ease: 'easeOut' }}
            />
            {CHART_POINTS.map((point, index) => (
              <g key={point.year}>
                <motion.circle
                  cx={point.x}
                  cy={point.y}
                  r="8"
                  fill="var(--accent)"
                  stroke="white"
                  strokeWidth="4"
                  initial={{ scale: 0 }}
                  animate={chartInView ? { scale: 1 } : undefined}
                  transition={{ delay: 0.35 + index * 0.08, type: 'spring', stiffness: 280 }}
                />
                <text x={point.x} y="296" textAnchor="middle" className="fill-[var(--text-secondary)] font-orbitron text-[11px]">
                  {point.year}
                </text>
                <text x={point.x} y={point.y - 18} textAnchor="middle" className="fill-[var(--heading)] font-barlow text-[16px] font-bold">
                  {point.points}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.92fr]">
        <div className="border border-[var(--border)] bg-[var(--card-bg)] p-6 backdrop-blur-2xl sm:p-8">
          <p className="font-orbitron text-xs uppercase tracking-[0.34em] text-[var(--accent)]">
            The Full Racing Archive
          </p>
          <h2 className="mt-3 font-barlow text-4xl font-bold uppercase text-[var(--heading)]">
            {RACE_ARCHIVE.length} race result rows
          </h2>
          <p className="mt-4 max-w-xl font-syne text-sm leading-7 text-[var(--text-secondary)]">
            Every available F1 race result row from the Jolpica/Ergast archive, from Sauber debut to the 2026 season snapshot.
          </p>
          <button
            onClick={onOpenArchive}
            className="mt-7 border border-[var(--heading)] bg-[var(--heading)] px-6 py-4 font-barlow text-sm font-bold uppercase tracking-[0.24em] text-white transition hover:border-[var(--accent)] hover:bg-[var(--accent)]"
          >
            Open race-by-race archive
          </button>
        </div>

        <div className="border border-[rgba(var(--accent-rgb),0.28)] bg-[rgba(var(--accent-rgb),0.08)] p-6 shadow-[0_24px_80px_rgba(var(--accent-rgb),0.12)] backdrop-blur-2xl sm:p-8">
          <p className="font-orbitron text-xs uppercase tracking-[0.34em] text-[var(--accent)]">
            Baku Specialized Stats
          </p>
          <h2 className="mt-3 font-barlow text-4xl font-bold uppercase text-[var(--heading)]">
            Street Circuit Specialist
          </h2>
          <div className="mt-6 grid gap-3">
            {[
              ['Consecutive poles', '4', '2021, 2022, 2023, 2024'],
              ['Circuit identity', 'Baku', 'late-brake rhythm through the castle section'],
              ['Signature mode', 'Q3', 'wall-close commitment when grip peaks'],
            ].map(([label, value, detail]) => (
              <div key={label} className="border border-white/50 bg-white/55 p-4 backdrop-blur-xl night-panel">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-syne text-sm text-[var(--text-secondary)]">{label}</span>
                  <span className="font-orbitron text-2xl font-black text-[var(--heading)]">{value}</span>
                </div>
                <p className="mt-2 font-syne text-xs leading-5 text-[var(--text-secondary)]">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ArchiveView({ onBack }: { onBack: () => void }) {
  const [yearFilter, setYearFilter] = useState('all');
  const [resultFilter, setResultFilter] = useState<ResultFilter>('all');

  const filteredRaces = ARCHIVE_NEWEST_FIRST.filter((race) => {
    const matchesYear = yearFilter === 'all' || String(race.season) === yearFilter;
    const matchesResult =
      resultFilter === 'all' ||
      (resultFilter === 'wins' && race.positionOrder === 1) ||
      (resultFilter === 'podiums' && race.positionOrder <= 3) ||
      (resultFilter === 'points' && race.positionOrder <= 10);

    return matchesYear && matchesResult;
  });

  return (
    <motion.div
      key="archive"
      initial={{ opacity: 0, x: 42 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -42 }}
      transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="border border-[var(--border)] bg-[var(--card-bg)] p-4 shadow-[0_30px_90px_rgba(0,28,64,0.12)] backdrop-blur-2xl sm:p-7"
    >
      <div className="flex flex-col gap-5 border-b border-[var(--border)] pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <button
            onClick={onBack}
            className="font-barlow text-xs font-bold uppercase tracking-[0.22em] text-[var(--accent)]"
          >
            Back to dashboard
          </button>
          <h2 className="mt-4 font-orbitron text-[clamp(2.3rem,6vw,5.2rem)] font-black uppercase leading-[0.86] text-[var(--heading)]">
            Racing Archive
          </h2>
          <p className="mt-3 max-w-2xl font-syne text-sm leading-7 text-[var(--text-secondary)]">
            Filter the full race-by-race dataset by season or result profile.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="font-syne text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]">
            Year
            <select
              value={yearFilter}
              onChange={(event) => setYearFilter(event.target.value)}
              className="mt-2 w-full border border-[var(--border)] bg-white/70 px-4 py-3 font-barlow text-sm font-bold uppercase tracking-[0.16em] text-[var(--heading)] outline-none night-panel"
            >
              {YEARS.map((year) => (
                <option key={year} value={year}>
                  {year === 'all' ? 'All years' : year}
                </option>
              ))}
            </select>
          </label>

          <label className="font-syne text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]">
            Position
            <select
              value={resultFilter}
              onChange={(event) => setResultFilter(event.target.value as ResultFilter)}
              className="mt-2 w-full border border-[var(--border)] bg-white/70 px-4 py-3 font-barlow text-sm font-bold uppercase tracking-[0.16em] text-[var(--heading)] outline-none night-panel"
            >
              <option value="all">All results</option>
              <option value="wins">Wins</option>
              <option value="podiums">Podiums</option>
              <option value="points">Points finishes</option>
            </select>
          </label>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <p className="font-orbitron text-[10px] uppercase tracking-[0.28em] text-[var(--text-secondary)]">
          Showing {filteredRaces.length} of {RACE_ARCHIVE.length}
        </p>
        <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[1280px] table-fixed border-collapse">
          <colgroup>
            <col className="w-[6.5rem]" />
            <col className="w-[5rem]" />
            <col className="w-[14rem]" />
            <col className="w-[18rem]" />
            <col className="w-[8rem]" />
            <col className="w-[5rem]" />
            <col className="w-[7rem]" />
            <col className="w-[8.5rem]" />
            <col className="w-[6rem]" />
            <col className="w-[11rem]" />
          </colgroup>
          <thead>
            <tr className="border-b border-[var(--border)] text-left font-orbitron text-[10px] uppercase tracking-[0.22em] text-[var(--text-secondary)]">
              <th className="py-4 pr-5">Season</th>
              <th className="py-4 pr-5">Round</th>
              <th className="py-4 pr-5">Grand Prix</th>
              <th className="py-4 pr-5">Circuit</th>
              <th className="py-4 pr-5">Team</th>
              <th className="py-4 pr-5">Grid</th>
              <th className="py-4 pr-5">Result</th>
              <th className="py-4 pr-5">Time Gap To Winner</th>
              <th className="py-4 pr-5">Points</th>
              <th className="py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredRaces.map((race) => (
              <tr
                key={`${race.season}-${race.round}-${race.raceName}`}
                className="border-b border-[rgba(209,213,219,0.42)] font-syne text-sm text-[var(--text-secondary)] transition hover:bg-white/55 night-row"
              >
                <td className="py-4 pr-5 font-orbitron text-xs text-[var(--heading)]">{race.season}</td>
                <td className="py-4 pr-5">{race.round}</td>
                <td className="py-4 pr-5 font-barlow text-lg font-bold uppercase leading-5 text-[var(--heading)]">{race.raceName}</td>
                <td className="py-4 pr-5 leading-6">{race.circuit}</td>
                <td className="py-4 pr-5">{race.constructor}</td>
                <td className="py-4 pr-5">{race.grid}</td>
                <td className="py-4 pr-5">
                  <span className={`px-3 py-1 font-orbitron text-[10px] uppercase tracking-[0.18em] ${
                    race.positionOrder === 1
                      ? 'bg-[var(--accent)] text-white'
                      : race.positionOrder <= 3
                        ? 'bg-[rgba(var(--accent-rgb),0.14)] text-[var(--heading)]'
                        : 'bg-white/60 text-[var(--text-secondary)]'
                  }`}>
                    P{race.position}
                  </span>
                </td>
                <td className="py-4 pr-5 font-orbitron text-[10px] uppercase tracking-[0.16em] text-[var(--heading)]">
                  {formatGapToWinner(race)}
                </td>
                <td className="py-4 pr-5">{race.points}</td>
                <td className="py-4">{race.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

export default function Records() {
  const [view, setView] = useState<RecordsView>('dashboard');

  return (
    <section className="min-h-screen px-4 pb-24 pt-36 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end"
        >
          <div>
            <p className="font-orbitron text-xs uppercase tracking-[0.42em] text-[var(--accent)]">
              Records / Deep Dive Archive
            </p>
            <h1 className="mt-5 font-orbitron text-[clamp(3rem,8vw,7rem)] font-black leading-[0.86] text-[var(--heading)]">
              Telemetry
            </h1>
          </div>
          <p className="max-w-2xl font-syne text-base leading-8 text-[var(--text-secondary)]">
            Dashboard first, archive second: big counters, season trace, specialist stats, then every race result when you want to go forensic.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {view === 'dashboard' ? (
            <DashboardView onOpenArchive={() => setView('archive')} />
          ) : (
            <ArchiveView onBack={() => setView('dashboard')} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
