import { motion } from 'framer-motion'
import { BiomeShell } from '../ui/BiomeShell'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './CherryGrove.css'

export function CherryGrove() {
  const reduced = useReducedMotion()

  return (
    <BiomeShell id="cherry-grove" emoji="🌸" label="Biome 01" title="Cherry Grove">
      <motion.div
        className="cherry"
        initial={reduced ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="cherry__greeting body-copy">
          Happy 20 unc.
        </p>
        <p className="cherry__line body-copy">
          You da real birthday fr.
        </p>
        <p className="cherry__line body-copy cherry__line--soft">
          Built you a whole map. Touch grass later.
        </p>
        <div className="cherry__trees" aria-hidden="true">
          <span className="cherry__blossom" />
          <span className="cherry__blossom cherry__blossom--2" />
          <span className="cherry__blossom cherry__blossom--3" />
        </div>
      </motion.div>
    </BiomeShell>
  )
}
