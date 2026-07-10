import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Section } from '../ui/Section'
import './SecretsSection.css'

const secrets = [
  { id: 'bee', emoji: '🐝', hint: 'find the bee', message: 'buzz buzz  you found the birthday bee. reena stays winning.' },
  { id: 'star', emoji: '⭐', hint: 'catch a star', message: 'wishing star caught. wish already came true tho.' },
  { id: 'berry', emoji: '🫐', hint: 'glow berry', message: 'glow berries only shine for the best people.' },
]

export function SecretsSection() {
  const [found, setFound] = useState<Set<string>>(new Set())
  const [toast, setToast] = useState<string | null>(null)

  function discover(id: string, message: string) {
    if (found.has(id)) return
    setFound((prev) => new Set(prev).add(id))
    setToast(message)
    window.setTimeout(() => setToast(null), 3500)
  }

  return (
    <Section id="secrets" label="hidden" title="easter eggs">
      <p className="secrets__intro body-text">
        Three little secrets are hidden here. Can you find them all?
      </p>
      <div className="secrets__grid">
        {secrets.map((s) => (
          <button
            key={s.id}
            className={`secrets__egg glass-card ${found.has(s.id) ? 'secrets__egg--found' : ''}`}
            onClick={() => discover(s.id, s.message)}
            aria-label={s.hint}
          >
            <span className="secrets__emoji">{found.has(s.id) ? '✨' : s.emoji}</span>
            <span className="secrets__hint pixel-title">{found.has(s.id) ? 'found!' : s.hint}</span>
          </button>
        ))}
      </div>
      <p className="secrets__count body-text">
        {found.size} / {secrets.length} discovered
      </p>

      <AnimatePresence>
        {toast && (
          <motion.div
            className="secrets__toast glass-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            role="status"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  )
}
