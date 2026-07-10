import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './Section.css'

type Props = {
  id?: string
  label?: string
  title?: string
  children: ReactNode
  className?: string
  dark?: boolean
}

export function Section({ id, label, title, children, className = '', dark }: Props) {
  const reduced = useReducedMotion()

  return (
    <section
      id={id}
      className={`journey-section ${dark ? 'journey-section--dark' : ''} ${className}`}
    >
      <motion.div
        className="journey-section__inner"
        initial={reduced ? false : { opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {label && <p className="section-label journey-section__label">{label}</p>}
        {title && <h2 className="section-heading journey-section__title">{title}</h2>}
        {children}
      </motion.div>
    </section>
  )
}
