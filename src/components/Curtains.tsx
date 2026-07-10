import { useState } from 'react'
import { HeartopiaCloud } from './clipart/HeartopiaCloud'
import { GrassBlock } from './clipart/GrassBlock'
import './Curtains.css'

type Props = {
  onOpen: () => void
}

export function Curtains({ onOpen }: Props) {
  const [opening, setOpening] = useState(false)

  function handleOpen() {
    if (opening) return
    setOpening(true)
    window.setTimeout(onOpen, 1400)
  }

  return (
    <div
      className={`curtains ${opening ? 'curtains--opening' : ''}`}
      onClick={handleOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleOpen()
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Open birthday surprise"
    >
      <div className="curtain curtain--left">
        <div className="curtain__inner" />
      </div>
      <div className="curtain curtain--right">
        <div className="curtain__inner" />
      </div>

      <div className="curtains__prompt">
        <span className="curtains__heart">♥</span>
        <span className="curtains__text">tap to open</span>
        <span className="curtains__games">heartopia · minecraft</span>
      </div>

      <div className="curtains__decor curtains__decor--left" aria-hidden="true">
        <GrassBlock animate="bob" />
        <GrassBlock animate="wiggle" />
      </div>
      <div className="curtains__decor curtains__decor--right" aria-hidden="true">
        <HeartopiaCloud animate="drift" />
      </div>
    </div>
  )
}
