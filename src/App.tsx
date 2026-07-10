import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { WorldSky } from './components/scenery/WorldSky'
import { AmbientLife } from './components/scenery/AmbientLife'
import { MuteToggle } from './components/audio/MuteToggle'
import { PasswordGate, wasUnlocked } from './components/intro/PasswordGate'
import { HeroBiome } from './components/biomes/HeroBiome'
import { CherryGrove } from './components/biomes/CherryGrove'
import { FlowerForest } from './components/biomes/FlowerForest'
import { EnchantedLibrary } from './components/biomes/EnchantedLibrary'
import { AchievementValley } from './components/biomes/AchievementValley'
import { HiddenCave } from './components/biomes/HiddenCave'
import { NightSky } from './components/biomes/NightSky'
import { useAudio } from './hooks/useAudio'
import { preloadAdventureAssets } from './lib/preload'
import './App.css'

type SkyPhase = 'hero' | 'day' | 'cave' | 'night'

const PHASE_BY_ID: Record<string, SkyPhase> = {
  hero: 'hero',
  'cherry-grove': 'day',
  'flower-forest': 'day',
  'enchanted-library': 'day',
  'achievement-valley': 'day',
  'hidden-cave': 'cave',
  'night-sky': 'night',
}

const AUDIO_BY_PHASE: Record<SkyPhase, 'day' | 'cave' | 'night'> = {
  hero: 'day',
  day: 'day',
  cave: 'cave',
  night: 'night',
}

function App() {
  const [unlocked, setUnlocked] = useState(() => wasUnlocked())
  const [started, setStarted] = useState(false)
  const [phase, setPhase] = useState<SkyPhase>('hero')
  const { muted, start, toggleMute, setMode } = useAudio()

  // If session already unlocked, still warm assets ASAP
  useEffect(() => {
    preloadAdventureAssets()
  }, [])

  const begin = useCallback(() => {
    void start()
    setStarted(true)
  }, [start])

  const unlock = useCallback(() => {
    setUnlocked(true)
    void start()
  }, [start])

  const onMuteToggle = useCallback(() => {
    toggleMute()
    // Unmute is a gesture — make sure the track actually starts
    void start()
  }, [toggleMute, start])

  useEffect(() => {
    if (!started) return
    const t = window.setTimeout(() => {
      const el = document.getElementById('cherry-grove')
      if (!el) return
      const top = el.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top, behavior: 'smooth' })
    }, 100)
    return () => window.clearTimeout(t)
  }, [started])

  useEffect(() => {
    document.body.style.overflow = unlocked && started ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [unlocked, started])

  useEffect(() => {
    if (!started) return

    const ids = Object.keys(PHASE_BY_ID)
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    const ratios = new Map<string, number>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio)
        }
        let bestId = 'hero'
        let bestRatio = 0
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio
            bestId = id
          }
        }
        const next = PHASE_BY_ID[bestId] ?? 'day'
        setPhase(next)
        setMode(AUDIO_BY_PHASE[next])
      },
      { threshold: [0.15, 0.35, 0.55, 0.75] },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [started, setMode])

  const ambientVariant =
    phase === 'cave' ? 'cave' : phase === 'night' ? 'night' : phase === 'hero' ? 'petals' : 'default'

  return (
    <div className="app">
      <WorldSky phase={phase} />
      <AmbientLife variant={unlocked && started ? ambientVariant : 'petals'} />

      {unlocked && <MuteToggle muted={muted} onToggle={onMuteToggle} />}

      <AnimatePresence>
        {!unlocked && (
          <PasswordGate key="pw" onUnlock={unlock} />
        )}
      </AnimatePresence>

      {unlocked && (
        <main className={`app__main ${started ? 'app__main--live' : 'app__main--gated'}`}>
          <HeroBiome onBegin={begin} started={started} />

          <div className={`app__journey ${started ? 'app__journey--visible' : ''}`} aria-hidden={!started}>
            <CherryGrove />
            <FlowerForest />
            <EnchantedLibrary />
            <AchievementValley />
            <HiddenCave />
            <NightSky />
          </div>
        </main>
      )}
    </div>
  )
}

export default App
