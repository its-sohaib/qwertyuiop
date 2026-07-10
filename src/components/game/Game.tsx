import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  biomeAt,
  collides,
  createWorld,
  nearestInteractable,
  TILE,
  BIOMES,
} from '../../game/world'
import { drawPlayer, drawWorld } from '../../game/render'
import type { HotbarItem, Interactable } from '../../game/types'
import { useGameInput } from '../../game/useGameInput'
import { useAudio } from '../../hooks/useAudio'
import { GameHUD } from './GameHUD'
import { VirtualPad } from './VirtualPad'
import { InteractModal } from './InteractModal'
import { AchievementToast } from './AchievementToast'
import './Game.css'

type Facing = 'up' | 'down' | 'left' | 'right'

type Props = {
  active: boolean
}

const SPEED = 3.6

export function Game({ active }: Props) {
  const world = useMemo(() => createWorld(), [])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const worldCanvasRef = useRef<HTMLCanvasElement | null>(null)
  const pos = useRef({ x: world.spawn.x, y: world.spawn.y })
  const facing = useRef<Facing>('down')
  const walkFrame = useRef(0)
  const cam = useRef({ x: 0, y: 0 })
  const raf = useRef(0)
  const last = useRef(0)
  const openedRef = useRef(false)
  const discoveredRef = useRef(new Set<string>())

  const { state, setVirtual, takeInteract, pulseInteract } = useGameInput(active)
  const { playDing, playSparkle, playChest, setMode } = useAudio()
  const sfx = useRef({ playDing, playSparkle, playChest })
  sfx.current = { playDing, playSparkle, playChest }

  const [biomeId, setBiomeId] = useState(biomeAt(Math.floor(world.spawn.x), Math.floor(world.spawn.y)))
  const [nearby, setNearby] = useState<Interactable | null>(null)
  const [opened, setOpened] = useState<Interactable | null>(null)
  const [discoveredCount, setDiscoveredCount] = useState(0)
  const [hotbar, setHotbar] = useState<HotbarItem[]>([])
  const [toast, setToast] = useState<string | null>(null)
  const viewport = useRef({ w: window.innerWidth, h: window.innerHeight })

  useEffect(() => {
    openedRef.current = Boolean(opened)
  }, [opened])

  useEffect(() => {
    const c = document.createElement('canvas')
    c.width = world.width * TILE
    c.height = world.height * TILE
    const ctx = c.getContext('2d')
    if (!ctx) return
    drawWorld(ctx, world.tiles, world.width, world.height, TILE)
    worldCanvasRef.current = c
  }, [world])

  useEffect(() => {
    function resize() {
      viewport.current = { w: window.innerWidth, h: window.innerHeight }
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  useEffect(() => {
    const meta = BIOMES.find((b) => b.id === biomeId)
    if (!meta) return
    setMode(meta.phase === 'hero' ? 'day' : meta.phase)
  }, [biomeId, setMode])

  const handleOpen = useCallback((item: Interactable) => {
    setOpened(item)
    const first = !discoveredRef.current.has(item.id)

    if (item.kind === 'chest' || item.id === 'treasure') sfx.current.playChest()
    else if (item.kind === 'achievement') sfx.current.playDing()
    else sfx.current.playSparkle()

    if (!first) return

    discoveredRef.current.add(item.id)
    setDiscoveredCount(discoveredRef.current.size)

    if (item.loot) {
      setHotbar((prev) => {
        if (prev.some((p) => p.id === item.loot!.id)) return prev
        return [...prev, item.loot!].slice(-9)
      })
    }
    if (item.achievement) {
      setToast(item.achievement)
      window.setTimeout(() => setToast(null), 2800)
    }
  }, [])

  const openRef = useRef(handleOpen)
  openRef.current = handleOpen

  useEffect(() => {
    if (!active) return

    function frame(t: number) {
      const dt = Math.min(0.05, (t - (last.current || t)) / 1000)
      last.current = t

      const input = state.current
      let dx = 0
      let dy = 0
      if (!openedRef.current) {
        if (input.up) dy -= 1
        if (input.down) dy += 1
        if (input.left) dx -= 1
        if (input.right) dx += 1
      }

      if (dx || dy) {
        const len = Math.hypot(dx, dy) || 1
        dx = (dx / len) * SPEED * dt
        dy = (dy / len) * SPEED * dt
        if (Math.abs(dx) > Math.abs(dy)) facing.current = dx > 0 ? 'right' : 'left'
        else facing.current = dy > 0 ? 'down' : 'up'

        const nextX = pos.current.x + dx
        const nextY = pos.current.y + dy
        if (!collides(world, nextX, pos.current.y)) pos.current.x = nextX
        if (!collides(world, pos.current.x, nextY)) pos.current.y = nextY
        walkFrame.current += dt * 14
      }

      const { w: vw, h: vh } = viewport.current
      const worldW = world.width * TILE
      const worldH = world.height * TILE
      let cx = pos.current.x * TILE - vw / 2
      let cy = pos.current.y * TILE - vh / 2
      cx = Math.max(0, Math.min(cx, Math.max(0, worldW - vw)))
      cy = Math.max(0, Math.min(cy, Math.max(0, worldH - vh)))
      cam.current.x += (cx - cam.current.x) * Math.min(1, dt * 8)
      cam.current.y += (cy - cam.current.y) * Math.min(1, dt * 8)

      const bid = biomeAt(Math.floor(pos.current.x), Math.floor(pos.current.y))
      setBiomeId((prev) => (prev === bid ? prev : bid))

      const near = nearestInteractable(world, pos.current.x, pos.current.y)
      setNearby((prev) => (prev?.id === near?.id ? prev : near))

      if (takeInteract() && near && !openedRef.current) {
        openRef.current(near)
      }

      // Achievements pop when you walk up on them (minecraft energy)
      if (near?.kind === 'achievement' && !discoveredRef.current.has(near.id) && !openedRef.current) {
        openRef.current(near)
      }

      const canvas = canvasRef.current
      const baked = worldCanvasRef.current
      if (canvas && baked) {
        const ctx = canvas.getContext('2d')
        if (ctx) {
          if (canvas.width !== vw || canvas.height !== vh) {
            canvas.width = vw
            canvas.height = vh
          }
          ctx.imageSmoothingEnabled = false
          ctx.fillStyle = '#0c0618'
          ctx.fillRect(0, 0, vw, vh)
          ctx.drawImage(baked, cam.current.x, cam.current.y, vw, vh, 0, 0, vw, vh)

          for (const item of world.interactables) {
            const ix = item.x * TILE + TILE * 0.5 - cam.current.x
            const iy = item.y * TILE + TILE * 0.5 - cam.current.y
            if (ix < -48 || iy < -48 || ix > vw + 48 || iy > vh + 48) continue
            const found = discoveredRef.current.has(item.id)
            const highlight = near?.id === item.id

            ctx.fillStyle = found ? 'rgba(78,207,154,0.4)' : 'rgba(245,199,106,0.4)'
            ctx.beginPath()
            ctx.ellipse(ix, iy + 12, 16, 7, 0, 0, Math.PI * 2)
            ctx.fill()

            if (highlight) {
              ctx.strokeStyle = 'rgba(255,228,160,0.9)'
              ctx.lineWidth = 2
              ctx.setLineDash([4, 3])
              ctx.strokeRect(ix - 20, iy - 30, 40, 40)
              ctx.setLineDash([])
            }

            ctx.font = '24px serif'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            ctx.globalAlpha = found ? 0.65 : 1
            ctx.fillText(item.emoji, ix, iy - 8)
            ctx.globalAlpha = 1
          }

          const screenTileX = pos.current.x - cam.current.x / TILE
          const screenTileY = pos.current.y - cam.current.y / TILE
          drawPlayer(ctx, screenTileX, screenTileY, TILE, facing.current, walkFrame.current)
        }
      }

      raf.current = requestAnimationFrame(frame)
    }

    last.current = 0
    raf.current = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf.current)
  }, [active, world, state, takeInteract])

  const biome = BIOMES.find((b) => b.id === biomeId) ?? BIOMES[0]

  return (
    <div className={`game ${active ? 'game--live' : ''}`}>
      <canvas ref={canvasRef} className="game__canvas" aria-label="Birthday adventure map" />

      <GameHUD
        biome={biome}
        hotbar={hotbar}
        nearby={nearby}
        discovered={discoveredCount}
        total={world.interactables.length}
      />

      <VirtualPad onMove={setVirtual} onInteract={pulseInteract} visible={active && !opened} />

      <AchievementToast message={toast} />

      <InteractModal item={opened} onClose={() => setOpened(null)} />
    </div>
  )
}
