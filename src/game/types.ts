export type BiomeId =
  | 'spawn'
  | 'cherry-grove'
  | 'flower-forest'
  | 'enchanted-library'
  | 'achievement-valley'
  | 'hidden-cave'
  | 'night-sky'

export type TileKind =
  | 'void'
  | 'grass'
  | 'cherry'
  | 'flower'
  | 'path'
  | 'stone'
  | 'bookshelf'
  | 'valley'
  | 'cave'
  | 'obsidian'
  | 'night'
  | 'water'
  | 'tree'
  | 'wall'
  | 'portal'

export type InteractKind =
  | 'sign'
  | 'chest'
  | 'loot'
  | 'portrait'
  | 'photos'
  | 'memory'
  | 'book'
  | 'achievement'
  | 'ore'
  | 'lick'
  | 'campfire'
  | 'finale'

export type HotbarItem = {
  id: string
  icon: string
  label: string
}

export type DialogueLine = {
  text: string
  soft?: boolean
}

export type Interactable = {
  id: string
  x: number
  y: number
  kind: InteractKind
  emoji: string
  label: string
  biome: BiomeId
  /** Lines shown in the interact panel */
  lines: DialogueLine[]
  /** Optional media inside the panel */
  image?: string
  imageAlt?: string
  images?: { src: string; alt: string }[]
  /** Item added to hotbar on first interact */
  loot?: HotbarItem
  /** Achievement toast title */
  achievement?: string
  /** Special: show lick gif */
  lick?: boolean
  /** Marks the birthday finale */
  finale?: boolean
  /** Solid collision (trees/walls already solid via tiles) */
  blocking?: boolean
}

export type BiomeMeta = {
  id: BiomeId
  label: string
  title: string
  emoji: string
  phase: 'day' | 'cave' | 'night' | 'hero'
}

export type WorldData = {
  width: number
  height: number
  tiles: TileKind[][]
  solids: Set<TileKind>
  spawn: { x: number; y: number }
  biomes: BiomeMeta[]
  interactables: Interactable[]
}
