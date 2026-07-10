import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import type { Interactable } from '../../game/types'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import './InteractModal.css'

type Props = {
  item: Interactable | null
  onClose: () => void
}

export function InteractModal({ item, onClose }: Props) {
  const reduced = useReducedMotion()
  const openedAt = useRef(0)

  useEffect(() => {
    if (!item) return
    openedAt.current = performance.now()
    function onKey(e: KeyboardEvent) {
      if (e.code === 'Escape') {
        e.preventDefault()
        onClose()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [item, onClose])

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="imodal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={() => {
            if (performance.now() - openedAt.current < 280) return
            onClose()
          }}
          role="dialog"
          aria-modal="true"
          aria-label={item.label}
        >
          <motion.div
            className={`imodal__card ${item.finale ? 'imodal__card--finale' : ''}`}
            initial={reduced ? false : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="imodal__label">
              <span aria-hidden="true">{item.emoji}</span>
              {item.label}
            </p>

            {item.image && (
              <div className={`imodal__media ${item.lick ? 'imodal__media--lick' : ''}`}>
                <img
                  src={item.image}
                  alt={item.imageAlt ?? ''}
                  className="imodal__img"
                  decoding="async"
                />
              </div>
            )}

            {item.images && (
              <div className="imodal__strip">
                {item.images.map((img) => (
                  <img
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    className="imodal__snap"
                    loading="lazy"
                    decoding="async"
                  />
                ))}
              </div>
            )}

            {item.finale && (
              <div className="imodal__heart" aria-hidden="true">
                {HEART.map((row, y) => (
                  <div key={y} className="imodal__heart-row">
                    {row.map((on, x) => (
                      <span
                        key={x}
                        className={`imodal__px ${on ? 'imodal__px--on' : ''}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            )}

            <div className="imodal__lines">
              {item.lines.map((line) => (
                <p
                  key={line.text}
                  className={`imodal__line ${line.soft ? 'imodal__line--soft' : ''} ${item.finale && !line.soft ? 'imodal__line--hero' : ''}`}
                >
                  {line.text}
                </p>
              ))}
            </div>

            <button type="button" className="imodal__close" onClick={onClose}>
              {item.finale ? 'gg unc' : 'got it'}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const HEART = [
  [0, 1, 1, 0, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
]
