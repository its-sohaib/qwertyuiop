import { Section } from '../ui/Section'
import { MemoryCard } from '../ui/MemoryCard'
import './MemoriesSection.css'

const memories = [
  { src: '/assets/heartopia/1.jpeg', alt: 'Reena in Heartopia', label: 'lavender ride' },
  { src: '/assets/heartopia/2.jpeg', alt: 'Flower fields', label: 'flower biome' },
  { src: '/assets/heartopia/3.jpeg', alt: 'Bubble outfit', label: 'bubble era' },
  { src: '/assets/heartopia/4.jpeg', alt: 'Bench under tree', label: 'quiet moment' },
]

export function MemoriesSection() {
  return (
    <Section id="memories" label="chapter iii" title="memory chest">
      <p className="memories__intro body-text">
        Treasures from our worlds  swipe to explore.
      </p>
      <div className="memories__scroll">
        {memories.map((m, i) => (
          <MemoryCard key={m.src} {...m} index={i} />
        ))}
      </div>
      <div className="memories__featured">
        <MemoryCard
          src="/assets/minecraft.jpeg"
          alt="Us in Minecraft"
          label="home base"
          index={4}
          featured
        />
      </div>
    </Section>
  )
}
