import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BiomeShell } from '../ui/BiomeShell'
import { useAudio } from '../../hooks/useAudio'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './HiddenCave.css'

type Egg = {
  id: string
  label: string
  emoji: string
  surprise: string
  kind: 'egg' | 'chest'
}

const eggs: Egg[] = [
  { id: 'ore', label: 'glow berry', emoji: '🫐', surprise: 'Sweet find. You glow different.', kind: 'egg' },
  { id: 'crystal', label: 'amethyst', emoji: '💜', surprise: 'Shiny. Just like your vibe.', kind: 'egg' },
  { id: 'chest', label: 'treasure chest', emoji: '📦', surprise: 'Loot acquired: one unforgettable year ahead.', kind: 'chest' },
  { id: 'torch', label: 'campfire', emoji: '🔥', surprise: 'Cozy unlocked. Stay warm out there.', kind: 'egg' },
]

export function HiddenCave() {
  const [found, setFound] = useState<Set<string>>(new Set())
  const [toast, setToast] = useState<string | null>(null)
  const [chestOpen, setChestOpen] = useState(false)
  const { playSparkle, playChest } = useAudio()
  const reduced = useReducedMotion()

  function discover(egg: Egg) {
    if (found.has(egg.id)) return
    setFound((prev) => new Set(prev).add(egg.id))
    if (egg.kind === 'chest') {
      setChestOpen(true)
      playChest()
    } else {
      playSparkle()
    }
    setToast(egg.surprise)
    window.setTimeout(() => setToast(null), 3200)
  }

  return (
    <BiomeShell id="hidden-cave" emoji="💎" label="Biome 05" title="Hidden Cave" tone="cave">
      <p className="cave__intro body-copy">
        Tap around. Secrets hide in the dark.
      </p>

      <div className="cave__grid">
        {eggs.map((egg, i) => {
          const isFound = found.has(egg.id)
          const isChest = egg.kind === 'chest'

          return (
            <motion.button
              key={egg.id}
              type="button"
              className={`cave__egg ${isFound ? 'cave__egg--found' : ''} ${isChest ? 'cave__egg--chest' : ''}`}
              onClick={() => discover(egg)}
              initial={reduced ? false : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isFound ? `${egg.label} found` : `Find ${egg.label}`}
            >
              <span className="cave__emoji" aria-hidden="true">
                {isChest && chestOpen ? '✨' : isFound ? '✨' : egg.emoji}
              </span>
              <span className="cave__label">
                {isFound ? (isChest ? 'opened!' : 'found!') : egg.label}
              </span>
              {isChest && (
                <span className={`cave__lid ${chestOpen ? 'cave__lid--open' : ''}`} aria-hidden="true" />
              )}
            </motion.button>
          )
        })}
      </div>

      <p className="cave__count body-copy">
        {found.size} / {eggs.length} discovered
      </p>

      <AnimatePresence>
        {toast && (
          <motion.div
            className="cave__toast"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            role="status"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </BiomeShell>
  )
}
