import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './AchievementCard.css'

type Props = {
  icon: string
  title: string
  desc: string
  delay?: number
}

export function AchievementCard({ icon, title, desc, delay = 0 }: Props) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className="achievement glass-card"
      initial={reduced ? false : { opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, type: 'spring', stiffness: 200 }}
    >
      <span className="achievement__icon" aria-hidden="true">{icon}</span>
      <div>
        <p className="achievement__title pixel-title">{title}</p>
        <p className="achievement__desc body-text">{desc}</p>
      </div>
      <span className="achievement__badge" aria-hidden="true">✓</span>
    </motion.div>
  )
}
