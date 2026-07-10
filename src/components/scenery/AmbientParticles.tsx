import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './AmbientParticles.css'

const fireflies = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${8 + (i * 17) % 84}%`,
  top: `${15 + (i * 23) % 70}%`,
  delay: i * 0.6,
  size: 3 + (i % 3),
}))

const hearts = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  left: `${10 + (i * 11) % 80}%`,
  delay: i * 1.2,
  duration: 14 + (i % 4) * 3,
}))

const sparkles = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  left: `${(i * 19) % 100}%`,
  top: `${(i * 13) % 100}%`,
  delay: i * 0.35,
}))

export function AmbientParticles() {
  const reduced = useReducedMotion()
  if (reduced) return null

  return (
    <div className="ambient" aria-hidden="true">
      {fireflies.map((f) => (
        <motion.span
          key={`fly-${f.id}`}
          className="ambient__firefly"
          style={{ left: f.left, top: f.top, width: f.size, height: f.size }}
          animate={{
            opacity: [0.2, 0.9, 0.3, 0.8, 0.2],
            y: [0, -12, 4, -8, 0],
            x: [0, 6, -4, 3, 0],
          }}
          transition={{ duration: 5 + f.id * 0.3, repeat: Infinity, delay: f.delay }}
        />
      ))}
      {hearts.map((h) => (
        <span
          key={`heart-${h.id}`}
          className="ambient__heart"
          style={{
            left: h.left,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
          }}
        />
      ))}
      {sparkles.map((s) => (
        <motion.span
          key={`spark-${s.id}`}
          className="ambient__sparkle"
          style={{ left: s.left, top: s.top }}
          animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: s.delay }}
        />
      ))}
      <div className="ambient__lantern ambient__lantern--1" />
      <div className="ambient__lantern ambient__lantern--2" />
      <div className="ambient__lantern ambient__lantern--3" />
    </div>
  )
}
