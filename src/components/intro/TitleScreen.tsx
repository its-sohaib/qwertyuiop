import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './TitleScreen.css'

type Props = {
  onBegin: () => void
}

export function TitleScreen({ onBegin }: Props) {
  const reduced = useReducedMotion()

  return (
    <section className="title-screen">
      <div className="title-screen__sky" aria-hidden="true">
        <span className="title-screen__cloud title-screen__cloud--1" />
        <span className="title-screen__cloud title-screen__cloud--2" />
        <span className="title-screen__sun" />
        <span className="title-screen__block title-screen__block--1" />
        <span className="title-screen__block title-screen__block--2" />
        <span className="title-screen__block title-screen__block--3" />
      </div>

      <div className="title-screen__content">
        <motion.p
          className="title-screen__label"
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <span aria-hidden="true">✦</span>
          custom map · july 11
        </motion.p>

        <motion.div
          className="title-screen__frame"
          initial={reduced ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="/assets/hero.gif"
            alt="SpongeBob and Patrick"
            className="title-screen__hero"
            width={480}
            height={270}
            decoding="async"
          />
        </motion.div>

        <motion.h1
          className="title-screen__title"
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.9 }}
        >
          <span>happy</span>
          <span className="title-screen__accent">birthday</span>
          <span className="title-screen__name">reena</span>
        </motion.h1>

        <motion.p
          className="title-screen__sub"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.7 }}
        >
          damn nga already 20 uncccc
        </motion.p>

        <motion.div
          className="title-screen__cta"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.7 }}
        >
          <button type="button" className="title-screen__btn" onClick={onBegin}>
            ▶ Begin Adventure
          </button>
          <p className="title-screen__tip">walk the map. loot the vibes.</p>
        </motion.div>
      </div>
    </section>
  )
}
