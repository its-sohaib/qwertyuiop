const MEDIA_ASSETS = [
  '/assets/hero.gif',
  '/assets/lick.gif',
  '/assets/pig_hat.png',
  '/assets/her_portrait.jpeg',
  '/assets/minecraft.jpeg',
  '/assets/heartopia/1.jpeg',
  '/assets/heartopia/2.jpeg',
  '/assets/heartopia/3.jpeg',
  '/assets/heartopia/4.jpeg',
] as const

const AUDIO_ASSETS = ['/assets/ambience.mp3'] as const

let started = false

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => resolve()
    img.onerror = () => resolve()
    img.src = src
  })
}

function preloadAudio(src: string) {
  return new Promise<void>((resolve) => {
    const audio = new Audio()
    audio.preload = 'auto'
    const done = () => resolve()
    audio.addEventListener('canplaythrough', done, { once: true })
    audio.addEventListener('error', done, { once: true })
    audio.src = src
    audio.load()
    // Fallback if event never fires
    window.setTimeout(done, 8000)
  })
}

/** Warm the browser cache for adventure media while the password gate is up. */
export function preloadAdventureAssets() {
  if (started || typeof window === 'undefined') return
  started = true

  // Kick off image fetches immediately (don't await — gate shouldn't block)
  void Promise.all([
    ...MEDIA_ASSETS.map(preloadImage),
    ...AUDIO_ASSETS.map(preloadAudio),
  ])

  // Also hint via link rel=preload for browsers that honor it
  for (const src of MEDIA_ASSETS) {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = src
    document.head.appendChild(link)
  }
  for (const src of AUDIO_ASSETS) {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'audio'
    link.href = src
    document.head.appendChild(link)
  }
}
