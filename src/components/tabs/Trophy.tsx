import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

// Celebration Images
import WinBelgium19 from '../../assets/Leclerc Belgium 2019.jpg';
import WinItaly19 from '../../assets/Leclerc Italy 2019.jpg';
import WinBahrain22 from '../../assets/Leclerc Bahrain 2022.jpg';
import WinAustralia22 from '../../assets/Leclerc Australia 2022.jpg';
import WinAustria22 from '../../assets/Leclerc Austria 2022.jpg';
import WinMonaco24 from '../../assets/Leclerc Monaco 2024.webp';
import WinItaly24 from '../../assets/Leclerc Italy 2024.jpg';
import WinUS24 from '../../assets/Leclerc US 2024.webp';

const WINS = [
  {
    gp: 'Belgian Grand Prix',
    year: 2019,
    location: 'Spa-Francorchamps',
    quote: 'For Anthoine. The first one will always carry him.',
    palette: 'from-sky-200 via-slate-500 to-[#001C40]',
    imgSrc: WinBelgium19,
    span: 'lg:col-span-2 lg:row-span-2',
  },
  {
    gp: 'Italian Grand Prix',
    year: 2019,
    location: 'Autodromo Nazionale Monza',
    quote: 'A dream. The Tifosi made the final laps feel endless.',
    palette: 'from-red-500 via-[#FF2800] to-stone-900',
    imgSrc: WinItaly19,
    span: '',
  },
  {
    gp: 'Bahrain Grand Prix',
    year: 2022,
    location: 'Bahrain International Circuit',
    quote: 'Ferrari is back, and the desert lights are red.',
    palette: 'from-amber-200 via-orange-500 to-red-950',
    imgSrc: WinBahrain22,
    span: '',
  },
  {
    gp: 'Australian Grand Prix',
    year: 2022,
    location: 'Albert Park Circuit',
    quote: 'Grand slam energy: pole, win, fastest lap, total command.',
    palette: 'from-emerald-200 via-sky-500 to-blue-950',
    imgSrc: WinAustralia22,
    span: 'lg:row-span-2',
  },
  {
    gp: 'Austrian Grand Prix',
    year: 2022,
    location: 'Red Bull Ring',
    quote: 'Throttle problem, pressure everywhere, still P1.',
    palette: 'from-rose-200 via-red-500 to-zinc-950',
    imgSrc: WinAustria22,
    span: '',
  },
  {
    gp: 'Monaco Grand Prix',
    year: 2024,
    location: 'Circuit de Monaco',
    quote: 'YES! YES! YES! Grazie mille Scuderia!',
    palette: 'from-yellow-100 via-cyan-400 to-[#001C40]',
    imgSrc: WinMonaco24,
    span: 'lg:col-span-2 lg:row-span-2',
  },
  {
    gp: 'Italian Grand Prix',
    year: 2024,
    location: 'Autodromo Nazionale Monza',
    quote: 'Monza again. One stop, giant nerve, red smoke everywhere.',
    palette: 'from-white via-[#FF2800] to-emerald-950',
    imgSrc: WinItaly24,
    span: '',
  },
  {
    gp: 'United States Grand Prix',
    year: 2024,
    location: 'Circuit of the Americas',
    quote: 'Austin turned into a scarlet Sunday.',
    palette: 'from-blue-200 via-red-500 to-indigo-950',
    imgSrc: WinUS24,
    span: '',
  },
];

function WinCard({ win, index }: { win: (typeof WINS)[number]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.06, duration: 0.55 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative min-h-[17rem] overflow-hidden rounded-[2.2rem] border border-white/65 bg-white/60 shadow-[0_28px_80px_rgba(0,28,64,0.12)] backdrop-blur-2xl ${win.span}`}
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0">
        <img
          src={win.imgSrc}
          alt={win.gp}
          className="h-full w-full object-cover opacity-[0.82] saturate-[1.08] transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className={`absolute inset-0 bg-gradient-to-br ${win.palette} opacity-[0.18]`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(255,255,255,0.24),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.14),transparent_18%)] opacity-60" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#001C40]/78 via-[#001C40]/24 to-transparent" />
      <div className="absolute bottom-8 right-8 font-orbitron text-[7rem] font-black leading-none text-white/10">
        P1
      </div>

      <div className="relative z-10 flex h-full min-h-[17rem] flex-col justify-between p-6">
        <div className="flex items-start justify-between gap-4">
          <span className="rounded-full border border-white/45 bg-white/25 px-3 py-1 font-orbitron text-[10px] uppercase tracking-[0.24em] text-white backdrop-blur-xl">
            {win.year}
          </span>
          <span className="font-orbitron text-xs font-black text-white/85">#{String(index + 1).padStart(2, '0')}</span>
        </div>

        <div>
          <p className="font-syne text-xs uppercase tracking-[0.26em] text-white/70">{win.location}</p>
          <h2 className="mt-2 max-w-md font-barlow text-4xl font-bold uppercase leading-none text-white">
            {win.gp}
          </h2>
        </div>
      </div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex flex-col justify-end bg-[#001C40]/78 p-6 text-white backdrop-blur-xl"
          >
            <p className="font-orbitron text-[10px] uppercase tracking-[0.32em] text-[var(--accent)]">
              Metadata hover
            </p>
            <h3 className="mt-3 font-barlow text-3xl font-bold uppercase">{win.gp}</h3>
            <p className="mt-1 font-syne text-sm text-white/70">
              {win.year} / {win.location}
            </p>
            <p className="mt-5 max-w-md font-syne text-base leading-7">"{win.quote}"</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default function Trophy() {
  return (
    <section className="min-h-screen px-4 pb-24 pt-36 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-end"
        >
          <div>
            <p className="font-orbitron text-xs uppercase tracking-[0.42em] text-[var(--accent)]">
              Trophy / Rich Hall of Fame
            </p>
            <h1 className="mt-5 font-orbitron text-[clamp(3rem,8vw,7rem)] font-black leading-[0.86] text-[var(--heading)]">
              8 Race Wins
            </h1>
          </div>
          <p className="max-w-2xl font-syne text-base leading-8 text-[var(--text-secondary)]">
            The masonry wall keeps the celebration-photo energy while using safe editorial visual panels. Hover any tile for race metadata and a memory line.
          </p>
        </motion.div>

        <div className="grid auto-rows-[17rem] gap-4 md:grid-cols-2 lg:grid-cols-4">
          {WINS.map((win, index) => (
            <WinCard key={`${win.gp}-${win.year}-${win.location}`} win={win} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
