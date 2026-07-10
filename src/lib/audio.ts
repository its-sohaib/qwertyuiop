/**
 * Page audio: looping MP3 track + tiny Web Audio SFX.
 * Volume stays modest. Mute toggle controls everything.
 */

type AmbienceMode = 'day' | 'cave' | 'night' | 'off'

const TRACK_SRC = '/assets/ambience.mp3'
const TRACK_VOLUME = 0.38
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
    const audio = new Audio(TRACK_SRC)
    audio.loop = true
    audio.preload = 'auto'
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

  async start() {
    if (this.started) return
    this.ensureCtx()
    if (this.ctx?.state === 'suspended') {
      await this.ctx.resume()
    }

    const track = this.ensureTrack()
    track.volume = this.muted ? 0 : TRACK_VOLUME
    try {
      await track.play()
    } catch {
      /* autoplay blocked — mute toggle / next gesture can retry */
    }

    this.started = true
    this.setMode('day')
    this.notify()
  }

  private playTone(freq: number, duration: number, volume: number, type: OscillatorType = 'sine') {
    if (!this.ctx || !this.master || this.muted) return
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
      if (!muted && this.started && this.track.paused) {
        void this.track.play().catch(() => {})
      }
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
      mode === 'night' ? TRACK_VOLUME * 0.85 :
      mode === 'cave' ? TRACK_VOLUME * 0.7 :
      TRACK_VOLUME
    this.track.volume = vol
  }
}

export const adventureAudio = new AdventureAudio()
