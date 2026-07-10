/**
 * Page audio: looping MP3 track + tiny Web Audio SFX.
 * Starts on a user gesture (password unlock / Begin Adventure / unmute).
 */

type AmbienceMode = 'day' | 'cave' | 'night' | 'off'

const TRACK_SRC = '/assets/ambience.mp3'
const TRACK_VOLUME = 0.55
const SFX_VOLUME = 0.05

class AdventureAudio {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private track: HTMLAudioElement | null = null
  private muted = false
  private started = false
  private listeners = new Set<() => void>()

  get isMuted() {
    return this.muted
  }

  get isStarted() {
    return this.started
  }

  subscribe(fn: () => void) {
    this.listeners.add(fn)
    return () => this.listeners.delete(fn)
  }

  private notify() {
    this.listeners.forEach((fn) => fn())
  }

  private ensureTrack() {
    if (this.track) return this.track
    const audio = document.createElement('audio')
    audio.src = TRACK_SRC
    audio.loop = true
    audio.preload = 'auto'
    audio.setAttribute('playsinline', '')
    audio.volume = this.muted ? 0 : TRACK_VOLUME
    this.track = audio
    return audio
  }

  private ensureCtx() {
    if (this.ctx && this.master) return
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    this.ctx = new Ctx()
    this.master = this.ctx.createGain()
    this.master.gain.value = this.muted ? 0 : SFX_VOLUME
    this.master.connect(this.ctx.destination)
  }

  async playTrack() {
    const track = this.ensureTrack()
    if (this.muted) {
      track.volume = 0
      return
    }
    track.volume = TRACK_VOLUME
    if (track.paused) {
      await track.play()
    }
  }

  async start() {
    this.ensureCtx()
    if (this.ctx?.state === 'suspended') {
      await this.ctx.resume().catch(() => {})
    }

    try {
      await this.playTrack()
    } catch {
      // Retry once after a tick — some browsers need the element fully wired
      try {
        await new Promise((r) => setTimeout(r, 50))
        await this.playTrack()
      } catch {
        /* still blocked */
      }
    }

    this.started = true
    this.notify()
  }

  private playTone(freq: number, duration: number, volume: number, type: OscillatorType = 'sine') {
    if (!this.ctx || !this.master || this.muted) return
    if (this.ctx.state === 'suspended') void this.ctx.resume()
    const osc = this.ctx.createOscillator()
    const gain = this.ctx.createGain()
    osc.type = type
    osc.frequency.value = freq
    gain.gain.setValueAtTime(0, this.ctx.currentTime)
    gain.gain.linearRampToValueAtTime(volume, this.ctx.currentTime + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration)
    osc.connect(gain)
    gain.connect(this.master)
    osc.start()
    osc.stop(this.ctx.currentTime + duration + 0.05)
  }

  playDing() {
    this.playTone(880, 0.35, 0.55, 'triangle')
    this.playTone(1320, 0.45, 0.35, 'sine')
  }

  playSparkle() {
    this.playTone(1200 + Math.random() * 400, 0.25, 0.4, 'sine')
  }

  playChest() {
    this.playTone(220, 0.2, 0.5, 'square')
    window.setTimeout(() => this.playTone(440, 0.35, 0.45, 'triangle'), 120)
    window.setTimeout(() => this.playDing(), 280)
  }

  setMuted(muted: boolean) {
    this.muted = muted
    if (this.track) {
      this.track.volume = muted ? 0 : TRACK_VOLUME
      if (!muted) {
        void this.start()
      } else {
        this.track.pause()
      }
    } else if (!muted) {
      void this.start()
    }
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(muted ? 0 : SFX_VOLUME, this.ctx.currentTime, 0.08)
    }
    this.notify()
  }

  toggleMute() {
    this.setMuted(!this.muted)
  }

  setMode(mode: AmbienceMode) {
    if (!this.track || this.muted) return
    const vol =
      mode === 'night' ? TRACK_VOLUME * 0.9 :
      mode === 'cave' ? TRACK_VOLUME * 0.75 :
      TRACK_VOLUME
    this.track.volume = vol
  }
}

export const adventureAudio = new AdventureAudio()
