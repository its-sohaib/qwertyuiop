import { Section } from '../ui/Section'
import { MemoryCard } from '../ui/MemoryCard'
import './MemoriesSection.css'

const memories = [
  { src: '/assets/heartopia/1.jpeg', alt: 'Reena in Heartopia', label: 'main character energy' },
  { src: '/assets/heartopia/2.jpeg', alt: 'Flower fields', label: 'touch grass? nah' },
  { src: '/assets/heartopia/3.jpeg', alt: 'Bubble outfit', label: 'certified cutie' },
  { src: '/assets/heartopia/4.jpeg', alt: 'Bench under tree', label: 'quiet slay' },
]

export function MemoriesSection() {
  return (
    <Section id="memories" label="chapter iii" title="memory loot">
      <p className="memories__intro body-text">
        Rare loot acquired: your smile.
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
          label="lowkey my favorite human"
          index={4}
          featured
        />
      </div>
    </Section>
  )
}
