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
  kind: 'egg' | 'chest' | 'lick'
}

const eggs: Egg[] = [
  { id: 'ore', label: 'glow berry', emoji: '🫐', surprise: 'cake ahh loot fr', kind: 'egg' },
  { id: 'crystal', label: 'amethyst', emoji: '💜', surprise: 'my delicious ahh nga', kind: 'egg' },
  { id: 'lick', label: '???', emoji: '👅', surprise: 'feaky ahh', kind: 'lick' },
  { id: 'torch', label: 'campfire', emoji: '🔥', surprise: 'tung tung sahor', kind: 'egg' },
  { id: 'chest', label: 'treasure chest', emoji: '📦', surprise: 'I wanna jujustsu your kaisen', kind: 'chest' },
]

export function HiddenCave() {
  const [found, setFound] = useState<Set<string>>(new Set())
  const [toast, setToast] = useState<string | null>(null)
  const [chestOpen, setChestOpen] = useState(false)
  const [licked, setLicked] = useState(false)
  const { playSparkle, playChest } = useAudio()
  const reduced = useReducedMotion()

  function discover(egg: Egg) {
    if (found.has(egg.id)) return
    setFound((prev) => new Set(prev).add(egg.id))
    if (egg.kind === 'chest') {
      setChestOpen(true)
      playChest()
    } else if (egg.kind === 'lick') {
      setLicked(true)
      playSparkle()
    } else {
      playSparkle()
    }
    setToast(egg.surprise)
    window.setTimeout(() => setToast(null), 2800)
  }

  return (
    <BiomeShell id="hidden-cave" emoji="💎" label="Biome 05" title="Hidden Cave" tone="cave">
      <p className="cave__intro body-copy">
        Tap around. Free aura.
      </p>

      <div className="cave__grid">
        {eggs.map((egg, i) => {
          const isFound = found.has(egg.id)
          const isChest = egg.kind === 'chest'
          const isLick = egg.kind === 'lick'

          return (
            <motion.button
              key={egg.id}
              type="button"
              className={`cave__egg ${isFound ? 'cave__egg--found' : ''} ${isChest ? 'cave__egg--chest' : ''} ${isLick ? 'cave__egg--lick' : ''}`}
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
                {isFound
                  ? isChest
                    ? 'opened!'
                    : isLick
                      ? 'caught licking'
                      : 'found!'
                  : egg.label}
              </span>
              {isChest && (
                <span className={`cave__lid ${chestOpen ? 'cave__lid--open' : ''}`} aria-hidden="true" />
              )}
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence>
        {licked && (
          <motion.div
            className="cave__lick"
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src="/assets/lick.gif"
              alt="screen lick"
              className="cave__lick-gif"
              width={498}
              height={484}
              decoding="async"
            />
            <p className="cave__lick-caption">she on the glass fr</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="cave__reveal" aria-live="polite">
        <AnimatePresence mode="wait">
          {toast && (
            <motion.div
              key={toast}
              className="cave__toast"
              initial={{ opacity: 0, y: 10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              role="status"
            >
              <span className="cave__toast-spark" aria-hidden="true">✦</span>
              {toast}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="cave__count body-copy">
        {found.size} / {eggs.length} discovered
      </p>
    </BiomeShell>
  )
}
