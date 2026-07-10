import { useState, useEffect } from 'react'
import { Hero } from './components/Hero'
import { Message } from './components/Message'
import { Gallery } from './components/Gallery'
import { Closing } from './components/Closing'
import { PixelHearts } from './components/PixelHearts'
import { Background } from './components/Background'
import { McDecor } from './components/McDecor'
import { BlockReveal } from './components/BlockReveal'
import './App.css'

function App() {
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    document.body.style.overflow = revealed ? '' : 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [revealed])

  return (
    <div className={`app ${revealed ? 'app--revealed' : ''}`}>
      <Background />
      {revealed && (
        <>
          <McDecor />
          <PixelHearts />
        </>
      )}
      <div className={`app__content ${revealed ? 'app__content--visible' : ''}`}>
        <main>
          <Hero />
          <Message />
          <Gallery />
          <Closing />
        </main>
      </div>
      {!revealed && <BlockReveal onOpen={() => setRevealed(true)} />}
    </div>
  )
}

export default App
