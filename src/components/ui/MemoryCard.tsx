import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './MemoryCard.css'

type Props = {
  src: string
  alt: string
  label: string
  index: number
  featured?: boolean
}

export function MemoryCard({ src, alt, label, index, featured }: Props) {
  const reduced = useReducedMotion()

  return (
    <motion.figure
      className={`memory-card glass-card ${featured ? 'memory-card--featured' : ''}`}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={reduced ? undefined : { y: -6, scale: 1.02 }}
    >
      <div className="memory-card__slot" aria-hidden="true" />
      <div className="memory-card__img-wrap">
        <img src={src} alt={alt} loading="lazy" />
      </div>
      <figcaption className="memory-card__label pixel-title">{label}</figcaption>
    </motion.figure>
  )
}
