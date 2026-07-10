import { motion } from 'framer-motion'
import { BiomeShell } from '../ui/BiomeShell'
import { PortraitFrame } from '../ui/PortraitFrame'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './FlowerForest.css'

const bees = [
  { id: 1, top: '8%', left: '6%', delay: 0 },
  { id: 2, top: '22%', left: '88%', delay: 1.2 },
  { id: 3, top: '55%', left: '2%', delay: 2.4 },
]

const snaps = [
  { src: '/assets/heartopia/1.jpeg', alt: 'Heartopia moment' },
  { src: '/assets/heartopia/2.jpeg', alt: 'Flower fields' },
  { src: '/assets/heartopia/3.jpeg', alt: 'Main character fit' },
  { src: '/assets/heartopia/4.jpeg', alt: 'Quiet slay' },
]

export function FlowerForest() {
  const reduced = useReducedMotion()

  return (
    <BiomeShell id="flower-forest" emoji="🌼" label="Biome 02" title="Flower Forest">
      <div className="flower-forest">
        {!reduced &&
          bees.map((b) => (
            <motion.span
              key={b.id}
              className="flower-forest__bee"
              style={{ top: b.top, left: b.left }}
              animate={{
                x: [0, 18, -10, 8, 0],
                y: [0, -12, 6, -8, 0],
                rotate: [0, 8, -6, 4, 0],
              }}
              transition={{ duration: 5 + b.id, repeat: Infinity, delay: b.delay, ease: 'easeInOut' }}
              aria-hidden="true"
            >
              🐝
            </motion.span>
          ))}

        <PortraitFrame src="/assets/her_portrait.jpeg" alt="Reena in the flower forest" size="biome" />

        <motion.div
          className="flower-forest__bloom"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p className="body-copy flower-forest__text">
            Certified rare drop.
          </p>
          <p className="body-copy flower-forest__text flower-forest__text--soft">
            Still got infinite aura.
          </p>
        </motion.div>

        <div className="flower-forest__field" aria-hidden="true">
          {Array.from({ length: 9 }, (_, i) => (
            <motion.span
              key={i}
              className="flower-forest__flower"
              initial={reduced ? false : { scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + i * 0.08, type: 'spring', stiffness: 200 }}
              style={{
                ['--hue' as string]: `${320 + (i % 5) * 25}`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        <div className="flower-forest__strip">
          {snaps.map((s, i) => (
            <motion.img
              key={s.src}
              src={s.src}
              alt={s.alt}
              className="flower-forest__snap"
              loading="lazy"
              decoding="async"
              width={200}
              height={240}
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08 }}
            />
          ))}
        </div>

        <motion.div
          className="flower-forest__memory"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <img
            src="/assets/minecraft.jpeg"
            alt="Minecraft memories"
            className="flower-forest__shot"
            loading="lazy"
            decoding="async"
            width={600}
            height={400}
          />
          <p className="flower-forest__caption">lowkey favorite teammate</p>
        </motion.div>
      </div>
    </BiomeShell>
  )
}
