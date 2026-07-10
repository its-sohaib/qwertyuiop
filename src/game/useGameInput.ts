import { useEffect, useRef } from 'react'

export type InputState = {
  up: boolean
  down: boolean
  left: boolean
  right: boolean
}

const KEY_MAP: Record<string, keyof InputState | 'interact'> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  KeyW: 'up',
  KeyS: 'down',
  KeyA: 'left',
  KeyD: 'right',
  KeyE: 'interact',
  Space: 'interact',
  Enter: 'interact',
}

export function useGameInput(enabled: boolean) {
  const state = useRef<InputState>({
    up: false,
    down: false,
    left: false,
    right: false,
  })
  const interactQueued = useRef(false)

  useEffect(() => {
    if (!enabled) return

    function down(e: KeyboardEvent) {
      const key = KEY_MAP[e.code]
      if (!key) return
      e.preventDefault()
      if (key === 'interact') {
        interactQueued.current = true
        return
      }
      state.current[key] = true
    }

    function up(e: KeyboardEvent) {
      const key = KEY_MAP[e.code]
      if (!key || key === 'interact') return
      state.current[key] = false
    }

    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
      state.current = { up: false, down: false, left: false, right: false }
    }
  }, [enabled])

  function setVirtual(partial: Partial<InputState>) {
    Object.assign(state.current, partial)
  }

  function pulseInteract() {
    interactQueued.current = true
  }

  function takeInteract() {
    if (!interactQueued.current) return false
    interactQueued.current = false
    return true
  }

  return { state, setVirtual, takeInteract, pulseInteract }
}
