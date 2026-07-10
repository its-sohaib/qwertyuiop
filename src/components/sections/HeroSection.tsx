import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { PortraitFrame } from '../ui/PortraitFrame'
import { GlowButton } from '../ui/GlowButton'
import './HeroSection.css'

type Props = {
  onScrollDown: () => void
}

export function HeroSection({ onScrollDown }: Props) {
  const reduced = useReducedMotion()

  return (
    <section className="hero-section" id="hero">
      <div className="hero-section__content">
        <motion.p
          className="hero-section__tag"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          maligayang kaarawan · level 20
        </motion.p>

        <motion.h1
          className="hero-section__title pixel-title"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
        >
          <span className="hero-section__title-line">happy</span>
          <span className="hero-section__title-line hero-section__title-line--accent">birthday</span>
          <span className="hero-section__title-name">reena</span>
        </motion.h1>

        <PortraitFrame src="/assets/her_portrait.jpeg" alt="Reena" />

        <motion.p
          className="hero-section__subtitle body-text"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          Every world we built led here  and you're still my favorite spawn point.
        </motion.p>

        <motion.div
          className="hero-section__cta"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <GlowButton onClick={onScrollDown}>Continue the Journey</GlowButton>
        </motion.div>

        <motion.div
          className="hero-section__scroll"
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          aria-hidden="true"
        >
          <span className="hero-section__scroll-text">scroll</span>
          <span className="hero-section__scroll-arrow">↓</span>
        </motion.div>
      </div>
    </section>
  )
}
