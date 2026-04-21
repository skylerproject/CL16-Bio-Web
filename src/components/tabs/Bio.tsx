import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import type { MotionStyle, MotionValue } from 'framer-motion';
import { useRef } from 'react';

const HERO_STATS = [
  { label: 'Starts', value: '174' },
  { label: 'Wins', value: '8' },
  { label: 'Podiums', value: '52' },
  { label: 'Titles', value: '0' },
];

const TIMELINE = [
  {
    eyebrow: 'Baby Charles',
    year: '1997',
    title: 'Born in Monte Carlo',
    desc: 'Charles Marc Herve Perceval Leclerc was born on October 16, 1997, in Monte Carlo, Monaco. Before Ferrari red, before the number 16, there was a Monegasque kid growing up beside the streets that would later judge him hardest.',
    rear: 'Monte Carlo / first light',
    front: 'October 16, 1997',
    tone: 'rear' as const,
  },
  {
    eyebrow: 'Cadet Karting',
    year: '2009',
    title: 'French Cadet Champion',
    desc: 'In 2009, Charles won the French Cadet Karting Championship, a junior title that made the pattern visible early: clean hands, late braking, and a calm that did not look like a child simply enjoying speed.',
    rear: 'cadet karting trophy',
    front: 'French Cadet Champion',
    tone: 'front' as const,
  },
  {
    eyebrow: 'Early Years',
    year: '2012',
    title: 'Karting found Max',
    desc: 'Charles grew up in the same junior weather system as Max Verstappen. Their karting battles were not polite origin stories, they were brake markers, kerbs, and a rivalry learning its first language.',
    rear: 'karting archive / junior fire',
    front: 'Charles vs Max / tiny margins',
    tone: 'rear' as const,
  },
  {
    eyebrow: 'F2 Glory',
    year: '2017',
    title: 'Champion With a Heavy Heart',
    desc: 'The Formula 2 title arrived with ruthless speed and real grief. Charles kept winning while carrying the loss of his father, turning a junior championship into proof of nerve.',
    rear: 'F2 paddock gold',
    front: 'Baku feature race memory',
    tone: 'front' as const,
  },
  {
    eyebrow: 'The White Lie',
    year: '2017',
    title: 'For Herve',
    desc: 'Before Herve Leclerc died, Charles told him the Formula 1 seat was secured. It was not official yet. The lie was mercy, hope, and a son trying to give his father the ending he deserved.',
    rear: 'quiet hospital light',
    front: 'contract not signed yet',
    tone: 'curse' as const,
  },
  {
    eyebrow: 'F1 Entry',
    year: '2018',
    title: 'Sauber To Ferrari',
    desc: 'Sauber gave him the first canvas. Ferrari gave him the myth. By Spa and Monza 2019, the promise had become something the entire paddock had to treat as real.',
    rear: 'white Sauber garage',
    front: 'Ferrari red arrival',
    tone: 'hero' as const,
  },
  {
    eyebrow: 'Breaking The Curse',
    year: '2024',
    title: 'Monaco finally exhaled',
    desc: 'The home win was editorial in its restraint: pole, clean air, no melodrama. After so many cruel Monaco Sundays, Charles controlled the race and let the city breathe with him.',
    rear: 'Monaco harbour / pole control',
    front: 'we did it / for dad',
    tone: 'curse' as const,
  },
];

const NAV_HEIGHT_REM = 5.25;

function EditorialImage({
  label,
  className,
  style,
  tone,
  position = 'absolute',
}: {
  label: string;
  className: string;
  style?: MotionStyle;
  tone: 'rear' | 'front' | 'hero' | 'curse';
  position?: 'absolute' | 'relative';
}) {
  const toneClass = {
    rear: 'from-[#F6F3EE] via-[#D1D5DB] to-[#001C40]',
    front: 'from-[var(--accent)] via-[#B7C4D7] to-[#001C40]',
    hero: 'from-[#001C40] via-[var(--accent)] to-[#F5F0E8]',
    curse: 'from-[#FF2800] via-[#FFE9DC] to-[#001C40]',
  }[tone];

  return (
    <motion.div
      className={`${position} overflow-hidden border border-white/70 bg-white shadow-[0_34px_100px_rgba(0,28,64,0.18)] mix-blend-multiply night-image ${className}`}
      style={style}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${toneClass}`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_32%_18%,rgba(255,255,255,0.92),transparent_24%),linear-gradient(115deg,transparent_0_36%,rgba(255,255,255,0.22)_36%_38%,transparent_38%)]" />
      <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40" />
      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4">
        <p className="font-barlow text-xs font-bold uppercase tracking-[0.22em] text-white">{label}</p>
        <span className="h-2 w-2 rounded-full bg-white" />
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
            {['Brake', 'Apex', 'Exit'].map((item) => (
              <div key={item} className="grid min-h-[5.75rem] content-center border-r border-[var(--border)] px-3 py-4 text-center last:border-r-0">
                <p className="font-orbitron text-[10px] uppercase tracking-[0.48em] text-[var(--text-muted)]">
                  {item}
                </p>
                <p className="mt-1 font-barlow text-xl font-bold uppercase tracking-[0.1em] text-[var(--heading)]">
                  Locked
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
            tone="hero"
            className="inset-x-6 bottom-8 top-8 lg:inset-x-10"
          />
          <div className="absolute left-8 top-8 h-24 w-24 border-l border-t border-[var(--accent)]" />
          <div className="absolute bottom-8 right-8 h-24 w-24 border-b border-r border-[var(--accent)]" />
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/65" />
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
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  return (
    <section ref={sectionRef} className="relative h-[320vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#07111f]">
        <motion.div
          className="absolute inset-0"
          style={{ scale: imageScale }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,17,31,0.92),rgba(7,17,31,0.54),rgba(7,17,31,0.92)),radial-gradient(circle_at_63%_42%,rgba(var(--accent-rgb),0.5),transparent_24rem),linear-gradient(125deg,#101b2d,#56616d_42%,#0b1320)]" />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,transparent_0_28%,rgba(255,255,255,0.16)_28%_30%,transparent_30%_54%,rgba(255,255,255,0.09)_54%_55%,transparent_55%)]" />
          <div className="absolute inset-x-0 top-[28%] h-[28%] bg-[rgba(var(--accent-rgb),0.28)] blur-3xl" />
        </motion.div>

        <div className="absolute inset-0 bg-[rgba(0,0,0,0.34)]" />

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
  const textY = useTransform(progress, [start, center, end], ['3vh', '0vh', '-3vh']);

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
          tone={event.tone}
          className="right-[4%] top-[12%] h-[46%] w-[66%]"
          style={{ x: rearX }}
        />
        <EditorialImage
          label={event.front}
          tone={event.tone === 'rear' ? 'front' : event.tone}
          className="bottom-[12%] right-[16%] h-[38%] w-[48%]"
          style={{ x: frontX }}
        />
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
            tone="curse"
            position="relative"
            className="col-span-6 h-72 sm:col-span-4 sm:h-96"
          />
          <EditorialImage
            label="Harbour salute"
            tone="front"
            position="relative"
            className="col-span-3 h-56 sm:col-span-2 sm:h-96"
          />
          <EditorialImage
            label="Ferrari red line"
            tone="rear"
            position="relative"
            className="col-span-3 h-56 sm:col-span-3 sm:h-64"
          />
          <EditorialImage
            label="The curse ends"
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
    ['Gallery blank 01', 'h-72 sm:h-96', leftY],
    ['Gallery blank 02', 'h-96 sm:h-[34rem]', centerY],
    ['Gallery blank 03', 'h-72 sm:h-[30rem]', rightY],
    ['Gallery blank 04', 'h-80 sm:h-[28rem]', leftY],
    ['Gallery blank 05', 'h-72 sm:h-96', centerY],
    ['Gallery blank 06', 'h-96 sm:h-[32rem]', rightY],
  ] as const;

  return (
    <section ref={sectionRef} className="relative overflow-hidden px-4 py-28 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center gap-4">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          <span className="h-px w-28 bg-[var(--accent)]" />
          <p className="accent-label font-orbitron text-[10px] uppercase tracking-[0.36em] text-[var(--accent)]">
            Image gallery / replace blanks later
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {placeholders.map(([label, heightClass, y], index) => (
            <motion.div
              key={label}
              className={`relative overflow-hidden border border-[var(--border)] bg-[rgba(255,255,255,0.46)] ${heightClass} night-panel`}
              style={{ y }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(var(--accent-rgb),0.12),transparent_42%,rgba(0,28,64,0.16)),repeating-linear-gradient(90deg,rgba(0,28,64,0.05)_0_1px,transparent_1px_42px)]" />
              <div className="absolute inset-6 border border-dashed border-[var(--border)]" />
              <p className="absolute bottom-5 left-5 font-orbitron text-[10px] uppercase tracking-[0.28em] text-[var(--text-secondary)]">
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
            image: 'wedding celebration image placeholder',
            desc: 'With Alexandra Saint Mleux, the public image becomes lighter: composed, elegant, and deliberately unshowy. The mood is Monaco evening rather than paddock spotlight.',
          },
          {
            label: 'The Wedding / Part B',
            title: 'The Ferrari 250 Testa Rossa',
            image: 'Ferrari 250 Testa Rossa image placeholder',
            desc: 'The car choice signals timeless design, racing history, and a very Ferrari kind of romance: elegant, rare, and tied to Maranello memory.',
          },
          {
            label: 'Leo Leclerc',
            title: 'The small star of the paddock',
            image: 'Leo Leclerc image placeholder',
            desc: 'Leo turns the mythology human. The dog, the quiet posts, the little domestic detail: all of it lets the perfectionist look less distant.',
          },
        ].map((item) => (
          <article key={item.label} className="bg-white/70 p-7 backdrop-blur-sm night-panel sm:p-9">
            <div className="relative mb-7 h-64 overflow-hidden border border-[var(--border)] bg-[rgba(255,255,255,0.44)]">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(var(--accent-rgb),0.16),transparent_46%,rgba(0,28,64,0.18)),repeating-linear-gradient(90deg,rgba(0,28,64,0.05)_0_1px,transparent_1px_38px)]" />
              <div className="absolute inset-5 border border-dashed border-[var(--border)]" />
              <p className="absolute bottom-5 left-5 right-5 font-orbitron text-[10px] uppercase tracking-[0.26em] text-[var(--text-secondary)]">
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
