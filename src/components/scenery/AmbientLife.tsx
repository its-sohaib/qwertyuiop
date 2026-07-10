import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './AmbientLife.css'

type Props = {
  variant?: 'default' | 'petals' | 'cave' | 'night'
}

const fireflies = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${6 + ((i * 19) % 88)}%`,
  top: `${12 + ((i * 27) % 72)}%`,
  delay: i * 0.55,
  size: 2.5 + (i % 3),
  duration: 4.5 + (i % 4) * 0.8,
}))

const petals = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${4 + ((i * 13) % 92)}%`,
  delay: i * 0.9,
  duration: 12 + (i % 5) * 2.5,
  size: 6 + (i % 4) * 2,
  drift: (i % 2 === 0 ? 1 : -1) * (20 + (i % 3) * 10),
}))

const lanterns = [
  { id: 1, left: '8%', bottom: '18%', delay: 0 },
  { id: 2, left: '78%', bottom: '28%', delay: 1.2 },
  { id: 3, left: '52%', bottom: '12%', delay: 2.4 },
]

export function AmbientLife({ variant = 'default' }: Props) {
  const reduced = useReducedMotion()
  if (reduced) return null

  return (
    <div className={`ambient-life ambient-life--${variant}`} aria-hidden="true">
      {fireflies.map((f) => (
        <motion.span
          key={`ff-${f.id}`}
          className="ambient-life__firefly"
          style={{ left: f.left, top: f.top, width: f.size, height: f.size }}
          animate={{
            opacity: [0.15, 0.95, 0.25, 0.85, 0.15],
            y: [0, -14, 6, -10, 0],
            x: [0, 8, -5, 4, 0],
          }}
          transition={{ duration: f.duration, repeat: Infinity, delay: f.delay, ease: 'easeInOut' }}
        />
      ))}

      {(variant === 'default' || variant === 'petals') &&
        petals.map((p) => (
          <span
            key={`petal-${p.id}`}
            className="ambient-life__petal"
            style={{
              left: p.left,
              width: p.size,
              height: p.size * 0.7,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              ['--drift' as string]: `${p.drift}px`,
            }}
          />
        ))}

      {(variant === 'default' || variant === 'night') &&
        lanterns.map((l) => (
          <motion.div
            key={`lantern-${l.id}`}
            className="ambient-life__lantern"
            style={{ left: l.left, bottom: l.bottom }}
            animate={
              variant === 'night'
                ? { y: [0, -40, -80], opacity: [0.7, 0.9, 0.3] }
                : { y: [0, -8, 0], opacity: [0.6, 0.9, 0.6] }
            }
            transition={{
              duration: variant === 'night' ? 14 : 5,
              repeat: Infinity,
              delay: l.delay,
              ease: 'easeInOut',
            }}
          />
        ))}

      {variant === 'cave' &&
        Array.from({ length: 10 }, (_, i) => (
          <motion.span
            key={`spark-${i}`}
            className="ambient-life__spark"
            style={{
              left: `${10 + ((i * 17) % 80)}%`,
              top: `${20 + ((i * 23) % 60)}%`,
            }}
            animate={{ opacity: [0, 0.9, 0], scale: [0.4, 1.2, 0.4] }}
            transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.4 }}
          />
        ))}
    </div>
  )
}
