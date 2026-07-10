import { Section } from '../ui/Section'
import './StorySection.css'

export function StorySection() {
  return (
    <Section id="story" label="chapter i" title="our story begins">
      <div className="story glass-card">
        <p className="body-text story__p">
          Somewhere between Heartopia sunsets and Minecraft nights, we started building
          something that didn't need a map.
        </p>
        <p className="body-text story__p">
          Two little worlds. One real love. Today we celebrate the person who makes
          every ordinary day feel enchanted.
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
