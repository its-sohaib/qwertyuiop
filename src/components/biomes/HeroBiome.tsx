import { motion } from 'framer-motion'
import { PortraitFrame } from '../ui/PortraitFrame'
import { BeginButton } from '../ui/BeginButton'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './HeroBiome.css'

type Props = {
  onBegin: () => void
  started: boolean
}

export function HeroBiome({ onBegin, started }: Props) {
  const reduced = useReducedMotion()

  return (
    <section className="hero-biome" id="hero">
      <div className="hero-biome__content">
        <motion.p
          className="biome-label hero-biome__label"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span aria-hidden="true">✦</span>
          custom map · july 11
        </motion.p>

        <PortraitFrame src="/assets/her_portrait.jpeg" alt="Reena" size="hero" />

        <motion.h1
          className="hero-biome__title pixel-heading"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 1 }}
        >
          <span className="hero-biome__line">happy</span>
          <span className="hero-biome__line hero-biome__line--accent">birthday</span>
          <span className="hero-biome__name">reena</span>
        </motion.h1>

        <motion.p
          className="hero-biome__sub body-copy"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95, duration: 0.8 }}
        >
          damn nga already 20 uncccc
        </motion.p>

        {!started && (
          <div className="hero-biome__cta">
            <BeginButton onClick={onBegin} delay={1.15}>
              ▶ Begin Adventure
            </BeginButton>
          </div>
        )}

        {started && (
          <motion.div
            className="hero-biome__hint"
            animate={reduced ? undefined : { y: [0, 6, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          >
            <span>keep scrolling</span>
            <span className="hero-biome__arrow">↓</span>
          </motion.div>
        )}
      </div>
    </section>
  )
}
