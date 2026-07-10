import { motion } from 'framer-motion'
import { BiomeShell } from '../ui/BiomeShell'
import { PixelHeartBuild } from '../ui/PixelHeartBuild'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './NightSky.css'

const risingLanterns = Array.from({ length: 7 }, (_, i) => ({
  id: i,
  left: `${8 + i * 13}%`,
  delay: i * 0.7,
  duration: 10 + (i % 3) * 2,
  size: 8 + (i % 3) * 2,
}))

export function NightSky() {
  const reduced = useReducedMotion()

  return (
    <BiomeShell id="night-sky" emoji="🌌" label="Biome 06" title="Night Sky" tone="night">
      <div className="night">
        {!reduced && (
          <div className="night__lanterns" aria-hidden="true">
            {risingLanterns.map((l) => (
              <motion.span
                key={l.id}
                className="night__lantern"
                style={{ left: l.left, width: l.size, height: l.size * 1.35 }}
                animate={{ y: [60, -280], opacity: [0, 0.9, 0.9, 0] }}
                transition={{
                  duration: l.duration,
                  repeat: Infinity,
                  delay: l.delay,
                  ease: 'easeOut',
                }}
              />
            ))}
          </div>
        )}

        <PixelHeartBuild />

        <motion.div
          className="night__message"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="night__headline pixel-heading">Happy Birthday.</p>
          <p className="night__level">Level 20 unlocked.</p>
          <p className="night__wish body-copy">
            Stay you. Nobody else doing it like that.
          </p>
          <p className="night__wish body-copy night__wish--final">
            Hope this year is soft on you. Good health,
            good laughs, good people, and all the wins
            you been waiting on.
          </p>
        </motion.div>

        <motion.div
          className="night__fade"
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 1.2 }}
          aria-hidden="true"
        >
          <span className="night__drift" />
          <span className="night__drift night__drift--2" />
          <span className="night__drift night__drift--3" />
        </motion.div>
      </div>
    </BiomeShell>
  )
}
