import { useState } from 'react'
import { McReenaSkin } from './clipart/McReenaSkin'
import { McFriendSkin } from './clipart/McFriendSkin'
import { PixelHeart } from './clipart/PixelHeart'
import './BlockReveal.css'

type Props = {
  onOpen: () => void
}

export function BlockReveal({ onOpen }: Props) {
  const [opening, setOpening] = useState(false)

  function handleOpen() {
    if (opening) return
    setOpening(true)
    window.setTimeout(onOpen, 1200)
  }

  return (
    <div
      className={`block-reveal ${opening ? 'block-reveal--opening' : ''}`}
      onClick={handleOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleOpen()
        }
      }}
      role="button"
      tabIndex={0}
      aria-label="Open birthday world"
    >
      <div className="block-reveal__sky" />
      <div className="block-reveal__wall block-reveal__wall--left">
        {Array.from({ length: 48 }).map((_, i) => (
          <span key={i} className={`block-reveal__block block-reveal__block--${i % 3}`} />
        ))}
      </div>
      <div className="block-reveal__wall block-reveal__wall--right">
        {Array.from({ length: 48 }).map((_, i) => (
          <span key={i} className={`block-reveal__block block-reveal__block--${(i + 1) % 3}`} />
        ))}
      </div>

      <div className="block-reveal__prompt">
        <div className="block-reveal__chars">
          <McReenaSkin animate="bounce" />
          <McFriendSkin animate="bob" />
        </div>
        <div className="block-reveal__hearts">
          <PixelHeart />
          <PixelHeart animate="float" />
          <PixelHeart animate="bob" />
        </div>
        <p className="block-reveal__title mc-pixel">for reena</p>
        <p className="block-reveal__tap mc-pixel">tap to enter</p>
      </div>
    </div>
  )
}
