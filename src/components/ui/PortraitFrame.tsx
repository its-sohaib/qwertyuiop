import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './PortraitFrame.css'

type Props = {
  src: string
  alt: string
  size?: 'hero' | 'biome'
  wide?: boolean
}

export function PortraitFrame({ src, alt, size = 'hero', wide = false }: Props) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className={`portrait portrait--${size}${wide ? ' portrait--wide' : ''}`}
      initial={reduced ? false : { opacity: 0, scale: 0.94, y: 20 }}
      animate={size === 'hero' ? { opacity: 1, scale: 1, y: 0 } : undefined}
      whileInView={size === 'hero' ? undefined : { opacity: 1, scale: 1, y: 0 }}
      viewport={size === 'hero' ? undefined : { once: true, margin: '-60px' }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: size === 'hero' ? 0.15 : 0 }}
    >
      <div className="portrait__aura" aria-hidden="true" />
      <div className="portrait__frame">
        <div className="portrait__bevel" aria-hidden="true" />
        <div className="portrait__inner">
          <img
            src={src}
            alt={alt}
            className="portrait__img"
            width={wide ? 640 : 400}
            height={wide ? 360 : 500}
            loading={size === 'hero' ? 'eager' : 'lazy'}
            decoding="async"
          />
          <div className="portrait__shine" aria-hidden="true" />
        </div>
        <span className="portrait__corner portrait__corner--tl" aria-hidden="true" />
        <span className="portrait__corner portrait__corner--tr" aria-hidden="true" />
        <span className="portrait__corner portrait__corner--bl" aria-hidden="true" />
        <span className="portrait__corner portrait__corner--br" aria-hidden="true" />
      </div>
      {!reduced && (
        <div className="portrait__hearts" aria-hidden="true">
          <span /><span /><span />
        </div>
      )}
    </motion.div>
  )
}
