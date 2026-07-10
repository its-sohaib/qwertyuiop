import { Section } from '../ui/Section'
import { AchievementCard } from '../ui/AchievementCard'
import './AchievementsSection.css'

const achievements = [
  { icon: '🎂', title: 'level 20', desc: 'Achievement unlocked. Actually built different.' },
  { icon: '🏠', title: 'home base', desc: 'You carried the happiness leaderboard.' },
  { icon: '🌸', title: 'flower quest', desc: 'Touch grass? Nah, collect flowers.' },
  { icon: '💜', title: 'best human', desc: 'Sobrang cute. No hacks detected.' },
]

export function AchievementsSection() {
  return (
    <Section id="achievements" label="chapter iv" title="stats screen">
      <div className="achievements">
        {achievements.map((a, i) => (
          <AchievementCard key={a.title} {...a} delay={i * 0.1} />
        ))}
      </div>
    </Section>
  )
}
