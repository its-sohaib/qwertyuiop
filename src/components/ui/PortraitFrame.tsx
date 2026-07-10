import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './PortraitFrame.css'

type Props = {
  src: string
  alt: string
}

export function PortraitFrame({ src, alt }: Props) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className="portrait-frame"
      initial={reduced ? false : { opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
    >
      <div className="portrait-frame__glow" aria-hidden="true" />
      <div className="portrait-frame__corner portrait-frame__corner--tl" aria-hidden="true" />
      <div className="portrait-frame__corner portrait-frame__corner--tr" aria-hidden="true" />
      <div className="portrait-frame__corner portrait-frame__corner--bl" aria-hidden="true" />
      <div className="portrait-frame__corner portrait-frame__corner--br" aria-hidden="true" />
      <div className="portrait-frame__inner">
        <img src={src} alt={alt} className="portrait-frame__img" width={400} height={500} />
        <div className="portrait-frame__shine" aria-hidden="true" />
      </div>
      <div className="portrait-frame__petals" aria-hidden="true">
        <span /><span /><span />
      </div>
    </motion.div>
  )
}
