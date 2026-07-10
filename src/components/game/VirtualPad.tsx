import { useEffect, useRef, useState } from 'react'
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
  const [knob, setKnob] = useState({ x: 0, y: 0 })
  const [pressed, setPressed] = useState<Partial<InputState>>({})

  function clear() {
    active.current = false
    origin.current = null
    onMove(IDLE)
    setKnob({ x: 0, y: 0 })
    setPressed({})
  }

  useEffect(() => {
    if (!visible) clear()
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const rawX = clientX - origin.current.x
    const rawY = clientY - origin.current.y
    const max = 36
    const len = Math.hypot(rawX, rawY) || 1
    const scale = Math.min(1, max / len)
    const kx = rawX * scale
    const ky = rawY * scale
    setKnob({ x: kx, y: ky })

    const dead = 14
    const next = {
      left: rawX < -dead,
      right: rawX > dead,
      up: rawY < -dead,
      down: rawY > dead,
    }
    setPressed(next)
    onMove(next)
  }

  return (
    <div className={`vpad ${visible ? 'vpad--on' : ''}`} aria-hidden={!visible}>
      <div
        className="vpad__stick"
        onPointerDown={(e) => {
          e.preventDefault()
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
        <span className="vpad__ring" aria-hidden="true" />
        <span className={`vpad__dir vpad__dir--up ${pressed.up ? 'is-on' : ''}`} aria-hidden="true">
          ▲
        </span>
        <span className={`vpad__dir vpad__dir--down ${pressed.down ? 'is-on' : ''}`} aria-hidden="true">
          ▼
        </span>
        <span className={`vpad__dir vpad__dir--left ${pressed.left ? 'is-on' : ''}`} aria-hidden="true">
          ◀
        </span>
        <span className={`vpad__dir vpad__dir--right ${pressed.right ? 'is-on' : ''}`} aria-hidden="true">
          ▶
        </span>
        <span
          className="vpad__knob"
          style={{ transform: `translate(${knob.x}px, ${knob.y}px)` }}
          aria-hidden="true"
        />
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
        <span className="vpad__interact-glow" aria-hidden="true" />
        ✦
      </button>
    </div>
  )
}
