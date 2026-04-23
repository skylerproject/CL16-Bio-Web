import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import type { MotionStyle, MotionValue } from 'framer-motion';
import { useRef } from 'react';

// Image Assets - Timeline
import BabyCharlesRear from '../../assets/Leclerc Family Photo.jpg';
import BabyCharlesFront from '../../assets/Little Charles karting.png';
import CadetRear from '../../assets/Leclerc-Beginning-Slider-2009.jpg';
import CadetFront from '../../assets/Leclerc-Beginning-Slider-2010-a.jpg';
import EarlyYearsRear from '../../assets/Leclerc-Beginning-Slider-2012.jpg';
import F2GloryRear from '../../assets/CL F2 Champion.jpg';
import F2GloryFront from '../../assets/fia-f2-baku-2017-polesitter-charles-leclerc-prema-powerteam.jpg';
import WhiteLieRear from '../../assets/leclerc and herve.jpg';
import WhiteLieFront from '../../assets/CL & Herve.png';
import F1EntryRear from '../../assets/leclerc sauber.avif';
import F1EntryFront from '../../assets/charles-leclerc.webp';
import Monaco24Rear from '../../assets/Leclerc Monaco 2024.webp';
import Monaco24Front from '../../assets/leclerc-2024-monacogp-winner_f.webp';

// Other Assets
import HeroHelmet from '../../assets/helmet_2026.jpg';
import CelebrationBg from '../../assets/Leclerc Italy 2024.jpg';
import MonacoPodium from '../../assets/cl monaco gp celebration.webp';
import MonacoSalute from '../../assets/cl monaco gp win.webp';
import MonacoCurseEnd from '../../assets/leclerc-2024-monacogp-winner_f.webp';
import MonacoRollingBg from '../../assets/Leclerc Monaco GP win.jpg';
import MonacoHelmet from '../../assets/leclerc monaco helmet.webp';

// Gallery
import GalleryBelgium from '../../assets/Leclerc Belgium 2019.jpg';
import GalleryItaly19 from '../../assets/Leclerc Italy 2019.jpg';
import GalleryBahrain22 from '../../assets/Leclerc Bahrain 2022.jpg';
import GalleryAustralia22 from '../../assets/Leclerc Australia 2022.jpg';
import GalleryAustria22 from '../../assets/Leclerc Austria 2022.jpg';
import GalleryItaly24 from '../../assets/Leclerc Italy 2024.jpg';
import GalleryMonaco24 from '../../assets/Leclerc Monaco 2024.webp';
import GalleryUs24 from '../../assets/Leclerc US 2024.webp';
import GalleryMaxLec from '../../assets/Max & Lec.jpg';
import GalleryLewisCharles from '../../assets/Lewis-Hamilton-Charles-Leclerc-Ferrari-3.webp';
import GallerySf26Pair from '../../assets/SF26 LH & CL.webp';
import GalleryClMax from '../../assets/CL & Max.jpg';

// Personal
import WeddingA from '../../assets/leclerc wedding.jpg';
import WeddingB from '../../assets/lec wedding car.jpg';
import LeoDog from '../../assets/leo leclerc.webp';

const HERO_STATS = [
  { label: 'Starts', value: '174' },
  { label: 'Wins', value: '8' },
  { label: 'Podiums', value: '52' },
  { label: 'Titles', value: '0' },
];

type TimelineEvent = {
  eyebrow: string;
  year: string;
  title: string;
  desc: string;
  rear: string;
  rearImg: string;
  front: string;
  frontImg: string;
  tertiary?: string;
  tertiaryImg?: string;
  tone: 'rear' | 'front' | 'hero' | 'curse';
};

const TIMELINE: TimelineEvent[] = [
  {
    eyebrow: 'Baby Charles',
    year: '1997',
    title: 'Born in Monte Carlo',
    desc: 'Charles Marc Herve Perceval Leclerc was born on October 16, 1997, in Monte Carlo, Monaco. Before Ferrari red, before the number 16, there was a Monegasque kid growing up beside the streets that would later judge him hardest.',
    rear: 'Monte Carlo / first light',
    rearImg: BabyCharlesRear,
    front: 'October 16, 1997',
    frontImg: BabyCharlesFront,
    tone: 'rear' as const,
  },
  {
    eyebrow: 'Cadet Karting',
    year: '2009',
    title: 'French Cadet Champion',
    desc: 'In 2009, Charles won the French Cadet Karting Championship, a junior title that made the pattern visible early: clean hands, late braking, and a calm that did not look like a child simply enjoying speed.',
    rear: 'cadet karting trophy',
    rearImg: CadetRear,
    front: 'French Cadet Champion',
    frontImg: CadetFront,
    tone: 'front' as const,
  },
  {
    eyebrow: 'Early Years',
    year: '2012',
    title: 'Karting found Max',
    desc: 'Charles grew up in the same junior weather system as Max Verstappen. Their karting battles were not polite origin stories, they were brake markers, kerbs, and a rivalry learning its first language.',
    rear: 'karting archive / junior fire',
    rearImg: EarlyYearsRear,
    front: 'Charles vs Max / tiny margins',
    frontImg: GalleryClMax,
    tone: 'rear' as const,
  },
  {
    eyebrow: 'F2 Glory',
    year: '2017',
    title: 'Champion With a Heavy Heart',
    desc: 'The Formula 2 title arrived with ruthless speed and real grief. Charles kept winning while carrying the loss of his father, turning a junior championship into proof of nerve.',
    rear: 'F2 paddock gold',
    rearImg: F2GloryRear,
    front: 'Baku feature race memory',
    frontImg: F2GloryFront,
    tone: 'front' as const,
  },
  {
    eyebrow: 'The White Lie',
    year: '2017',
    title: 'For Herve',
    desc: 'Before Herve Leclerc died, Charles told him the Formula 1 seat was secured. It was not official yet. The lie was mercy, hope, and a son trying to give his father the ending he deserved.',
    rear: 'quiet hospital light',
    rearImg: WhiteLieRear,
    front: 'contract not signed yet',
    frontImg: WhiteLieFront,
    tone: 'curse' as const,
  },
  {
    eyebrow: 'F1 Entry',
    year: '2018',
    title: 'Sauber To Ferrari',
    desc: 'Sauber gave him the first canvas. Ferrari gave him the myth. By Spa and Monza 2019, the promise had become something the entire paddock had to treat as real.',
    rear: 'Ferrari red arrival',
    rearImg: F1EntryFront,
    front: 'white Sauber garage',
    frontImg: F1EntryRear,
    tone: 'hero' as const,
  },
  {
    eyebrow: 'First Victories',
    year: '2019',
    title: 'Belgium And Monza',
    desc: 'Spa gave him the first win. Monza made the Tifosi believe. Two weekends turned promise into permanence.',
    rear: 'Belgian Grand Prix victory',
    rearImg: GalleryBelgium,
    front: 'Italian Grand Prix victory',
    frontImg: GalleryItaly19,
    tone: 'front' as const,
  },
  {
    eyebrow: 'Ferrari Revival',
    year: '2022',
    title: 'Three Wins, Clear Pace',
    desc: 'Bahrain, Australia, and Austria showed the speed again. When the Ferrari was alive, Charles looked inevitable.',
    rear: 'Bahrain 2022',
    rearImg: GalleryBahrain22,
    front: 'Australia 2022',
    frontImg: GalleryAustralia22,
    tertiary: 'Austria 2022',
    tertiaryImg: GalleryAustria22,
    tone: 'hero' as const,
  },
  {
    eyebrow: 'Breaking The Curse',
    year: '2024',
    title: 'Monaco finally exhaled',
    desc: 'The home win was editorial in its restraint: pole, clean air, no melodrama. After so many cruel Monaco Sundays, Charles controlled the race and let the city breathe with him.',
    rear: 'Monaco harbour / pole control',
    rearImg: Monaco24Rear,
    front: 'we did it / for dad',
    frontImg: Monaco24Front,
    tone: 'curse' as const,
  },
  {
    eyebrow: 'New Era',
    year: '2026',
    title: 'Power Paired With History',
    desc: 'Since 2025, partnering with Lewis Hamilton has made Ferrari feel heavier with history and sharper with intent.',
    rear: 'Ferrari alliance / Hamilton + Leclerc',
    rearImg: GalleryLewisCharles,
    front: 'SF26 partnership',
    frontImg: GallerySf26Pair,
    tone: 'hero' as const,
  },
];

const NAV_HEIGHT_REM = 5.25;

function EditorialImage({
  label,
  imgSrc,
  className,
  style,
  tone,
  position = 'absolute',
  labelPosition = 'top',
}: {
  label: string;
  imgSrc?: string;
  className: string;
  style?: MotionStyle;
  tone: 'rear' | 'front' | 'hero' | 'curse';
  position?: 'absolute' | 'relative';
  labelPosition?: 'top' | 'bottom';
}) {
  const toneClass = {
    rear: 'from-[#F6F3EE] via-[#D1D5DB] to-[#001C40]',
    front: 'from-[var(--accent)] via-[#B7C4D7] to-[#001C40]',
    hero: 'from-[#001C40] via-[var(--accent)] to-[#F5F0E8]',
    curse: 'from-[#FF2800] via-[#FFE9DC] to-[#001C40]',
  }[tone];

  return (
    <motion.div
      className={`${position} overflow-hidden border border-white/70 bg-white shadow-[0_34px_100px_rgba(0,28,64,0.18)] night-image ${className}`}
      style={style}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${toneClass} opacity-14`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_32%_18%,rgba(255,255,255,0.52),transparent_24%),linear-gradient(115deg,transparent_0_36%,rgba(255,255,255,0.14)_36%_38%,transparent_38%)] opacity-40" />

      {imgSrc && (
        <img
          src={imgSrc}
          alt={label}
          className="absolute inset-0 h-full w-full object-cover opacity-100"
        />
      )}

      <div
        className={`absolute left-5 right-5 z-10 flex items-center justify-between gap-4 ${
          labelPosition === 'top' ? 'top-5' : 'bottom-5'
        }`}
      >
        <p className="max-w-[80%] bg-[rgba(0,28,64,0.56)] px-3 py-2 font-barlow text-xs font-bold uppercase tracking-[0.22em] text-white shadow-[0_10px_24px_rgba(0,0,0,0.22)] backdrop-blur-sm">
          {label}
        </p>
        <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
      </div>
    </motion.div>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden px-4 pt-32 sm:px-8 lg:px-12">
      <div className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <p className="font-orbitron text-xs uppercase tracking-[0.52em] text-[var(--accent)]">
            Target locked / Ferrari 16
          </p>
          <h1 className="mt-7 max-w-4xl font-orbitron text-[clamp(4.6rem,14vw,13.5rem)] font-black uppercase leading-[0.76] tracking-normal text-[var(--heading)]">
            CL16
          </h1>
          <h2 className="mt-5 max-w-3xl font-barlow text-[clamp(2.4rem,6vw,5.8rem)] font-bold uppercase leading-[0.84] tracking-normal text-[var(--accent)]">
            The Predestinato
          </h2>
          <p className="mt-7 max-w-xl font-syne text-base leading-8 text-[var(--text-secondary)]">
            Monaco daylight, Ferrari precision, and the kind of control that makes a qualifying lap feel composed before it becomes violent.
          </p>
          <div className="mt-10 grid max-w-xl grid-cols-3 border-y border-[var(--border)]">
            {[
              ['Nationality', 'Monegasque'],
              ['Team', 'Scuderia Ferrari'],
              ['Titles', '8 Race Wins'],
            ].map(([label, value]) => (
              <div key={label} className="grid min-h-[5.75rem] content-center border-r border-[var(--border)] px-3 py-4 text-center last:border-r-0">
                <p className="font-orbitron text-[10px] uppercase tracking-[0.48em] text-[var(--text-muted)]">
                  {label}
                </p>
                <p className="mt-1 font-barlow text-xl font-bold uppercase tracking-[0.1em] text-[var(--heading)]">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.12 }}
          className="relative min-h-[30rem] lg:min-h-[44rem]"
        >
          <div className="absolute inset-0 border border-[var(--border)] bg-white/35 backdrop-blur-sm night-panel" />
          <EditorialImage
            label="2026 helmet energy / Tag Heuer line"
            imgSrc={HeroHelmet}
            tone="hero"
            className="inset-x-6 bottom-8 top-8 lg:inset-x-10"
          />
          <div className="absolute left-8 top-8 h-24 w-24 border-l border-t border-[var(--accent)]" />
          <div className="absolute bottom-8 right-8 h-24 w-24 border-b border-r border-[var(--accent)]" />
          <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_26px_rgba(var(--accent-rgb),0.85)]" />
          <p className="absolute right-8 top-8 font-orbitron text-[10px] uppercase tracking-[0.26em] text-white">
            Absolute control
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function TransitionStats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-120px' });

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-24 sm:px-8 lg:px-12">
      <div className="absolute inset-0">
        <EditorialImage
          label="celebration blended field"
          imgSrc={CelebrationBg}
          tone="curse"
          className="inset-x-0 top-0 h-full opacity-40"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--bg-primary),rgba(255,255,255,0.42)_28%,rgba(255,255,255,0.76)_68%,var(--bg-primary))] night-soft-mask" />
      </div>
      <div className="relative mx-auto max-w-7xl">
        <p className="font-orbitron text-xs uppercase tracking-[0.42em] text-[var(--accent)]">
          Transition stats
        </p>
        <div className="mt-8 grid gap-px bg-[var(--border)] md:grid-cols-4">
          {HERO_STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ delay: index * 0.12, duration: 0.55 }}
              className="bg-white/68 p-7 backdrop-blur-sm night-panel"
            >
              <p className="font-orbitron text-[10px] uppercase tracking-[0.3em] text-[var(--text-secondary)]">
                {stat.label}
              </p>
              <p className="mt-4 font-orbitron text-[clamp(3.4rem,8vw,7rem)] font-black leading-none text-[var(--heading)]">
                {stat.value}
              </p>
            </motion.div>
          ))}
        </div>
        <p className="mt-4 max-w-xl font-syne text-xs text-[var(--text-muted)]">
          Career numbers use the official Formula 1 driver profile as of April 21, 2026.
        </p>
      </div>
    </section>
  );
}

function MindThatSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const textX = useTransform(scrollYProgress, [0, 1], ['58vw', '-325vw']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);
  const imageY = useTransform(scrollYProgress, [0, 1], ['-7vh', '7vh']);
  const stripesY = useTransform(scrollYProgress, [0, 1], ['0vh', '-10vh']);
  const glowX = useTransform(scrollYProgress, [0, 1], ['-6vw', '8vw']);

  return (
    <section ref={sectionRef} className="relative h-[320vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#07111f]">
        <motion.div
          className="absolute inset-0"
          style={{ scale: imageScale, y: imageY }}
        >
          <img
            src={MonacoRollingBg}
            alt="Leclerc Monaco GP win"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-[0.38]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,17,31,0.9),rgba(7,17,31,0.48),rgba(7,17,31,0.88)),linear-gradient(125deg,#101b2d,#56616d_42%,#0b1320)]" />
          <motion.div
            className="absolute inset-0 bg-[linear-gradient(100deg,transparent_0_28%,rgba(255,255,255,0.13)_28%_30%,transparent_30%_54%,rgba(255,255,255,0.08)_54%_55%,transparent_55%)]"
            style={{ y: stripesY }}
          />
          <motion.div
            className="absolute top-[26%] h-[30%] w-[52%] bg-[rgba(var(--accent-rgb),0.24)] blur-3xl"
            style={{ x: glowX }}
          />
        </motion.div>

        <div className="absolute inset-0 bg-[rgba(0,0,0,0.18)]" />

        <motion.h2
          className="absolute top-1/2 z-10 whitespace-nowrap font-orbitron text-[clamp(5rem,15vw,16rem)] font-black italic uppercase leading-none tracking-normal text-white"
          style={{ x: textX, y: '-50%' }}
        >
          It&apos;s Not Luck, It&apos;s Pure Talent
        </motion.h2>
      </div>
    </section>
  );
}

function TimelineSlide({
  event,
  index,
  progress,
}: {
  event: (typeof TIMELINE)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const start = Math.max(0, (index - 0.75) / (TIMELINE.length - 1));
  const center = index / (TIMELINE.length - 1);
  const end = Math.min(1, (index + 0.75) / (TIMELINE.length - 1));
  const rearX = useTransform(progress, [start, center, end], ['4vw', '-2vw', '-12vw']);
  const frontX = useTransform(progress, [start, center, end], ['14vw', '0vw', '-18vw']);
  const tertiaryX = useTransform(progress, [start, center, end], ['18vw', '6vw', '-12vw']);
  const textY = useTransform(progress, [start, center, end], ['3vh', '0vh', '-3vh']);
  const is2022 = event.year === '2022';

  return (
    <article className="relative grid h-[calc(100vh-5.25rem)] min-h-[43rem] w-screen flex-none overflow-hidden px-6 py-16 sm:px-10 lg:grid-cols-[0.86fr_1.14fr] lg:px-16">
      <motion.div className="relative z-20 flex max-w-2xl flex-col justify-center" style={{ y: textY }}>
        <p className="accent-label font-orbitron text-[10px] uppercase tracking-[0.42em] text-[var(--accent)]">
          {String(index + 1).padStart(2, '0')} / {event.eyebrow}
        </p>
        <h2 className="mt-8 font-orbitron text-[clamp(5rem,15vw,13rem)] font-black leading-[0.72] tracking-normal text-[var(--heading)]">
          {event.year}
        </h2>
        <h3 className="mt-7 font-barlow text-[clamp(2.2rem,5vw,5rem)] font-bold uppercase leading-[0.86] tracking-normal text-[var(--heading)]">
          {event.title}
        </h3>
        <p className="mt-6 max-w-xl font-syne text-base leading-8 text-[var(--text-secondary)]">
          {event.desc}
        </p>
      </motion.div>

      <div className="absolute inset-y-0 right-0 z-10 w-full lg:w-[62%]">
        <EditorialImage
          label={event.rear}
          imgSrc={event.rearImg}
          tone={event.tone}
          className="right-[2%] top-[10%] h-[48%] w-[68%] shadow-[0_24px_64px_rgba(0,28,64,0.26)]"
          style={{ x: rearX }}
        />
        <EditorialImage
          label={event.front}
          imgSrc={event.frontImg}
          tone={event.tone === 'rear' ? 'front' : event.tone}
          className={is2022
            ? 'bottom-[10%] right-[2%] h-[42%] w-[56%] shadow-[0_28px_72px_rgba(0,28,64,0.3)]'
            : 'bottom-[10%] right-[10%] h-[40%] w-[52%] shadow-[0_28px_72px_rgba(0,28,64,0.3)]'}
          style={{ x: frontX }}
        />
        {event.tertiary && event.tertiaryImg ? (
          <EditorialImage
            label={event.tertiary}
            imgSrc={event.tertiaryImg}
            tone="front"
            className={is2022
              ? 'bottom-[6%] right-[48%] h-[24%] w-[28%] shadow-[0_24px_60px_rgba(0,28,64,0.24)]'
              : 'bottom-[8%] right-[32%] h-[24%] w-[24%] shadow-[0_24px_60px_rgba(0,28,64,0.24)]'}
            style={{ x: tertiaryX }}
          />
        ) : null}
      </div>
    </article>
  );
}

function StickyScrollTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0vw', `-${(TIMELINE.length - 1) * 100}vw`],
  );
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      ref={sectionRef}
      className="relative isolate border-y border-[var(--border)] bg-white/42 night-panel"
      style={{ height: `calc(${TIMELINE.length * 100}vh - ${TIMELINE.length * NAV_HEIGHT_REM}rem)` }}
    >
      <div className="sticky top-[84px] h-[calc(100vh-5.25rem)] overflow-hidden">
        <div className="absolute inset-x-0 top-0 z-30 h-1 bg-[rgba(0,28,64,0.08)]">
          <motion.div className="h-full bg-[var(--accent)]" style={{ width }} />
        </div>
        <motion.div className="flex h-full will-change-transform" style={{ x }}>
          {TIMELINE.map((event, index) => (
            <TimelineSlide
              key={`${event.year}-${event.title}`}
              event={event}
              index={index}
              progress={scrollYProgress}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function BreakingTheCurse() {
  return (
    <section className="px-4 py-28 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.75 }}
        >
          <div className="mb-8 flex items-center gap-4">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
            <span className="h-px w-28 bg-[var(--accent)]" />
            <p className="accent-label font-orbitron text-[10px] uppercase tracking-[0.36em] text-[var(--accent)]">
              Monaco 2024 / Editorial grid
            </p>
          </div>
          <h2 className="editorial-serif text-[clamp(3.6rem,8vw,8.5rem)] leading-[0.82] tracking-normal text-[var(--heading)]">
            We did it.
            <span className="block">For Dad.</span>
            <span className="block">For Jules.</span>
          </h2>
          <p className="mt-8 max-w-xl font-syne text-base leading-8 text-[var(--text-secondary)]">
            Monaco 2024 was not treated like a special effect. It was clean, patient, and almost unbearably simple: pole, control, release.
          </p>
        </motion.div>

        <div className="grid grid-cols-6 gap-3">
          <EditorialImage
            label="Monaco 2024 podium"
            imgSrc={MonacoPodium}
            tone="curse"
            position="relative"
            className="col-span-6 h-72 sm:col-span-3 sm:h-96"
          />
          <EditorialImage
            label="Harbour salute"
            imgSrc={MonacoCurseEnd}
            tone="front"
            position="relative"
            className="col-span-3 h-56 sm:col-span-3 sm:h-96"
          />
          <EditorialImage
            label="Ferrari red line"
            imgSrc={MonacoHelmet}
            tone="rear"
            position="relative"
            className="col-span-3 h-56 sm:col-span-3 sm:h-64"
          />
          <EditorialImage
            label="The curse ends"
            imgSrc={MonacoSalute}
            tone="hero"
            position="relative"
            className="col-span-6 h-56 sm:col-span-3 sm:h-64"
          />
        </div>
      </div>
    </section>
  );
}

function ParallaxGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const leftY = useTransform(scrollYProgress, [0, 1], ['8rem', '-10rem']);
  const centerY = useTransform(scrollYProgress, [0, 1], ['-6rem', '10rem']);
  const rightY = useTransform(scrollYProgress, [0, 1], ['10rem', '-8rem']);

  const placeholders = [
    ['Leclerc BELGIUM 2019', 'h-72 sm:h-96', leftY, GalleryBelgium],
    ['Leclerc ITALY 2019', 'h-96 sm:h-[34rem]', centerY, GalleryItaly19],
    ['Leclerc BAHRAIN 2022', 'h-72 sm:h-[30rem]', rightY, GalleryBahrain22],
    ['Leclerc AUSTRALIA 2022', 'h-80 sm:h-[28rem]', leftY, GalleryAustralia22],
    ['Leclerc AUSTRIA 2022', 'h-72 sm:h-96', centerY, GalleryAustria22],
    ['Leclerc ITALY 2024', 'h-96 sm:h-[32rem]', rightY, GalleryItaly24],
    ['Leclerc MONACO 2024', 'h-80 sm:h-[30rem]', leftY, GalleryMonaco24],
    ['Leclerc US 2024', 'h-72 sm:h-[28rem]', centerY, GalleryUs24],
    ['Max & Lec Celebration', 'h-80 sm:h-[30rem]', rightY, GalleryMaxLec],
  ] as const;

  return (
    <section ref={sectionRef} className="relative overflow-hidden px-4 py-28 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center gap-4">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          <span className="h-px w-28 bg-[var(--accent)]" />
          <p className="accent-label font-orbitron text-[10px] uppercase tracking-[0.36em] text-[var(--accent)]">
            Image gallery
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {placeholders.map(([label, heightClass, y, imgSrc], index) => (
            <motion.div
              key={label}
              className={`relative overflow-hidden border border-[var(--border)] bg-[rgba(255,255,255,0.46)] ${heightClass} night-panel`}
              style={{ y }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(var(--accent-rgb),0.12),transparent_42%,rgba(0,28,64,0.16)),repeating-linear-gradient(90deg,rgba(0,28,64,0.05)_0_1px,transparent_1px_42px)]" />

              {imgSrc && (
                <img
                  src={imgSrc}
                  alt={label}
                  className="absolute inset-0 h-full w-full object-cover opacity-100"
                />
              )}

              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,28,64,0.12),transparent_44%)]" />
              <p className="absolute left-5 top-5 bg-[rgba(255,255,255,0.82)] px-3 py-2 font-orbitron text-[10px] uppercase tracking-[0.28em] text-[var(--heading)] shadow-[0_10px_24px_rgba(0,28,64,0.14)]">
                {String(index + 1).padStart(2, '0')} / {label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WeddingAndLeo() {
  return (
    <section className="px-4 pb-28 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-7xl gap-px bg-[var(--border)] lg:grid-cols-3">
        {[
          {
            label: 'The Wedding / Part A',
            title: 'The Celebration',
            image: 'Wedding celebration',
            imgSrc: WeddingA,
            desc: 'With Alexandra Saint Mleux, the public image becomes lighter: composed, elegant, and deliberately unshowy. The mood is Monaco evening rather than paddock spotlight.',
          },
          {
            label: 'The Wedding / Part B',
            title: 'The Ferrari 250 Testa Rossa',
            image: 'Ferrari 250 Testa Rossa',
            imgSrc: WeddingB,
            desc: 'The car choice signals timeless design, racing history, and a very Ferrari kind of romance: elegant, rare, and tied to Maranello memory.',
          },
          {
            label: 'Leo Leclerc',
            title: 'The small star of the paddock',
            image: 'Leo Leclerc',
            imgSrc: LeoDog,
            desc: 'Leo turns the mythology human. The dog, the quiet posts, the little domestic detail: all of it lets the perfectionist look less distant.',
          },
        ].map((item) => (
          <article key={item.label} className="bg-white/70 p-7 backdrop-blur-sm night-panel sm:p-9">
            <div className="relative mb-7 h-64 overflow-hidden border border-[var(--border)] bg-[rgba(255,255,255,0.44)]">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(var(--accent-rgb),0.16),transparent_46%,rgba(0,28,64,0.18)),repeating-linear-gradient(90deg,rgba(0,28,64,0.05)_0_1px,transparent_1px_38px)]" />

              {item.imgSrc && (
                <img
                  src={item.imgSrc}
                  alt={item.image}
                  className="absolute inset-0 h-full w-full object-cover opacity-100"
                />
              )}

              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,28,64,0.14),transparent_48%)]" />
              <p className="absolute left-5 right-5 top-5 font-orbitron text-[10px] uppercase tracking-[0.26em] text-white drop-shadow-[0_8px_18px_rgba(0,0,0,0.4)]">
                {item.image}
              </p>
            </div>
            <p className="accent-label font-orbitron text-[10px] uppercase tracking-[0.34em] text-[var(--accent)]">
              {item.label}
            </p>
            <h3 className="mt-5 font-barlow text-3xl font-bold uppercase leading-[0.94] tracking-normal text-[var(--heading)]">
              {item.title}
            </h3>
            <p className="mt-5 font-syne text-sm leading-7 text-[var(--text-secondary)]">
              {item.desc}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function LeclercSummary({ onExploreRecords }: { onExploreRecords?: () => void }) {
  return (
    <section className="px-4 py-28 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center gap-4">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          <span className="h-px w-28 bg-[var(--accent)]" />
          <p className="accent-label font-orbitron text-[10px] uppercase tracking-[0.36em] text-[var(--accent)]">
            The Summary
          </p>
        </div>

        <div className="grid gap-10 border-y border-[var(--border)] py-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <h2 className="font-orbitron text-[clamp(3.1rem,7vw,7.4rem)] font-black uppercase leading-[0.88] tracking-normal text-[var(--heading)]">
            The Prince.
            <span className="block text-[var(--accent)]">The Pianist.</span>
            <span className="block">The Winner.</span>
          </h2>

          <div className="max-w-2xl">
            <p className="font-syne text-base leading-8 text-[var(--text-secondary)]">
              Charles Leclerc is Monaco myth, Ferrari pressure, piano discipline, and race-winning instinct in one story. The soft edges matter as much as the speed: the family grief, the elegance, Leo, Alexandra, and the quiet obsession behind every lap.
            </p>
            <button
              onClick={onExploreRecords}
              className="mt-8 border border-[var(--heading)] bg-[var(--heading)] px-6 py-4 font-barlow text-sm font-bold uppercase tracking-[0.24em] text-white transition hover:border-[var(--accent)] hover:bg-[var(--accent)]"
            >
              Click here to find out more
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Bio({ onExploreRecords }: { onExploreRecords?: () => void }) {
  return (
    <>
      <HeroSection />
      <TransitionStats />
      <MindThatSection />
      <StickyScrollTimeline />
      <BreakingTheCurse />
      <ParallaxGallery />
      <WeddingAndLeo />
      <LeclercSummary onExploreRecords={onExploreRecords} />
    </>
  );
}
