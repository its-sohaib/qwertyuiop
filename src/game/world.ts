import type { BiomeId, BiomeMeta, Interactable, TileKind, WorldData } from './types'

export const TILE = 48

export const BIOMES: BiomeMeta[] = [
  { id: 'spawn', label: 'custom map · july 11', title: 'Spawn', emoji: '✦', phase: 'hero' },
  { id: 'cherry-grove', label: 'Biome 01', title: 'Cherry Grove', emoji: '🌸', phase: 'day' },
  { id: 'flower-forest', label: 'Biome 02', title: 'Flower Forest', emoji: '🌼', phase: 'day' },
  { id: 'enchanted-library', label: 'Biome 03', title: 'Enchanted Library', emoji: '📖', phase: 'day' },
  { id: 'achievement-valley', label: 'Biome 04', title: 'Achievement Valley', emoji: '🏆', phase: 'day' },
  { id: 'hidden-cave', label: 'Biome 05', title: 'Hidden Cave', emoji: '💎', phase: 'cave' },
  { id: 'night-sky', label: 'Biome 06', title: 'Night Sky', emoji: '🌌', phase: 'night' },
]

const W = 52
const H = 40

const SOLIDS = new Set<TileKind>(['void', 'tree', 'wall', 'water', 'bookshelf', 'obsidian'])

/** Fill a rectangle with a tile (inclusive start, exclusive end). */
function fill(
  grid: TileKind[][],
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  kind: TileKind,
) {
  for (let y = y0; y < y1; y++) {
    for (let x = x0; x < x1; x++) {
      if (y >= 0 && y < H && x >= 0 && x < W) grid[y][x] = kind
    }
  }
}

function stampPath(grid: TileKind[][], points: [number, number][]) {
  for (const [x, y] of points) {
    if (y >= 0 && y < H && x >= 0 && x < W) {
      if (grid[y][x] !== 'wall' && grid[y][x] !== 'void') grid[y][x] = 'path'
    }
  }
}

function lineH(grid: TileKind[][], y: number, x0: number, x1: number) {
  const pts: [number, number][] = []
  for (let x = Math.min(x0, x1); x <= Math.max(x0, x1); x++) pts.push([x, y])
  stampPath(grid, pts)
}

function lineV(grid: TileKind[][], x: number, y0: number, y1: number) {
  const pts: [number, number][] = []
  for (let y = Math.min(y0, y1); y <= Math.max(y0, y1); y++) pts.push([x, y])
  stampPath(grid, pts)
}

function scatter(
  grid: TileKind[][],
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  kind: TileKind,
  step: number,
  offset = 0,
) {
  for (let y = y0 + 1; y < y1 - 1; y += step) {
    for (let x = x0 + 1 + ((y + offset) % 2); x < x1 - 1; x += step) {
      if (grid[y][x] === 'grass' || grid[y][x] === 'cherry' || grid[y][x] === 'flower' || grid[y][x] === 'valley') {
        grid[y][x] = kind
      }
    }
  }
}

function buildTiles(): TileKind[][] {
  const grid: TileKind[][] = Array.from({ length: H }, () =>
    Array.from({ length: W }, () => 'void' as TileKind),
  )

  // --- Biome ground fills ---
  // Spawn (NW)
  fill(grid, 1, 1, 12, 12, 'grass')
  // Cherry Grove (N mid)
  fill(grid, 12, 1, 26, 12, 'cherry')
  // Flower Forest (NE)
  fill(grid, 26, 1, 51, 14, 'flower')
  // Enchanted Library (W mid)
  fill(grid, 1, 12, 16, 24, 'stone')
  // Achievement Valley (center)
  fill(grid, 16, 12, 34, 24, 'valley')
  // Path corridor east of valley toward cave entrance
  fill(grid, 34, 14, 40, 22, 'grass')
  // Hidden Cave (SW)
  fill(grid, 1, 24, 22, 39, 'cave')
  // Night Sky (SE)
  fill(grid, 22, 24, 51, 39, 'night')

  // Borders / walls around playable area
  for (let x = 0; x < W; x++) {
    grid[0][x] = 'wall'
    grid[H - 1][x] = 'wall'
  }
  for (let y = 0; y < H; y++) {
    grid[y][0] = 'wall'
    grid[y][W - 1] = 'wall'
  }

  // Decorative trees in cherry + flower (leave path corridors clear)
  scatter(grid, 12, 1, 26, 12, 'tree', 3, 0)
  scatter(grid, 26, 1, 50, 13, 'tree', 4, 1)

  // Extra cherry blossom clusters
  for (const [tx, ty] of [
    [14, 3],
    [20, 8],
    [23, 4],
    [15, 9],
  ] as const) {
    if (grid[ty][tx] === 'cherry') grid[ty][tx] = 'tree'
  }

  // Flower meadow denser patches (keep as flower ground — render draws blooms)
  fill(grid, 30, 3, 36, 7, 'flower')
  fill(grid, 36, 8, 41, 12, 'flower')

  // Library bookshelves (rows)
  for (let y = 14; y <= 21; y += 3) {
    for (let x = 3; x <= 13; x++) {
      if (x % 4 !== 0) grid[y][x] = 'bookshelf'
    }
  }
  // Clear aisle in library
  fill(grid, 7, 13, 10, 23, 'stone')
  fill(grid, 2, 17, 15, 19, 'stone')

  // Valley open field — light tree scatter at edges
  scatter(grid, 17, 13, 33, 23, 'tree', 5, 2)

  // Cave walls / pillars
  for (let y = 26; y < 37; y += 3) {
    for (let x = 3; x < 20; x += 4) {
      if (grid[y][x] === 'cave') grid[y][x] = 'obsidian'
    }
  }
  fill(grid, 8, 28, 14, 34, 'cave') // clear center chamber

  // Night portal frame + approach plaza
  fill(grid, 34, 28, 44, 37, 'night')
  fill(grid, 36, 30, 42, 36, 'obsidian')
  fill(grid, 37, 31, 41, 35, 'portal')

  // Water pond + shore in flower forest
  fill(grid, 41, 3, 48, 9, 'flower')
  fill(grid, 42, 4, 47, 8, 'water')

  // --- Connecting paths (double-wide for mobile readability) ---
  lineH(grid, 6, 5, 18)
  lineH(grid, 7, 5, 18)
  lineH(grid, 6, 18, 32)
  lineH(grid, 7, 18, 32)
  lineV(grid, 32, 6, 10)
  lineV(grid, 33, 6, 10)
  lineV(grid, 8, 6, 18)
  lineV(grid, 9, 6, 18)
  lineH(grid, 18, 8, 24)
  lineH(grid, 19, 8, 24)
  lineH(grid, 18, 24, 36)
  lineH(grid, 19, 24, 36)
  lineV(grid, 36, 18, 28)
  lineV(grid, 37, 18, 28)
  lineH(grid, 28, 14, 36)
  lineH(grid, 29, 14, 36)
  lineH(grid, 32, 14, 38)
  lineH(grid, 33, 14, 38)
  lineV(grid, 38, 10, 28)
  lineV(grid, 39, 10, 28)

  // Clear spawn plaza with path ring
  fill(grid, 3, 3, 10, 10, 'grass')
  lineH(grid, 6, 4, 9)
  lineH(grid, 7, 4, 9)
  grid[5][6] = 'path'
  grid[8][6] = 'path'

  return grid
}

const BOOK_PAGES = [
  'You valid my nga. Obviously.',
  'I fuk wid yuh heavy',
  'You da real birthday',
  '20 already? Welcome unccc',
  'I wanna jujustsu your kaisen',
  'tung tung sahor',
  'cake ahh nga',
  'my delicious ahh nga',
]

const ACHIEVEMENTS = [
  { id: 'ach-20', icon: '🏆', title: 'Hit 20 unc', x: 20, y: 15 },
  { id: 'ach-art', icon: '🎨', title: 'Artistic and shi', x: 24, y: 16 },
  { id: 'ach-movies', icon: '🎬', title: 'movies conosoir', x: 28, y: 15 },
  { id: 'ach-feaky', icon: '😈', title: 'feaky ahh', x: 22, y: 19 },
  { id: 'ach-bunda', icon: '🍑', title: 'Big bundaa', x: 26, y: 20 },
  { id: 'ach-yap', icon: '🗣️', title: 'Yap merchant', x: 30, y: 18 },
  { id: 'ach-aura', icon: '💎', title: 'cake ahh aura', x: 25, y: 17 },
]

function buildInteractables(): Interactable[] {
  // Placed along the clear library aisle so nothing is stuck in shelves
  const bookSpots: [number, number][] = [
    [3, 16],
    [5, 16],
    [11, 16],
    [13, 16],
    [3, 20],
    [5, 20],
    [11, 20],
    [13, 20],
  ]
  const books: Interactable[] = BOOK_PAGES.map((text, i) => ({
    id: `book-${i + 1}`,
    x: bookSpots[i][0],
    y: bookSpots[i][1],
    kind: 'book' as const,
    emoji: '📖',
    label: `page ${i + 1}`,
    biome: 'enchanted-library' as BiomeId,
    lines: [{ text }],
    loot: { id: `page-${i + 1}`, icon: '📜', label: `page ${i + 1}` },
  }))

  const achievements: Interactable[] = ACHIEVEMENTS.map((a) => ({
    id: a.id,
    x: a.x,
    y: a.y,
    kind: 'achievement' as const,
    emoji: a.icon,
    label: a.title,
    biome: 'achievement-valley' as BiomeId,
    lines: [{ text: 'Achievement unlocked!' }, { text: a.title }],
    achievement: a.title,
    loot: { id: a.id, icon: a.icon, label: a.title },
  }))

  return [
    {
      id: 'spawn-sign',
      x: 6,
      y: 6,
      kind: 'sign',
      emoji: '🪧',
      label: 'welcome sign',
      biome: 'spawn',
      lines: [
        { text: 'happy birthday reena' },
        { text: 'damn nga already 20 uncccc' },
        { text: 'Built you a whole map. Touch grass later.', soft: true },
      ],
    },
    {
      id: 'pig-hat',
      x: 18,
      y: 5,
      kind: 'chest',
      emoji: '🐷',
      label: 'rare drop',
      biome: 'cherry-grove',
      image: '/assets/pig_hat.png',
      imageAlt: 'Handmade crochet pig hat',
      lines: [
        { text: 'rare drop unlocked' },
        { text: 'Happy 20 unc.' },
        { text: 'You da real birthday fr.' },
      ],
      loot: { id: 'pig-hat', icon: '🐷', label: 'pig hat' },
    },
    {
      id: 'portrait',
      x: 34,
      y: 5,
      kind: 'portrait',
      emoji: '🖼️',
      label: 'portrait',
      biome: 'flower-forest',
      image: '/assets/her_portrait.jpeg',
      imageAlt: 'Reena in the flower forest',
      lines: [
        { text: 'My Ngaaaaa hehe' },
        { text: 'I fuk wid yuh heavy', soft: true },
      ],
      loot: { id: 'portrait', icon: '💖', label: 'main character' },
    },
    {
      id: 'photos',
      x: 38,
      y: 8,
      kind: 'photos',
      emoji: '📷',
      label: 'photo strip',
      biome: 'flower-forest',
      images: [
        { src: '/assets/heartopia/1.jpeg', alt: 'Heartopia moment' },
        { src: '/assets/heartopia/2.jpeg', alt: 'Flower fields' },
        { src: '/assets/heartopia/3.jpeg', alt: 'Main character fit' },
        { src: '/assets/heartopia/4.jpeg', alt: 'Quiet slay' },
      ],
      lines: [{ text: 'locked in fr' }],
      loot: { id: 'photos', icon: '📷', label: 'heartopia' },
    },
    {
      id: 'mc-memory',
      x: 44,
      y: 10,
      kind: 'memory',
      emoji: '⛏️',
      label: 'minecraft memories',
      biome: 'flower-forest',
      image: '/assets/minecraft.jpeg',
      imageAlt: 'Minecraft memories',
      lines: [{ text: 'locked in' }],
      loot: { id: 'mc-mem', icon: '⛏️', label: 'memories' },
    },
    ...books,
    ...achievements,
    {
      id: 'ore-berry',
      x: 5,
      y: 30,
      kind: 'ore',
      emoji: '🫐',
      label: 'glow berry',
      biome: 'hidden-cave',
      lines: [{ text: 'cake ahh loot fr' }],
      loot: { id: 'glow-berry', icon: '🫐', label: 'glow berry' },
    },
    {
      id: 'ore-amethyst',
      x: 10,
      y: 32,
      kind: 'ore',
      emoji: '💜',
      label: 'amethyst',
      biome: 'hidden-cave',
      lines: [{ text: 'my delicious ahh nga' }],
      loot: { id: 'amethyst', icon: '💜', label: 'amethyst' },
    },
    {
      id: 'lick',
      x: 15,
      y: 30,
      kind: 'lick',
      emoji: '👅',
      label: '???',
      biome: 'hidden-cave',
      lick: true,
      image: '/assets/lick.gif',
      imageAlt: 'screen lick',
      lines: [{ text: 'feaky ahh' }, { text: 'me when I see you fr', soft: true }],
      loot: { id: 'lick', icon: '👅', label: 'caught licking' },
    },
    {
      id: 'campfire',
      x: 7,
      y: 35,
      kind: 'campfire',
      emoji: '🔥',
      label: 'campfire',
      biome: 'hidden-cave',
      lines: [{ text: 'tung tung sahor' }],
      loot: { id: 'campfire', icon: '🔥', label: 'campfire' },
    },
    {
      id: 'treasure',
      x: 16,
      y: 34,
      kind: 'chest',
      emoji: '📦',
      label: 'treasure chest',
      biome: 'hidden-cave',
      lines: [{ text: 'I wanna jujustsu your kaisen' }],
      loot: { id: 'treasure', icon: '✨', label: 'treasure' },
    },
    {
      id: 'finale',
      x: 39,
      y: 33,
      kind: 'finale',
      emoji: '❤️',
      label: 'birthday portal',
      biome: 'night-sky',
      finale: true,
      lines: [
        { text: 'Happy Birthday.' },
        { text: 'Level 20 unlocked unc.' },
        { text: 'Stay you. Stay hard like me.' },
        {
          text: 'Hope this year is soft. Good health, good laughs, good people, and all the wins you been locked in for.',
          soft: true,
        },
      ],
      loot: { id: 'heart', icon: '❤️', label: 'level 20' },
    },
  ]
}

/** Which biome a world tile belongs to. */
export function biomeAt(tx: number, ty: number): BiomeId {
  if (ty >= 24) {
    if (tx < 22) return 'hidden-cave'
    return 'night-sky'
  }
  if (ty >= 12) {
    if (tx < 16) return 'enchanted-library'
    if (tx < 34) return 'achievement-valley'
    return 'spawn'
  }
  if (tx < 12) return 'spawn'
  if (tx < 26) return 'cherry-grove'
  return 'flower-forest'
}

export function createWorld(): WorldData {
  return {
    width: W,
    height: H,
    tiles: buildTiles(),
    solids: SOLIDS,
    spawn: { x: 6.5, y: 7.5 },
    biomes: BIOMES,
    interactables: buildInteractables(),
  }
}

export function isSolid(world: WorldData, tx: number, ty: number): boolean {
  if (tx < 0 || ty < 0 || tx >= world.width || ty >= world.height) return true
  return world.solids.has(world.tiles[ty][tx])
}

/** Axis-aligned collision for a circular-ish player footprint. */
export function collides(world: WorldData, x: number, y: number, radius = 0.28): boolean {
  const minX = Math.floor(x - radius)
  const maxX = Math.floor(x + radius)
  const minY = Math.floor(y - radius)
  const maxY = Math.floor(y + radius)
  for (let ty = minY; ty <= maxY; ty++) {
    for (let tx = minX; tx <= maxX; tx++) {
      if (isSolid(world, tx, ty)) return true
    }
  }
  return false
}

export function nearestInteractable(
  world: WorldData,
  x: number,
  y: number,
  range = 1.6,
): Interactable | null {
  let best: Interactable | null = null
  let bestDist = range
  for (const item of world.interactables) {
    const dx = item.x + 0.5 - x
    const dy = item.y + 0.5 - y
    const d = Math.hypot(dx, dy)
    if (d < bestDist) {
      bestDist = d
      best = item
    }
  }
  return best
}
