import type { BiomeMeta, HotbarItem, Interactable } from '../../game/types'
import './GameHUD.css'

type Props = {
  biome: BiomeMeta
  hotbar: HotbarItem[]
  nearby: Interactable | null
  discovered: number
  total: number
}

const SLOTS = 9

export function GameHUD({ biome, hotbar, nearby, discovered, total }: Props) {
  const slots = Array.from({ length: SLOTS }, (_, i) => hotbar[i] ?? null)

  return (
    <div className="game-hud">
      <div className="game-hud__biome">
        <span className="game-hud__emoji" aria-hidden="true">
          {biome.emoji}
        </span>
        <div>
          <p className="game-hud__label">{biome.label}</p>
          <p className="game-hud__title">{biome.title}</p>
        </div>
      </div>

      <p className="game-hud__progress">
        {discovered} / {total} found
      </p>

      {nearby && (
        <div className="game-hud__prompt" role="status">
          <kbd className="game-hud__key">E</kbd>
          <span>
            {nearby.kind === 'finale' ? 'enter portal' : `check ${nearby.label}`}
          </span>
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
            ) : (
              <span className="game-hud__slot-num" aria-hidden="true">
                {i + 1}
              </span>
            )}
          </div>
        ))}
      </div>

      <p className="game-hud__hint">
        <span className="game-hud__hint-desk">WASD / arrows to move · E to interact</span>
        <span className="game-hud__hint-touch">drag pad to move · tap ✦ to interact</span>
      </p>
    </div>
  )
}
