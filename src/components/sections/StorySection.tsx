import { Section } from '../ui/Section'
import './StorySection.css'

export function StorySection() {
  return (
    <Section id="story" label="chapter i" title="spawn lore">
      <div className="story glass-card">
        <p className="body-text story__p">
          Somewhere between Heartopia and Minecraft, you became my favorite teammate.
        </p>
        <p className="body-text story__p">
          NPCs could never. Ikaw talaga.
        </p>
        <div className="story__icons" aria-hidden="true">
          <span>🌸</span>
          <span>🏕️</span>
          <span>✨</span>
        </div>
      </div>
    </Section>
  )
}
