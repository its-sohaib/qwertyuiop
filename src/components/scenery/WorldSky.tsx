import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './WorldSky.css'

type Props = {
  phase: 'hero' | 'day' | 'cave' | 'night'
}

export function WorldSky({ phase }: Props) {
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const sunY = useTransform(scrollYProgress, [0, 0.45, 0.7], [0, 80, 220])
  const cloudY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 140])

  return (
    <div className={`world-sky world-sky--${phase}`} aria-hidden="true">
      <div className="world-sky__gradient" />
      <div className="world-sky__aurora" />
      <motion.div className="world-sky__sun" style={{ y: sunY }} />
      <motion.div className="world-sky__clouds" style={{ y: cloudY }}>
        <span className="world-sky__cloud world-sky__cloud--1" />
        <span className="world-sky__cloud world-sky__cloud--2" />
        <span className="world-sky__cloud world-sky__cloud--3" />
        <span className="world-sky__cloud world-sky__cloud--4" />
      </motion.div>
      <div className="world-sky__stars" />
      <div className="world-sky__horizon" />
      <div className="world-sky__vignette" />
    </div>
  )
}
