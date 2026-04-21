import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  active: boolean;
}

export default function CockpitTransition({ active }: Props) {
  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="cockpit"
          initial={{ clipPath: 'circle(0% at 50% 45%)' }}
          animate={{ clipPath: 'circle(150% at 50% 45%)' }}
          exit={{ clipPath: 'circle(0% at 50% 45%)' }}
          transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ background: '#030303' }}
        >
          {/* Helmet visor chrome ring */}
          <div className="relative flex items-center justify-center">
            {/* Outer ring */}
            <div
              className="absolute rounded-full border"
              style={{
                width: 320,
                height: 320,
                borderColor: 'rgba(255,40,0,0.15)',
                borderWidth: 1,
              }}
            />
            {/* Inner ring */}
            <div
              className="absolute rounded-full border"
              style={{
                width: 240,
                height: 240,
                borderColor: 'rgba(255,40,0,0.25)',
                borderWidth: 1,
              }}
            />

            {/* CL16 mark */}
            <div className="text-center select-none z-10">
              <div
                className="font-orbitron font-black tracking-widest"
                style={{ color: 'rgba(255,40,0,0.5)', fontSize: 13, letterSpacing: '0.3em' }}
              >
                THE MONEGASQUE
              </div>
              <div
                className="font-orbitron font-black leading-none"
                style={{ fontSize: 120, color: '#ffffff', lineHeight: 1 }}
              >
                16
              </div>
              <div
                className="font-orbitron font-bold tracking-widest"
                style={{ color: 'rgba(255,40,0,0.4)', fontSize: 11, letterSpacing: '0.5em' }}
              >
                SCUDERIA FERRARI
              </div>
            </div>
          </div>

          {/* Decorative corner HUD lines */}
          {['top-8 left-8', 'top-8 right-8', 'bottom-8 left-8', 'bottom-8 right-8'].map(
            (pos, i) => (
              <div
                key={i}
                className={`absolute ${pos} w-8 h-8`}
                style={{
                  borderColor: 'rgba(255,40,0,0.3)',
                  borderTopWidth: i < 2 ? 1 : 0,
                  borderBottomWidth: i >= 2 ? 1 : 0,
                  borderLeftWidth: i % 2 === 0 ? 1 : 0,
                  borderRightWidth: i % 2 === 1 ? 1 : 0,
                }}
              />
            )
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
