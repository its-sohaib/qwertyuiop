import { useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './PasswordGate.css'

const PASSWORD = '8====D'
const STORAGE_KEY = 'reena-map-unlocked'

type Props = {
  onUnlock: () => void
}

export function PasswordGate({ onUnlock }: Props) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [shaking, setShaking] = useState(false)

  function submit(e: FormEvent) {
    e.preventDefault()
    if (value === PASSWORD) {
      try {
        sessionStorage.setItem(STORAGE_KEY, '1')
      } catch {
        /* ignore */
      }
      onUnlock()
      return
    }
    setError(true)
    setShaking(true)
    window.setTimeout(() => setShaking(false), 420)
  }

  return (
    <motion.div
      className="pw-gate"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45 }}
    >
      <motion.div
        className="pw-gate__card"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="pw-gate__label pixel-heading">private map</p>
        <h1 className="pw-gate__title">enter password</h1>
        <p className="pw-gate__hint">if you know you know</p>

        <form className="pw-gate__form" onSubmit={submit}>
          <motion.div
            animate={shaking ? { x: [-8, 8, -6, 6, -3, 3, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <input
              className={`pw-gate__input ${error ? 'pw-gate__input--error' : ''}`}
              type="password"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              placeholder="••••••••"
              value={value}
              onChange={(e) => {
                setValue(e.target.value)
                if (error) setError(false)
              }}
              aria-label="Password"
              autoFocus
            />
          </motion.div>

          <button type="submit" className="pw-gate__btn">
            unlock
          </button>
        </form>

        <AnimatePresence>
          {error && (
            <motion.p
              className="pw-gate__error"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              role="alert"
            >
              nah. try again unc.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}

export function wasUnlocked(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}
