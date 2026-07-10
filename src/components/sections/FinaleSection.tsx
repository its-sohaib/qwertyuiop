import { motion } from 'framer-motion'
import { Section } from '../ui/Section'
import { PixelHeartBuild } from '../ui/PixelHeartBuild'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './FinaleSection.css'

export function FinaleSection() {
  const reduced = useReducedMotion()

  return (
    <Section id="finale" label="the end?" title="one last surprise" dark>
      <div className="finale">
        <div className="finale__night" aria-hidden="true" />
        <PixelHeartBuild />
        <motion.div
          className="finale__message"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="finale__line pixel-title">happy birthday</p>
          <p className="finale__heart">❤️</p>
          <p className="finale__wish body-text">
            May your world always be filled with happiness.
          </p>
          <p className="finale__date">11 · 06 · 26</p>
          <p className="finale__sign body-text">can't wait to hug u</p>
        </motion.div>
      </div>
    </Section>
  )
}
