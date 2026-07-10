import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './PixelHeartBuild.css'

const HEART: number[][] = [
  [0, 1, 1, 0, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 1, 0, 0, 0],
]

const cells = HEART.flatMap((row, y) => row.map((cell, x) => ({ cell, x, y })))

export function PixelHeartBuild() {
  const reduced = useReducedMotion()
  let blockIndex = 0

  return (
    <div className="pixel-heart" aria-hidden="true">
      <div
        className="pixel-heart__grid"
        style={{ gridTemplateColumns: `repeat(${HEART[0].length}, 1fr)` }}
      >
        {cells.map(({ cell, x, y }) => {
          if (!cell) {
            return <span key={`${x}-${y}`} className="pixel-heart__empty" />
          }
          const i = blockIndex++
          return (
            <motion.span
              key={`${x}-${y}`}
              className="pixel-heart__block"
              initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.28,
                delay: reduced ? 0 : i * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
