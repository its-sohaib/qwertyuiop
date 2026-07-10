import type { TileKind } from './types'

/** Minecraft-ish block palette */
export const TILE_COLORS: Record<TileKind, { top: string; side: string }> = {
  void: { top: '#0c0618', side: '#0c0618' },
  grass: { top: '#5a9e3e', side: '#8b6914' },
  cherry: { top: '#7ec850', side: '#c48b9f' },
  flower: { top: '#6db84a', side: '#5a8f35' },
  path: { top: '#c4a574', side: '#9a7b52' },
  stone: { top: '#8a8a8a', side: '#6e6e6e' },
  bookshelf: { top: '#6b4423', side: '#4a2f18' },
  valley: { top: '#7bc45a', side: '#9b7a3e' },
  cave: { top: '#3d3550', side: '#2a2438' },
  obsidian: { top: '#1a1028', side: '#0e0818' },
  night: { top: '#2a1a48', side: '#1a1030' },
  water: { top: '#3a7ca5', side: '#2a5a7a' },
  tree: { top: '#3d7a28', side: '#5c3a1e' },
  wall: { top: '#4a4a4a', side: '#2e2e2e' },
  portal: { top: '#6b3dff', side: '#3a1a8a' },
}

export function drawWorld(
  ctx: CanvasRenderingContext2D,
  tiles: TileKind[][],
  width: number,
  height: number,
  tileSize: number,
) {
  const tw = width * tileSize
  const th = height * tileSize
  ctx.imageSmoothingEnabled = false

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const kind = tiles[y][x]
      const { top, side } = TILE_COLORS[kind]
      const px = x * tileSize
      const py = y * tileSize

      ctx.fillStyle = top
      ctx.fillRect(px, py, tileSize, tileSize)

      // Subtle block face / checker for depth
      if (kind !== 'void' && kind !== 'portal' && kind !== 'water') {
        ctx.fillStyle = side
        ctx.globalAlpha = 0.18
        ctx.fillRect(px, py + tileSize * 0.72, tileSize, tileSize * 0.28)
        ctx.globalAlpha = 1
      }

      // Pixel grid lines
      ctx.strokeStyle = 'rgba(0,0,0,0.12)'
      ctx.lineWidth = 1
      ctx.strokeRect(px + 0.5, py + 0.5, tileSize - 1, tileSize - 1)

      // Tile accents
      if (kind === 'cherry' && (x + y) % 5 === 0) {
        ctx.fillStyle = '#ffb7c5'
        ctx.fillRect(px + tileSize * 0.35, py + tileSize * 0.2, tileSize * 0.3, tileSize * 0.3)
      }
      if (kind === 'flower' && (x * 3 + y) % 7 === 0) {
        ctx.fillStyle = '#ffd36a'
        ctx.beginPath()
        ctx.arc(px + tileSize * 0.5, py + tileSize * 0.4, tileSize * 0.12, 0, Math.PI * 2)
        ctx.fill()
      }
      if (kind === 'tree') {
        ctx.fillStyle = '#5c3a1e'
        ctx.fillRect(px + tileSize * 0.38, py + tileSize * 0.45, tileSize * 0.24, tileSize * 0.5)
        ctx.fillStyle = '#3d8a28'
        ctx.fillRect(px + tileSize * 0.15, py + tileSize * 0.1, tileSize * 0.7, tileSize * 0.45)
      }
      if (kind === 'bookshelf') {
        ctx.fillStyle = '#c4a574'
        for (let i = 0; i < 3; i++) {
          ctx.fillRect(px + 4, py + 6 + i * (tileSize / 3.2), tileSize - 8, 3)
        }
        ctx.fillStyle = '#e85d3a'
        ctx.fillRect(px + 8, py + 10, 6, tileSize * 0.55)
        ctx.fillStyle = '#4ecf9a'
        ctx.fillRect(px + 18, py + 10, 6, tileSize * 0.55)
      }
      if (kind === 'water') {
        ctx.fillStyle = 'rgba(255,255,255,0.15)'
        ctx.fillRect(px + 4, py + tileSize * 0.3, tileSize - 8, 3)
      }
      if (kind === 'portal') {
        const g = ctx.createLinearGradient(px, py, px + tileSize, py + tileSize)
        g.addColorStop(0, '#9b5cff')
        g.addColorStop(0.5, '#ff9eb5')
        g.addColorStop(1, '#6b3dff')
        ctx.fillStyle = g
        ctx.fillRect(px + 2, py + 2, tileSize - 4, tileSize - 4)
      }
      if (kind === 'cave' && (x + y * 2) % 9 === 0) {
        ctx.fillStyle = '#7ee8c0'
        ctx.globalAlpha = 0.35
        ctx.fillRect(px + tileSize * 0.4, py + tileSize * 0.4, 5, 5)
        ctx.globalAlpha = 1
      }
      if (kind === 'night' && (x * 7 + y * 3) % 11 === 0) {
        ctx.fillStyle = '#ffe4a0'
        ctx.globalAlpha = 0.5
        ctx.fillRect(px + tileSize * 0.45, py + tileSize * 0.35, 3, 3)
        ctx.globalAlpha = 1
      }
      if (kind === 'obsidian') {
        ctx.fillStyle = '#2d1b4e'
        ctx.fillRect(px + 2, py + 2, tileSize - 4, tileSize - 4)
        ctx.fillStyle = '#9b5cff'
        ctx.globalAlpha = 0.25
        ctx.fillRect(px + tileSize * 0.3, py + tileSize * 0.3, tileSize * 0.4, tileSize * 0.4)
        ctx.globalAlpha = 1
      }
    }
  }

  // Soft vignette edges baked lightly
  void tw
  void th
}

export function drawPlayer(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  tileSize: number,
  facing: 'up' | 'down' | 'left' | 'right',
  walkFrame: number,
) {
  const px = x * tileSize
  const py = y * tileSize
  const s = tileSize * 0.72
  const ox = px - s / 2
  const oy = py - s * 0.85

  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.25)'
  ctx.beginPath()
  ctx.ellipse(px, py + 2, s * 0.35, s * 0.12, 0, 0, Math.PI * 2)
  ctx.fill()

  const bob = Math.sin(walkFrame * 0.4) * 2

  // Body (birthday steve — pink sweater energy)
  ctx.fillStyle = '#5c3a1e'
  ctx.fillRect(ox + s * 0.28, oy + s * 0.72 + bob, s * 0.18, s * 0.28) // leg L
  ctx.fillRect(ox + s * 0.54, oy + s * 0.72 + bob, s * 0.18, s * 0.28) // leg R

  ctx.fillStyle = '#ff9eb5'
  ctx.fillRect(ox + s * 0.22, oy + s * 0.38 + bob, s * 0.56, s * 0.4) // torso

  ctx.fillStyle = '#f5c76a'
  ctx.fillRect(ox + s * 0.28, oy + s * 0.08 + bob, s * 0.44, s * 0.36) // head

  // Eyes
  ctx.fillStyle = '#1a1030'
  const eyeY = oy + s * 0.2 + bob
  if (facing === 'left') {
    ctx.fillRect(ox + s * 0.34, eyeY, 4, 4)
  } else if (facing === 'right') {
    ctx.fillRect(ox + s * 0.58, eyeY, 4, 4)
  } else if (facing === 'up') {
    // back of head — no eyes
  } else {
    ctx.fillRect(ox + s * 0.36, eyeY, 4, 4)
    ctx.fillRect(ox + s * 0.56, eyeY, 4, 4)
  }

  // Party hat
  ctx.fillStyle = '#f5c76a'
  ctx.beginPath()
  ctx.moveTo(ox + s * 0.5, oy - 4 + bob)
  ctx.lineTo(ox + s * 0.28, oy + s * 0.12 + bob)
  ctx.lineTo(ox + s * 0.72, oy + s * 0.12 + bob)
  ctx.closePath()
  ctx.fill()
  ctx.fillStyle = '#ff8a5c'
  ctx.fillRect(ox + s * 0.46, oy - 6 + bob, 5, 5)
}
