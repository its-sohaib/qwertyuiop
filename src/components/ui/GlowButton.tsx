import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import './GlowButton.css'

type Props = {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'ghost'
  className?: string
  type?: 'button' | 'submit'
}

export function GlowButton({
  children,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
}: Props) {
  return (
    <motion.button
      type={type}
      className={`glow-btn glow-btn--${variant} ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
    >
      <span className="glow-btn__shine" aria-hidden="true" />
      <span className="glow-btn__text">{children}</span>
    </motion.button>
  )
}
