import { useState, useRef, useCallback } from 'react';

const CLIPS = [
  { id: 'stupid', label: '"I am stupid"', emoji: '😤', freq: 320, type: 'sawtooth' as OscillatorType },
  { id: 'monza', label: 'Monza Win Radio', emoji: '🏆', freq: 440, type: 'sine' as OscillatorType },
  { id: 'monaco', label: 'Monaco Emotion', emoji: '🇲🇨', freq: 280, type: 'triangle' as OscillatorType },
  { id: 'beautiful', label: '"This is beautiful"', emoji: '✨', freq: 520, type: 'sine' as OscillatorType },
];

export default function RadioArchive() {
  const [isOpen, setIsOpen] = useState(false);
  const [playing, setPlaying] = useState<string | null>(null);
  const [bars, setBars] = useState<number[]>(new Array(22).fill(0.08));

  const audioCtxRef = useRef<AudioContext | null>(null);
  const rafRef = useRef<number>(0);
  const stopRef = useRef<(() => void) | null>(null);

  const getCtx = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    return audioCtxRef.current;
  };

  const stopCurrent = useCallback(() => {
    stopRef.current?.();
    stopRef.current = null;
    cancelAnimationFrame(rafRef.current);
    setBars(new Array(22).fill(0.08));
    setPlaying(null);
  }, []);

  const playClip = useCallback(
    (id: string, freq: number, type: OscillatorType) => {
      if (playing === id) {
        stopCurrent();
        return;
      }

      stopCurrent();

      const ctx = getCtx();
      if (ctx.state === 'suspended') ctx.resume();

      // Lo-fi chain: osc → waveshaper (distort) → biquad (lo-pass) → gain
      const osc = ctx.createOscillator();
      const distortion = ctx.createWaveShaper();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      // Waveshaper curve for warmth / crunch
      const CURVE_LEN = 512;
      const curve = new Float32Array(CURVE_LEN);
      const k = 40;
      for (let i = 0; i < CURVE_LEN; i++) {
        const x = (i * 2) / CURVE_LEN - 1;
        curve[i] = ((Math.PI + k) * x) / (Math.PI + k * Math.abs(x));
      }
      distortion.curve = curve;

      filter.type = 'lowpass';
      filter.frequency.value = 1800; // lo-fi cutoff

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      // Slight frequency modulation for a "radio" feel
      osc.frequency.setTargetAtTime(freq * 1.003, ctx.currentTime + 0.05, 0.3);

      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.08, ctx.currentTime + 1.8);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2.4);

      osc.connect(distortion);
      distortion.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 2.5);

      setPlaying(id);

      // Animate waveform bars
      const animBars = () => {
        setBars((prev) =>
          prev.map(() => Math.random() * 0.75 + 0.12)
        );
        rafRef.current = requestAnimationFrame(animBars);
      };
      animBars();

      const stopTimer = setTimeout(() => {
        cancelAnimationFrame(rafRef.current);
        setBars(new Array(22).fill(0.08));
        setPlaying(null);
        stopRef.current = null;
      }, 2500);

      stopRef.current = () => {
        clearTimeout(stopTimer);
        try { osc.stop(); } catch (_) {}
      };
    },
    [playing, stopCurrent]
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Panel */}
      {isOpen && (
        <div
          className="rounded-2xl p-4 w-64"
          style={{
            background: 'rgba(8,8,8,0.92)',
            backdropFilter: 'blur(32px)',
            border: '1px solid rgba(var(--accent-rgb), 0.2)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 30px rgba(var(--accent-rgb), 0.06)',
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ background: 'var(--accent)' }}
            />
            <span
              className="font-orbitron text-[10px] tracking-widest"
              style={{ color: 'var(--accent)' }}
            >
              RADIO ARCHIVE
            </span>
            <span className="ml-auto font-barlow text-[10px]" style={{ color: 'rgba(255,255,255,0.25)' }}>
              {playing ? 'ON AIR' : 'STANDBY'}
            </span>
          </div>

          {/* Waveform visualizer */}
          <div
            className="flex items-center gap-[2px] mb-4 rounded-xl p-3"
            style={{
              height: 52,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {bars.map((v, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm transition-all"
                style={{
                  height: `${v * 100}%`,
                  background: `rgba(var(--accent-rgb), ${0.4 + v * 0.6})`,
                  transitionDuration: playing ? '75ms' : '300ms',
                }}
              />
            ))}
          </div>

          {/* Clip buttons */}
          <div className="flex flex-col gap-1.5">
            {CLIPS.map((clip) => {
              const isPlaying = playing === clip.id;
              return (
                <button
                  key={clip.id}
                  onClick={() => playClip(clip.id, clip.freq, clip.type)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-xs transition-all duration-200"
                  style={
                    isPlaying
                      ? {
                          background: 'rgba(var(--accent-rgb), 0.15)',
                          border: '1px solid rgba(var(--accent-rgb), 0.4)',
                          color: 'var(--accent)',
                        }
                      : {
                          background: 'rgba(255,255,255,0.04)',
                          border: '1px solid transparent',
                          color: 'rgba(255,255,255,0.6)',
                        }
                  }
                >
                  <span style={{ fontSize: 14 }}>{clip.emoji}</span>
                  <span className="font-barlow font-semibold tracking-wide">{clip.label}</span>
                  {isPlaying && (
                    <div className="ml-auto flex gap-[3px] items-end" style={{ height: 14 }}>
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-[3px] rounded-full animate-bounce"
                          style={{
                            background: 'var(--accent)',
                            height: `${60 + i * 20}%`,
                            animationDelay: `${i * 80}ms`,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <p className="mt-3 text-center font-orbitron text-[8px] tracking-widest" style={{ color: 'rgba(255,255,255,0.18)' }}>
            REPLACE WITH REAL AUDIO CLIPS
          </p>
        </div>
      )}

      {/* Toggle FAB */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300"
        style={{
          background: isOpen ? 'rgba(var(--accent-rgb), 0.2)' : 'var(--accent)',
          border: isOpen ? '1px solid rgba(var(--accent-rgb), 0.5)' : 'none',
          boxShadow: isOpen ? 'none' : '0 4px 24px rgba(var(--accent-rgb), 0.4)',
          transform: isOpen ? 'scale(0.9)' : 'scale(1)',
        }}
      >
        {isOpen ? '✕' : '📻'}
      </button>
    </div>
  );
}
