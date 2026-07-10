import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './LayeredBackground.css'

export function LayeredBackground() {
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 800], [0, reduced ? 0 : 120])
  const y2 = useTransform(scrollY, [0, 800], [0, reduced ? 0 : 60])
  const y3 = useTransform(scrollY, [0, 1200], [0, reduced ? 0 : 200])

  return (
    <div className="scenery" aria-hidden="true">
      <div className="scenery__sky" />
      <motion.div className="scenery__sun" style={{ y: y1 }} />
      <motion.div className="scenery__mountains scenery__mountains--back" style={{ y: y2 }} />
      <motion.div className="scenery__mountains scenery__mountains--front" style={{ y: y3 }} />
      <div className="scenery__blossom scenery__blossom--left" />
      <div className="scenery__blossom scenery__blossom--right" />
      <div className="scenery__flowers" />
      <div className="scenery__stars" />
      <div className="scenery__vignette" />
    </div>
  )
}
