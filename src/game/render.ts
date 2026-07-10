import type { TileKind } from './types'

/** Deterministic 0..1 noise from tile coords */
function n(x: number, y: number, salt = 0) {
  const v = Math.sin((x + 11.3) * 12.9898 + (y + 78.2) * 78.233 + salt * 43.17) * 43758.5453
  return v - Math.floor(v)
}

function shade(hex: string, amount: number) {
  const h = hex.replace('#', '')
  const num = parseInt(h.length === 3 ? h.split('').map((c) => c + c).join('') : h, 16)
  const r = Math.min(255, Math.max(0, ((num >> 16) & 255) + amount))
  const g = Math.min(255, Math.max(0, ((num >> 8) & 255) + amount))
  const b = Math.min(255, Math.max(0, (num & 255) + amount))
  return `rgb(${r},${g},${b})`
}

type BlockPalette = {
  top: string
  side: string
  edge?: string
}

const PALETTE: Record<TileKind, BlockPalette> = {
  void: { top: '#0a0414', side: '#0a0414' },
  grass: { top: '#5fbf45', side: '#8b5a2b', edge: '#4aa336' },
  cherry: { top: '#7ed957', side: '#c97b95', edge: '#ffb7c5' },
  flower: { top: '#6dcc4e', side: '#6b9e3a', edge: '#58b03f' },
  path: { top: '#d2b48c', side: '#a8845a', edge: '#c4a06e' },
  stone: { top: '#9a9a9a', side: '#6f6f6f', edge: '#b0b0b0' },
  bookshelf: { top: '#6e3f22', side: '#4a2a14', edge: '#8a5530' },
  valley: { top: '#78d45a', side: '#a07a3c', edge: '#5fbf45' },
  cave: { top: '#3a3348', side: '#241e32', edge: '#4d4560' },
  obsidian: { top: '#1c1030', side: '#0c0818', edge: '#3a2460' },
  night: { top: '#2c1b4e', side: '#160e2c', edge: '#3d2870' },
  water: { top: '#3d8ec4', side: '#24648f', edge: '#5eb0e0' },
  tree: { top: '#3f8f2c', side: '#5c3a1e', edge: '#2f6e20' },
  wall: { top: '#5a5a5a', side: '#3a3a3a', edge: '#727272' },
  portal: { top: '#7a4dff', side: '#3a1a8a', edge: '#ff9eb5' },
}

function drawBlockFace(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  s: number,
  kind: TileKind,
  x: number,
  y: number,
) {
  const p = PALETTE[kind]
  const jitter = Math.floor(n(x, y) * 18) - 9

  // Side / dirt face (bottom strip) — gives Minecraft block depth
  if (kind !== 'void' && kind !== 'water' && kind !== 'portal') {
    ctx.fillStyle = shade(p.side, jitter)
    ctx.fillRect(px, py + s * 0.7, s, s * 0.3)
    ctx.fillStyle = 'rgba(0,0,0,0.18)'
    ctx.fillRect(px, py + s * 0.7, s, 2)
  }

  // Top face
  ctx.fillStyle = shade(p.top, jitter)
  ctx.fillRect(px, py, s, kind === 'water' || kind === 'portal' ? s : s * 0.72)

  // Highlight + shadow edges
  if (kind !== 'void') {
    ctx.fillStyle = 'rgba(255,255,255,0.14)'
    ctx.fillRect(px, py, s, 2)
    ctx.fillRect(px, py, 2, s * 0.7)
    ctx.fillStyle = 'rgba(0,0,0,0.16)'
    ctx.fillRect(px + s - 2, py, 2, s * 0.7)
  }
}

function speckles(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  s: number,
  x: number,
  y: number,
  color: string,
  count: number,
  salt: number,
) {
  ctx.fillStyle = color
  for (let i = 0; i < count; i++) {
    const sx = px + 4 + n(x, y, salt + i) * (s - 10)
    const sy = py + 4 + n(x, y, salt + i + 9) * (s * 0.55)
    const sz = 2 + n(x, y, salt + i + 17) * 3
    ctx.fillRect(sx, sy, sz, sz)
  }
}

function drawGrassBlades(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  s: number,
  x: number,
  y: number,
  color: string,
) {
  ctx.strokeStyle = color
  ctx.lineWidth = 1.5
  for (let i = 0; i < 4; i++) {
    if (n(x, y, 30 + i) < 0.35) continue
    const bx = px + 6 + n(x, y, 40 + i) * (s - 14)
    const by = py + s * 0.35 + n(x, y, 50 + i) * (s * 0.25)
    ctx.beginPath()
    ctx.moveTo(bx, by + 8)
    ctx.lineTo(bx + (n(x, y, 60 + i) - 0.5) * 4, by)
    ctx.stroke()
  }
}

function drawFlower(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  color: string,
  size: number,
) {
  ctx.fillStyle = color
  for (let i = 0; i < 4; i++) {
    const a = (i / 4) * Math.PI * 2
    ctx.beginPath()
    ctx.arc(cx + Math.cos(a) * size * 0.55, cy + Math.sin(a) * size * 0.55, size * 0.45, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.fillStyle = '#ffe566'
  ctx.beginPath()
  ctx.arc(cx, cy, size * 0.35, 0, Math.PI * 2)
  ctx.fill()
}

function drawTreeSprite(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  s: number,
  cherry: boolean,
  x: number,
  y: number,
) {
  // Trunk
  ctx.fillStyle = '#6b4423'
  ctx.fillRect(px + s * 0.38, py + s * 0.42, s * 0.24, s * 0.5)
  ctx.fillStyle = '#4a2f14'
  ctx.fillRect(px + s * 0.38, py + s * 0.42, 3, s * 0.5)

  // Canopy layers
  const leaf = cherry ? '#ff9eb8' : '#3d9e2f'
  const leafDark = cherry ? '#e8789a' : '#2d7a22'
  const leafLite = cherry ? '#ffc4d6' : '#5ecf45'

  ctx.fillStyle = leafDark
  ctx.fillRect(px + s * 0.12, py + s * 0.18, s * 0.76, s * 0.38)
  ctx.fillStyle = leaf
  ctx.fillRect(px + s * 0.18, py + s * 0.08, s * 0.64, s * 0.36)
  ctx.fillStyle = leafLite
  ctx.fillRect(px + s * 0.28, py + s * 0.12, s * 0.22, s * 0.14)

  if (cherry) {
    speckles(ctx, px, py, s, x, y, '#fff0f5', 5, 70)
  } else if (n(x, y, 3) > 0.55) {
    // Apple / fruit
    ctx.fillStyle = '#e85d3a'
    ctx.beginPath()
    ctx.arc(px + s * 0.55, py + s * 0.32, 3, 0, Math.PI * 2)
    ctx.fill()
  }
}

function drawBookshelf(
  ctx: CanvasRenderingContext2D,
  px: number,
  py: number,
  s: number,
  x: number,
  y: number,
) {
  ctx.fillStyle = '#5c3317'
  ctx.fillRect(px + 2, py + 2, s - 4, s * 0.68)
  const colors = ['#e85d3a', '#4ecf9a', '#f5c76a', '#7a4dff', '#ff9eb5', '#3d8ec4']
  for (let row = 0; row < 3; row++) {
    const by = py + 6 + row * (s * 0.2)
    ctx.fillStyle = '#3d220f'
    ctx.fillRect(px + 5, by, s - 10, s * 0.16)
    for (let b = 0; b < 4; b++) {
      const c = colors[Math.floor(n(x, y, row * 10 + b) * colors.length)]
      ctx.fillStyle = c
      ctx.fillRect(px + 7 + b * ((s - 16) / 4), by + 2, (s - 20) / 4, s * 0.12)
    }
  }
}

function drawTileDetail(
  ctx: CanvasRenderingContext2D,
  kind: TileKind,
  px: number,
  py: number,
  s: number,
  x: number,
  y: number,
  tiles: TileKind[][],
) {
  switch (kind) {
    case 'grass':
    case 'valley': {
      drawGrassBlades(ctx, px, py, s, x, y, shade('#3d8a28', Math.floor(n(x, y) * 20) - 10))
      speckles(ctx, px, py, s, x, y, 'rgba(255,255,255,0.12)', 3, 2)
      if (kind === 'valley' && n(x, y, 8) > 0.72) {
        drawFlower(ctx, px + s * 0.45, py + s * 0.35, '#ffd36a', 4)
      }
      break
    }
    case 'cherry': {
      drawGrassBlades(ctx, px, py, s, x, y, '#ffb7c5')
      if (n(x, y, 4) > 0.55) {
        ctx.fillStyle = '#ffb7c5'
        ctx.globalAlpha = 0.7
        ctx.beginPath()
        ctx.ellipse(
          px + 8 + n(x, y, 5) * (s - 16),
          py + 8 + n(x, y, 6) * (s * 0.4),
          4,
          3,
          n(x, y, 7) * Math.PI,
          0,
          Math.PI * 2,
        )
        ctx.fill()
        ctx.globalAlpha = 1
      }
      break
    }
    case 'flower': {
      drawGrassBlades(ctx, px, py, s, x, y, '#4aa336')
      if (n(x, y, 12) > 0.4) {
        const palette = ['#ff6b8a', '#ffd36a', '#c4a8e8', '#ff9eb5', '#7ee8c0']
        const c = palette[Math.floor(n(x, y, 13) * palette.length)]
        drawFlower(
          ctx,
          px + 10 + n(x, y, 14) * (s - 20),
          py + 10 + n(x, y, 15) * (s * 0.4),
          c,
          3.5 + n(x, y, 16) * 2,
        )
      }
      break
    }
    case 'path': {
      speckles(ctx, px, py, s, x, y, 'rgba(90,60,30,0.25)', 6, 20)
      // Path edge stones when next to grass-like tiles
      const neighbors = [
        [0, -1],
        [0, 1],
        [-1, 0],
        [1, 0],
      ] as const
      for (const [dx, dy] of neighbors) {
        const nx = x + dx
        const ny = y + dy
        const nb = tiles[ny]?.[nx]
        if (!nb || nb === 'path' || nb === 'wall' || nb === 'void') continue
        ctx.fillStyle = 'rgba(255,255,255,0.12)'
        if (dy === -1) ctx.fillRect(px, py, s, 3)
        if (dy === 1) ctx.fillRect(px, py + s * 0.65, s, 3)
        if (dx === -1) ctx.fillRect(px, py, 3, s * 0.7)
        if (dx === 1) ctx.fillRect(px + s - 3, py, 3, s * 0.7)
      }
      break
    }
    case 'stone': {
      speckles(ctx, px, py, s, x, y, 'rgba(0,0,0,0.15)', 5, 25)
      speckles(ctx, px, py, s, x, y, 'rgba(255,255,255,0.1)', 3, 26)
      break
    }
    case 'bookshelf':
      drawBookshelf(ctx, px, py, s, x, y)
      break
    case 'tree':
      drawTreeSprite(ctx, px, py, s, n(x, y, 1) > 0.55 || tiles[y]?.[x - 1] === 'cherry' || tiles[y]?.[x + 1] === 'cherry', x, y)
      break
    case 'water': {
      ctx.fillStyle = 'rgba(20,60,100,0.25)'
      ctx.fillRect(px, py + s * 0.55, s, s * 0.45)
      ctx.fillStyle = 'rgba(255,255,255,0.22)'
      ctx.fillRect(px + 6, py + s * 0.25, s * 0.45, 3)
      ctx.fillRect(px + s * 0.4, py + s * 0.45, s * 0.35, 2)
      break
    }
    case 'cave': {
      speckles(ctx, px, py, s, x, y, 'rgba(0,0,0,0.3)', 4, 33)
      if (n(x, y, 34) > 0.78) {
        ctx.fillStyle = '#7ee8c0'
        ctx.globalAlpha = 0.55
        ctx.beginPath()
        ctx.moveTo(px + s * 0.45, py + s * 0.2)
        ctx.lineTo(px + s * 0.55, py + s * 0.45)
        ctx.lineTo(px + s * 0.35, py + s * 0.45)
        ctx.closePath()
        ctx.fill()
        ctx.globalAlpha = 1
      }
      break
    }
    case 'obsidian': {
      ctx.fillStyle = '#12081f'
      ctx.fillRect(px + 3, py + 3, s - 6, s * 0.64)
      speckles(ctx, px, py, s, x, y, 'rgba(155,92,255,0.35)', 4, 40)
      break
    }
    case 'night': {
      speckles(ctx, px, py, s, x, y, 'rgba(255,228,160,0.55)', n(x, y, 44) > 0.7 ? 3 : 1, 45)
      if (n(x, y, 46) > 0.85) {
        ctx.fillStyle = 'rgba(255,158,181,0.25)'
        ctx.beginPath()
        ctx.arc(px + s * 0.5, py + s * 0.35, 6, 0, Math.PI * 2)
        ctx.fill()
      }
      break
    }
    case 'portal': {
      const g = ctx.createLinearGradient(px, py, px + s, py + s)
      g.addColorStop(0, '#9b5cff')
      g.addColorStop(0.45, '#ff9eb5')
      g.addColorStop(1, '#5b2dff')
      ctx.fillStyle = g
      ctx.fillRect(px + 3, py + 3, s - 6, s - 6)
      ctx.fillStyle = 'rgba(255,255,255,0.25)'
      ctx.fillRect(px + s * 0.3, py + s * 0.2, 4, s * 0.55)
      break
    }
    case 'wall': {
      // Cobble pattern
      ctx.fillStyle = '#4a4a4a'
      ctx.fillRect(px, py, s, s)
      ctx.strokeStyle = 'rgba(0,0,0,0.35)'
      ctx.lineWidth = 1
      ctx.strokeRect(px + 1, py + 1, s / 2 - 2, s / 2 - 2)
      ctx.strokeRect(px + s / 2 + 1, py + s / 2 + 1, s / 2 - 2, s / 2 - 2)
      ctx.fillStyle = '#6a6a6a'
      ctx.fillRect(px + 3, py + 3, s / 2 - 6, s / 2 - 6)
      break
    }
    default:
      break
  }
}

export function drawWorld(
  ctx: CanvasRenderingContext2D,
  tiles: TileKind[][],
  width: number,
  height: number,
  tileSize: number,
) {
  ctx.imageSmoothingEnabled = false

  // Deep void backdrop
  ctx.fillStyle = '#070312'
  ctx.fillRect(0, 0, width * tileSize, height * tileSize)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const kind = tiles[y][x]
      if (kind === 'void') continue
      const px = x * tileSize
      const py = y * tileSize
      drawBlockFace(ctx, px, py, tileSize, kind, x, y)
      drawTileDetail(ctx, kind, px, py, tileSize, x, y, tiles)
    }
  }

  // Soft ambient vignette
  const g = ctx.createRadialGradient(
    (width * tileSize) / 2,
    (height * tileSize) / 2,
    Math.min(width, height) * tileSize * 0.2,
    (width * tileSize) / 2,
    (height * tileSize) / 2,
    Math.max(width, height) * tileSize * 0.7,
  )
  g.addColorStop(0, 'rgba(0,0,0,0)')
  g.addColorStop(1, 'rgba(8,4,18,0.35)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, width * tileSize, height * tileSize)
}

/** Per-frame animated overlays (water, portal, petals, sparkles). */
export function drawWorldFX(
  ctx: CanvasRenderingContext2D,
  tiles: TileKind[][],
  width: number,
  height: number,
  tileSize: number,
  camX: number,
  camY: number,
  viewW: number,
  viewH: number,
  time: number,
) {
  const x0 = Math.max(0, Math.floor(camX / tileSize) - 1)
  const y0 = Math.max(0, Math.floor(camY / tileSize) - 1)
  const x1 = Math.min(width, Math.ceil((camX + viewW) / tileSize) + 1)
  const y1 = Math.min(height, Math.ceil((camY + viewH) / tileSize) + 1)

  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      const kind = tiles[y][x]
      const px = x * tileSize - camX
      const py = y * tileSize - camY

      if (kind === 'water') {
        const wave = Math.sin(time * 2.2 + x * 0.7 + y * 0.5) * 3
        ctx.fillStyle = 'rgba(180,230,255,0.28)'
        ctx.fillRect(px + 8 + wave, py + tileSize * 0.3, tileSize * 0.4, 2.5)
        ctx.fillStyle = 'rgba(255,255,255,0.15)'
        ctx.fillRect(px + 14 - wave, py + tileSize * 0.48, tileSize * 0.3, 2)
      }

      if (kind === 'portal') {
        const pulse = 0.35 + Math.sin(time * 3 + x + y) * 0.2
        ctx.fillStyle = `rgba(255,158,181,${pulse})`
        ctx.beginPath()
        ctx.arc(px + tileSize / 2, py + tileSize / 2, 8 + Math.sin(time * 2) * 2, 0, Math.PI * 2)
        ctx.fill()
      }

      if (kind === 'cherry' && n(x, y, 90) > 0.82) {
        const t = time * 0.6 + n(x, y, 91) * 10
        const fx = px + ((t * 12 + n(x, y, 92) * 40) % (tileSize + 20)) - 10
        const fy = py + ((t * 8 + n(x, y, 93) * 30) % (tileSize + 10))
        ctx.fillStyle = 'rgba(255,183,197,0.75)'
        ctx.beginPath()
        ctx.ellipse(fx, fy, 3.5, 2.5, t, 0, Math.PI * 2)
        ctx.fill()
      }

      if ((kind === 'cave' || kind === 'night') && n(x, y, 95) > 0.88) {
        const twinkle = 0.3 + Math.sin(time * 4 + x * 3 + y) * 0.3
        ctx.fillStyle = kind === 'cave' ? `rgba(126,232,192,${twinkle})` : `rgba(255,228,160,${twinkle})`
        ctx.fillRect(px + tileSize * 0.4, py + tileSize * 0.3, 3, 3)
      }

      if (kind === 'flower' && n(x, y, 97) > 0.9) {
        // Tiny bee drift
        const bx = px + tileSize * 0.5 + Math.sin(time * 1.5 + x) * 10
        const by = py + tileSize * 0.25 + Math.cos(time * 1.8 + y) * 6
        ctx.fillStyle = '#f5c76a'
        ctx.fillRect(bx, by, 4, 3)
        ctx.fillStyle = '#1a1030'
        ctx.fillRect(bx + 1, by, 1, 3)
      }
    }
  }
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
  const s = tileSize * 0.78
  const ox = px - s / 2
  const oy = py - s * 0.88
  const bob = Math.sin(walkFrame * 0.4) * 2
  const stride = Math.sin(walkFrame * 0.4) * 3

  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.28)'
  ctx.beginPath()
  ctx.ellipse(px, py + 3, s * 0.32, s * 0.11, 0, 0, Math.PI * 2)
  ctx.fill()

  // Legs
  ctx.fillStyle = '#4a2f14'
  ctx.fillRect(ox + s * 0.28, oy + s * 0.72 + bob, s * 0.16, s * 0.28 + (facing !== 'left' ? stride * 0.3 : 0))
  ctx.fillRect(ox + s * 0.56, oy + s * 0.72 + bob, s * 0.16, s * 0.28 - (facing !== 'left' ? stride * 0.3 : 0))

  // Torso
  ctx.fillStyle = '#ff8fb3'
  ctx.fillRect(ox + s * 0.22, oy + s * 0.38 + bob, s * 0.56, s * 0.4)
  ctx.fillStyle = '#ffc4d6'
  ctx.fillRect(ox + s * 0.22, oy + s * 0.38 + bob, s * 0.56, 4)

  // Arms
  ctx.fillStyle = '#f5c76a'
  if (facing === 'left') {
    ctx.fillRect(ox + s * 0.08, oy + s * 0.42 + bob, s * 0.16, s * 0.28)
  } else if (facing === 'right') {
    ctx.fillRect(ox + s * 0.76, oy + s * 0.42 + bob, s * 0.16, s * 0.28)
  } else {
    ctx.fillRect(ox + s * 0.1, oy + s * 0.42 + bob, s * 0.14, s * 0.26)
    ctx.fillRect(ox + s * 0.76, oy + s * 0.42 + bob, s * 0.14, s * 0.26)
  }

  // Head
  ctx.fillStyle = '#f5c76a'
  ctx.fillRect(ox + s * 0.26, oy + s * 0.06 + bob, s * 0.48, s * 0.38)
  ctx.fillStyle = '#e8b85a'
  ctx.fillRect(ox + s * 0.26, oy + s * 0.06 + bob, s * 0.48, 4)

  // Eyes / face
  ctx.fillStyle = '#1a1030'
  const eyeY = oy + s * 0.2 + bob
  if (facing === 'left') {
    ctx.fillRect(ox + s * 0.32, eyeY, 4, 4)
  } else if (facing === 'right') {
    ctx.fillRect(ox + s * 0.58, eyeY, 4, 4)
  } else if (facing !== 'up') {
    ctx.fillRect(ox + s * 0.34, eyeY, 4, 4)
    ctx.fillRect(ox + s * 0.54, eyeY, 4, 4)
    ctx.fillStyle = '#e85d3a'
    ctx.fillRect(ox + s * 0.42, eyeY + 8, 6, 2)
  }

  // Party hat
  ctx.fillStyle = '#ff6b8a'
  ctx.beginPath()
  ctx.moveTo(ox + s * 0.5, oy - 6 + bob)
  ctx.lineTo(ox + s * 0.26, oy + s * 0.12 + bob)
  ctx.lineTo(ox + s * 0.74, oy + s * 0.12 + bob)
  ctx.closePath()
  ctx.fill()
  ctx.fillStyle = '#f5c76a'
  ctx.fillRect(ox + s * 0.26, oy + s * 0.1 + bob, s * 0.48, 3)
  ctx.fillStyle = '#ffe566'
  ctx.beginPath()
  ctx.arc(ox + s * 0.5, oy - 7 + bob, 3.5, 0, Math.PI * 2)
  ctx.fill()
}

export function drawInteractable(
  ctx: CanvasRenderingContext2D,
  ix: number,
  iy: number,
  emoji: string,
  found: boolean,
  highlight: boolean,
  time: number,
  index: number,
) {
  const bob = Math.sin(time * 2.4 + index) * 4
  const glow = 0.35 + Math.sin(time * 3 + index) * 0.15

  ctx.fillStyle = found ? `rgba(78,207,154,${glow})` : `rgba(245,199,106,${glow})`
  ctx.beginPath()
  ctx.ellipse(ix, iy + 14, 18, 8, 0, 0, Math.PI * 2)
  ctx.fill()

  // Pedestal block
  ctx.fillStyle = found ? '#3d7a5a' : '#8a6a30'
  ctx.fillRect(ix - 12, iy + 4 + bob * 0.2, 24, 10)
  ctx.fillStyle = found ? '#4ecf9a' : '#f5c76a'
  ctx.fillRect(ix - 12, iy + 4 + bob * 0.2, 24, 3)

  if (highlight) {
    ctx.strokeStyle = 'rgba(255,228,160,0.95)'
    ctx.lineWidth = 2
    ctx.setLineDash([5, 4])
    ctx.strokeRect(ix - 22, iy - 34 + bob, 44, 44)
    ctx.setLineDash([])
    ctx.fillStyle = 'rgba(255,228,160,0.12)'
    ctx.fillRect(ix - 22, iy - 34 + bob, 44, 44)
  }

  ctx.font = '26px serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.globalAlpha = found ? 0.6 : 1
  ctx.fillText(emoji, ix, iy - 10 + bob)
  ctx.globalAlpha = 1
}
