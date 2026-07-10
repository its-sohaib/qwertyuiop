import { useEffect, useRef } from 'react'
import type { InputState } from '../../game/useGameInput'
import './VirtualPad.css'

type Props = {
  onMove: (partial: Partial<InputState>) => void
  onInteract: () => void
  visible: boolean
}

const IDLE: InputState = { up: false, down: false, left: false, right: false }

export function VirtualPad({ onMove, onInteract, visible }: Props) {
  const origin = useRef<{ x: number; y: number } | null>(null)
  const active = useRef(false)

  function clear() {
    active.current = false
    origin.current = null
    onMove(IDLE)
  }

  useEffect(() => {
    if (!visible) clear()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only reset when pad hides
  }, [visible])

  useEffect(() => {
    function onBlur() {
      clear()
    }
    window.addEventListener('blur', onBlur)
    return () => window.removeEventListener('blur', onBlur)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function apply(clientX: number, clientY: number) {
    if (!origin.current) return
    const dx = clientX - origin.current.x
    const dy = clientY - origin.current.y
    const dead = 18
    onMove({
      left: dx < -dead,
      right: dx > dead,
      up: dy < -dead,
      down: dy > dead,
    })
  }

  return (
    <div className={`vpad ${visible ? 'vpad--on' : ''}`} aria-hidden={!visible}>
      <div
        className="vpad__stick"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId)
          active.current = true
          origin.current = { x: e.clientX, y: e.clientY }
        }}
        onPointerMove={(e) => {
          if (!active.current) return
          apply(e.clientX, e.clientY)
        }}
        onPointerUp={clear}
        onPointerCancel={clear}
      >
        <span className="vpad__knob" aria-hidden="true" />
        <span className="sr-only">Move</span>
      </div>

      <button
        type="button"
        className="vpad__interact"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          clear()
          onInteract()
        }}
        aria-label="Interact"
      >
        ✦
      </button>
    </div>
  )
}
