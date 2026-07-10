import { useRef } from 'react'
import { BiomeShell } from '../ui/BiomeShell'
import { AchievementUnlock } from '../ui/AchievementUnlock'
import { useAudio } from '../../hooks/useAudio'
import './AchievementValley.css'

const achievements = [
  { icon: '🏆', title: 'Hit 20 unc' },
  { icon: '✨', title: 'Still that girl' },
  { icon: '⚡', title: 'Aura farming' },
  { icon: '🗣️', title: 'Yap merchant' },
  { icon: '🐝', title: 'Bee down bad' },
  { icon: '💎', title: 'Rare ahh drop' },
  { icon: '🎬', title: 'Always the plot' },
]

export function AchievementValley() {
  const { playDing } = useAudio()
  const dinged = useRef(new Set<string>())
  const lastDing = useRef(0)

  function handleUnlock(title: string) {
    if (dinged.current.has(title)) return
    dinged.current.add(title)
    const now = Date.now()
    if (now - lastDing.current < 280) return
    lastDing.current = now
    playDing()
  }

  return (
    <BiomeShell id="achievement-valley" emoji="🏆" label="Biome 04" title="Achievement Valley">
      <p className="valley__intro body-copy">
        Inventory looking crazy.
      </p>
      <div className="valley__list">
        {achievements.map((a, i) => (
          <AchievementUnlock
            key={a.title}
            icon={a.icon}
            title={a.title}
            delay={i * 0.12}
            onUnlock={() => handleUnlock(a.title)}
          />
        ))}
      </div>
    </BiomeShell>
  )
}
