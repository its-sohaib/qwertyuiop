import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { GlowButton } from '../ui/GlowButton'
import './WorldGate.css'

type Props = {
  onStart: () => void
}

export function WorldGate({ onStart }: Props) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className="world-gate"
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="world-gate__sky" aria-hidden="true" />
      <div className="world-gate__glow" aria-hidden="true" />

      <motion.div
        className="world-gate__content"
        initial={reduced ? false : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.p
          className="world-gate__pre pixel-title"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          birthday world loading
        </motion.p>

        <motion.h1
          className="world-gate__title pixel-title"
          initial={reduced ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          for reena
        </motion.h1>

        <motion.p
          className="world-gate__sub body-text"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          bro really spawned in 20 years ago.
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <GlowButton onClick={onStart}>Enter Birthday Mode</GlowButton>
        </motion.div>
      </motion.div>

      <div className="world-gate__ground" aria-hidden="true" />
    </motion.div>
  )
}
