import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import './BeginButton.css'

type Props = {
  children: ReactNode
  onClick: () => void
  delay?: number
}

export function BeginButton({ children, onClick, delay = 0 }: Props) {
  return (
    <motion.button
      className="begin-btn"
      onClick={onClick}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileTap={{ scale: 0.96 }}
    >
      <span className="begin-btn__glow" aria-hidden="true" />
      <span className="begin-btn__label">{children}</span>
    </motion.button>
  )
}
