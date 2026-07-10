import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { LayeredBackground } from './components/scenery/LayeredBackground'
import { AmbientParticles } from './components/scenery/AmbientParticles'
import { WorldGate } from './components/intro/WorldGate'
import { HeroSection } from './components/sections/HeroSection'
import { StorySection } from './components/sections/StorySection'
import { WishesSection } from './components/sections/WishesSection'
import { MemoriesSection } from './components/sections/MemoriesSection'
import { AchievementsSection } from './components/sections/AchievementsSection'
import { SecretsSection } from './components/sections/SecretsSection'
import { FinaleSection } from './components/sections/FinaleSection'
import './App.css'

function App() {
  const [started, setStarted] = useState(false)

  useEffect(() => {
    document.body.style.overflow = started ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [started])

  function scrollToStory() {
    document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="app">
      <LayeredBackground />
      {started && <AmbientParticles />}

      <AnimatePresence>
        {!started && <WorldGate key="gate" onStart={() => setStarted(true)} />}
      </AnimatePresence>

      {started && (
        <main className="app__journey">
          <HeroSection onScrollDown={scrollToStory} />
          <StorySection />
          <WishesSection />
          <MemoriesSection />
          <AchievementsSection />
          <SecretsSection />
          <FinaleSection />
        </main>
      )}
    </div>
  )
}

export default App
