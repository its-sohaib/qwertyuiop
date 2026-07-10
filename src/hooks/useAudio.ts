import { useSyncExternalStore, useCallback } from 'react'
import { adventureAudio } from '../lib/audio'

function subscribe(cb: () => void) {
  return adventureAudio.subscribe(cb)
}

function getMuted() {
  return adventureAudio.isMuted
}

export function useAudio() {
  const muted = useSyncExternalStore(subscribe, getMuted, () => true)

  const start = useCallback(() => adventureAudio.start(), [])
  const toggleMute = useCallback(() => adventureAudio.toggleMute(), [])
  const playDing = useCallback(() => adventureAudio.playDing(), [])
  const playSparkle = useCallback(() => adventureAudio.playSparkle(), [])
  const playChest = useCallback(() => adventureAudio.playChest(), [])
  const setMode = useCallback((mode: 'day' | 'cave' | 'night' | 'off') => adventureAudio.setMode(mode), [])

  return { muted, start, toggleMute, playDing, playSparkle, playChest, setMode }
}
