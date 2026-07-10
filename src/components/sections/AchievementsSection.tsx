import { Section } from '../ui/Section'
import { AchievementCard } from '../ui/AchievementCard'
import './AchievementsSection.css'

const achievements = [
  { icon: '🎂', title: 'level 20', desc: 'Birthday milestone unlocked. New adventures await.' },
  { icon: '🏠', title: 'home builder', desc: 'Built a world together  brick by brick, laugh by laugh.' },
  { icon: '🌸', title: 'flower biome', desc: 'Found beauty in every biome you wandered into.' },
  { icon: '💜', title: 'best person', desc: 'Achievement permanently unlocked. No take-backs.' },
]

export function AchievementsSection() {
  return (
    <Section id="achievements" label="chapter iv" title="achievements">
      <div className="achievements">
        {achievements.map((a, i) => (
          <AchievementCard key={a.title} {...a} delay={i * 0.1} />
        ))}
      </div>
    </Section>
  )
}
