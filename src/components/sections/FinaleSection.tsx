import { motion } from 'framer-motion'
import { Section } from '../ui/Section'
import { PixelHeartBuild } from '../ui/PixelHeartBuild'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './FinaleSection.css'

export function FinaleSection() {
  const reduced = useReducedMotion()

  return (
    <Section id="finale" label="final screen" title="one last thing" dark>
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
          <p className="finale__line pixel-title">Happy Birthday, my nga ❤️</p>
          <p className="finale__wish body-text">
            20 looks good on you.
          </p>
          <p className="finale__wish body-text">
            Stay weird.<br />
            Stay pretty.<br />
            Stay you.
          </p>
          <p className="finale__sign body-text">Love you always.</p>
        </motion.div>
      </div>
    </Section>
  )
}
