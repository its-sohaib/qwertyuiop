import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './AchievementUnlock.css'

type Props = {
  icon: string
  title: string
  delay?: number
  onUnlock?: () => void
}

export function AchievementUnlock({ icon, title, delay = 0, onUnlock }: Props) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className="ach"
      initial={reduced ? false : { opacity: 0, x: -24, scale: 0.92 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        type: 'spring',
        stiffness: 220,
        damping: 18,
        delay,
      }}
      onAnimationComplete={() => {
        if (!reduced) onUnlock?.()
      }}
    >
      <div className="ach__icon" aria-hidden="true">{icon}</div>
      <div className="ach__body">
        <p className="ach__label">Achievement unlocked!</p>
        <p className="ach__title">{title}</p>
      </div>
      <span className="ach__flash" aria-hidden="true" />
    </motion.div>
  )
}
