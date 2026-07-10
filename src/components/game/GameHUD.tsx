import type { BiomeMeta, HotbarItem, Interactable } from '../../game/types'
import './GameHUD.css'

type Props = {
  biome: BiomeMeta
  hotbar: HotbarItem[]
  nearby: Interactable | null
  discovered: number
  total: number
  showHint?: boolean
}

const SLOTS = 9

export function GameHUD({ biome, hotbar, nearby, discovered, total, showHint = true }: Props) {
  const slots = Array.from({ length: SLOTS }, (_, i) => hotbar[i] ?? null)

  return (
    <div className="game-hud">
      <div className="game-hud__top">
        <div className="game-hud__biome">
          <span className="game-hud__emoji" aria-hidden="true">
            {biome.emoji}
          </span>
          <div className="game-hud__biome-text">
            <p className="game-hud__label">{biome.label}</p>
            <p className="game-hud__title">{biome.title}</p>
          </div>
        </div>

        <p className="game-hud__progress">
          {discovered}/{total}
        </p>
      </div>

      {nearby && (
        <div className="game-hud__prompt" role="status">
          <span className="game-hud__prompt-icon" aria-hidden="true">
            ✦
          </span>
          <span>
            {nearby.kind === 'finale' ? 'enter portal' : `check ${nearby.label}`}
          </span>
          <kbd className="game-hud__key">E</kbd>
        </div>
      )}

      <div className="game-hud__hotbar" aria-label="Inventory">
        {slots.map((item, i) => (
          <div key={i} className={`game-hud__slot ${item ? 'game-hud__slot--filled' : ''}`}>
            {item ? (
              <>
                <span className="game-hud__slot-icon" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="sr-only">{item.label}</span>
              </>
            ) : null}
          </div>
        ))}
      </div>

      {showHint && (
        <p className="game-hud__hint">
          <span className="game-hud__hint-desk">WASD / arrows · E to interact</span>
          <span className="game-hud__hint-touch">drag to move · tap ✦</span>
        </p>
      )}
    </div>
  )
}
