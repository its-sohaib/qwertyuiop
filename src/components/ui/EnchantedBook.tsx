import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useAudio } from '../../hooks/useAudio'
import './EnchantedBook.css'

type Props = {
  index: number
  text: string
  delay?: number
}

export function EnchantedBook({ index, text, delay = 0 }: Props) {
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()
  const { playSparkle } = useAudio()

  function toggle() {
    setOpen((v) => {
      if (!v) playSparkle()
      return !v
    })
  }

  return (
    <motion.button
      type="button"
      className={`book ${open ? 'book--open' : ''}`}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      onClick={toggle}
      aria-expanded={open}
    >
      <span className="book__glow" aria-hidden="true" />
      <span className="book__cover">
        <span className="book__rune" aria-hidden="true">✦</span>
        <span className="book__num pixel-heading">page {index}</span>
        {!open && <span className="book__hint">tap to open</span>}
      </span>
      <AnimatePresence initial={false}>
        {open && (
          <motion.span
            className="book__page"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="book__text">{text}</span>
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
