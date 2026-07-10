import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './BiomeShell.css'

type Props = {
  id: string
  emoji: string
  label: string
  title: string
  children: ReactNode
  tone?: 'day' | 'library' | 'cave' | 'night'
}

export function BiomeShell({ id, emoji, label, title, children, tone = 'day' }: Props) {
  const reduced = useReducedMotion()

  return (
    <section className={`biome biome--${tone}`} id={id}>
      <div className="biome__inner">
        <motion.header
          className="biome__header"
          initial={reduced ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="biome-label">
            <span aria-hidden="true">{emoji}</span>
            {label}
          </p>
          <h2 className="biome-title">{title}</h2>
        </motion.header>
        <div className="biome__body">{children}</div>
      </div>
    </section>
  )
}
