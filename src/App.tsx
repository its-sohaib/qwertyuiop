import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { MuteToggle } from './components/audio/MuteToggle'
import { PasswordGate, wasUnlocked } from './components/intro/PasswordGate'
import { TitleScreen } from './components/intro/TitleScreen'
import { Game } from './components/game/Game'
import { useAudio } from './hooks/useAudio'
import { preloadAdventureAssets } from './lib/preload'
import './App.css'

function App() {
  const [unlocked, setUnlocked] = useState(() => wasUnlocked())
  const [started, setStarted] = useState(false)
  const { muted, start, toggleMute } = useAudio()

  useEffect(() => {
    preloadAdventureAssets()
  }, [])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const unlock = useCallback(() => {
    setUnlocked(true)
    void start()
  }, [start])

  const begin = useCallback(() => {
    void start()
    setStarted(true)
  }, [start])

  const onMuteToggle = useCallback(() => {
    toggleMute()
    void start()
  }, [toggleMute, start])

  return (
    <div className="app">
      {unlocked && <MuteToggle muted={muted} onToggle={onMuteToggle} />}

      <AnimatePresence>
        {!unlocked && <PasswordGate key="pw" onUnlock={unlock} />}
      </AnimatePresence>

      {unlocked && !started && <TitleScreen onBegin={begin} />}

      {unlocked && <Game active={started} />}
    </div>
  )
}

export default App
