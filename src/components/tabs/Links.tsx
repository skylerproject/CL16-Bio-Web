import { motion } from 'framer-motion';

const LINKS = [
  {
    title: 'Instagram',
    eyebrow: 'Social',
    href: 'https://www.instagram.com/charles_leclerc/',
    mark: 'IG',
    desc: 'Race weekends, Leo cameos, Monaco light, and the occasional piano moment.',
  },
  {
    title: 'X',
    eyebrow: 'Social',
    href: 'https://x.com/Charles_Leclerc',
    mark: 'X',
    desc: 'Fast updates and short-form paddock signal.',
  },
  {
    title: 'Twitch',
    eyebrow: 'Social',
    href: 'https://www.twitch.tv/charlesleclerc',
    mark: 'TV',
    desc: 'The lockdown-era chaos channel. Still canon in CL16 lore.',
  },
  {
    title: 'Official Store',
    eyebrow: 'Merchandise',
    href: 'https://shop.charlesleclerc.com/',
    mark: 'ST',
    desc: 'Official Charles Leclerc merchandise and CL16 apparel drops.',
  },
  {
    title: 'Lec2 / CL16 Apparel',
    eyebrow: 'Projects',
    href: 'https://shop.charlesleclerc.com/',
    mark: '16',
    desc: 'A clean route to the lifestyle collection while the brand naming keeps evolving.',
  },
  {
    title: 'Monegasque Melodies',
    eyebrow: 'Music',
    href: 'https://open.spotify.com/search/Charles%20Leclerc',
    mark: 'PI',
    desc: 'Piano pieces and Dreamers-era compositions on Spotify search.',
  },
  {
    title: 'YouTube',
    eyebrow: 'Music and Vlogs',
    href: 'https://www.youtube.com/@CharlesLeclerc',
    mark: 'YT',
    desc: 'Longer race-weekend films, music-adjacent moments, and behind-the-scenes edits.',
  },
  {
    title: 'LEC Ice Cream',
    eyebrow: 'Food Project',
    href: 'https://lec.it/',
    mark: 'LC',
    desc: 'The light gelato project: pistachio, salted caramel, vanilla, chocolate, and more.',
  },
];

export default function Links() {
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
              Links / Frosted Grid
            </p>
            <h1 className="mt-5 font-orbitron text-[clamp(3rem,8vw,7rem)] font-black leading-[0.86] text-[var(--heading)]">
              Paddock Portal
            </h1>
          </div>
          <p className="max-w-2xl font-syne text-base leading-8 text-[var(--text-secondary)]">
            Socials, official merchandise, music, and projects collected as Monaco-grade frosted glass cards.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {LINKS.map((link, index) => (
            <motion.a
              key={link.title}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.055, duration: 0.46 }}
              className="group relative min-h-[17rem] overflow-hidden rounded-[2.15rem] border border-[var(--border)] bg-[var(--card-bg)] p-6 shadow-[0_28px_80px_rgba(0,28,64,0.10)] backdrop-blur-3xl transition duration-300 hover:-translate-y-1 hover:border-[rgba(var(--accent-rgb),0.45)] hover:shadow-[0_34px_90px_rgba(var(--accent-rgb),0.16)]"
            >
              <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[rgba(var(--accent-rgb),0.18)] blur-2xl transition group-hover:scale-125" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/70 to-transparent opacity-80" />

              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <div className="mb-7 grid h-14 w-14 place-items-center rounded-2xl bg-[var(--accent)] font-orbitron text-sm font-black text-white shadow-[0_18px_38px_rgba(var(--accent-rgb),0.28)]">
                    {link.mark}
                  </div>
                  <p className="font-orbitron text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
                    {link.eyebrow}
                  </p>
                  <h2 className="mt-3 font-barlow text-3xl font-bold uppercase leading-none text-[var(--heading)]">
                    {link.title}
                  </h2>
                </div>

                <div>
                  <p className="font-syne text-sm leading-6 text-[var(--text-secondary)]">{link.desc}</p>
                  <p className="mt-5 font-barlow text-xs font-bold uppercase tracking-[0.24em] text-[var(--heading)]">
                    Open link
                  </p>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
