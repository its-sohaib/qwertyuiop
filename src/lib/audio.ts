/**
 * Subtle Web Audio ambience — no external files.
 * Soft wind pad + occasional chimes. Volume stays very low.
 */

type AmbienceMode = 'day' | 'cave' | 'night' | 'off'

class AdventureAudio {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private pad: OscillatorNode | null = null
  private padGain: GainNode | null = null
  private filter: BiquadFilterNode | null = null
  private wind: OscillatorNode | null = null
  private windGain: GainNode | null = null
  private chimeTimer: number | null = null
  private muted = false
  private started = false
  private mode: AmbienceMode = 'day'
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

  async start() {
    if (this.started) return
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    this.ctx = new Ctx()
    this.master = this.ctx.createGain()
    this.master.gain.value = this.muted ? 0 : 0.045
    this.master.connect(this.ctx.destination)

    // Soft warm pad
    this.filter = this.ctx.createBiquadFilter()
    this.filter.type = 'lowpass'
    this.filter.frequency.value = 420
    this.filter.Q.value = 0.6
    this.filter.connect(this.master)

    this.padGain = this.ctx.createGain()
    this.padGain.gain.value = 0.55
    this.padGain.connect(this.filter)

    this.pad = this.ctx.createOscillator()
    this.pad.type = 'sine'
    this.pad.frequency.value = 110
    this.pad.connect(this.padGain)
    this.pad.start()

    // Gentle wind noise via detuned triangle
    this.windGain = this.ctx.createGain()
    this.windGain.gain.value = 0.12
    this.windGain.connect(this.filter)

    this.wind = this.ctx.createOscillator()
    this.wind.type = 'triangle'
    this.wind.frequency.value = 55
    this.wind.connect(this.windGain)
    this.wind.start()

    this.started = true
    this.scheduleChimes()
    this.setMode('day')
    this.notify()
  }

  private scheduleChimes() {
    if (!this.ctx || this.chimeTimer) return
    const tick = () => {
      if (!this.muted && this.mode !== 'off' && this.mode !== 'cave') {
        this.playChime()
      }
      const next = 4000 + Math.random() * 7000
      this.chimeTimer = window.setTimeout(tick, next)
    }
    this.chimeTimer = window.setTimeout(tick, 3000)
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

  playChime() {
    const notes = [523.25, 659.25, 783.99, 880]
    const note = notes[Math.floor(Math.random() * notes.length)]
    this.playTone(note, 1.4, 0.018, 'sine')
  }

  playDing() {
    this.playTone(880, 0.35, 0.04, 'triangle')
    this.playTone(1320, 0.45, 0.025, 'sine')
  }

  playSparkle() {
    this.playTone(1200 + Math.random() * 400, 0.25, 0.03, 'sine')
  }

  playChest() {
    this.playTone(220, 0.2, 0.04, 'square')
    window.setTimeout(() => this.playTone(440, 0.35, 0.035, 'triangle'), 120)
    window.setTimeout(() => this.playDing(), 280)
  }

  setMuted(muted: boolean) {
    this.muted = muted
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(muted ? 0 : 0.045, this.ctx.currentTime, 0.08)
    }
    this.notify()
  }

  toggleMute() {
    this.setMuted(!this.muted)
  }

  setMode(mode: AmbienceMode) {
    this.mode = mode
    if (!this.ctx || !this.filter || !this.pad || !this.padGain || !this.windGain) return
    const t = this.ctx.currentTime
    if (mode === 'day') {
      this.filter.frequency.setTargetAtTime(420, t, 0.5)
      this.pad.frequency.setTargetAtTime(110, t, 0.5)
      this.padGain.gain.setTargetAtTime(0.55, t, 0.4)
      this.windGain.gain.setTargetAtTime(0.12, t, 0.4)
    } else if (mode === 'cave') {
      this.filter.frequency.setTargetAtTime(180, t, 0.5)
      this.pad.frequency.setTargetAtTime(65, t, 0.5)
      this.padGain.gain.setTargetAtTime(0.35, t, 0.4)
      this.windGain.gain.setTargetAtTime(0.08, t, 0.4)
    } else if (mode === 'night') {
      this.filter.frequency.setTargetAtTime(320, t, 0.6)
      this.pad.frequency.setTargetAtTime(98, t, 0.6)
      this.padGain.gain.setTargetAtTime(0.7, t, 0.5)
      this.windGain.gain.setTargetAtTime(0.06, t, 0.5)
    }
  }
}

export const adventureAudio = new AdventureAudio()
