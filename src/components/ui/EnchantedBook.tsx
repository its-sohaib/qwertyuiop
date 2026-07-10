import { motion } from 'framer-motion'
import { useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './EnchantedBook.css'

type Props = {
  title: string
  text: string
  delay?: number
  accent?: boolean
}

export function EnchantedBook({ title, text, delay = 0, accent }: Props) {
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()

  return (
    <motion.div
      className={`enchanted-book ${open ? 'enchanted-book--open' : ''} ${accent ? 'enchanted-book--accent' : ''}`}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => setOpen((v) => !v)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setOpen((v) => !v)
        }
      }}
      role="button"
      tabIndex={0}
      aria-expanded={open}
    >
      <div className="enchanted-book__particles" aria-hidden="true" />
      <div className="enchanted-book__spine" aria-hidden="true" />
      <div className="enchanted-book__cover">
        <span className="enchanted-book__emoji" aria-hidden="true">📖</span>
        <span className="enchanted-book__title pixel-title">{title}</span>
        {!open && <span className="enchanted-book__hint">tap to open</span>}
      </div>
      <motion.div
        className="enchanted-book__page"
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="enchanted-book__text body-text">{text}</p>
      </motion.div>
    </motion.div>
  )
}
