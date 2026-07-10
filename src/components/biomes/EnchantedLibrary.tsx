import { BiomeShell } from '../ui/BiomeShell'
import { EnchantedBook } from '../ui/EnchantedBook'
import './EnchantedLibrary.css'

const pages = [
  'You valid my nga.',
  'I fuk wid yuh heavy.',
  'You really da birthday.',
  'Certified Level 20.',
  'No cap, W human.',
  'Actually built different.',
  'Hope this year drops legendary loot.',
  'May your RNG be absolutely cracked.',
]

export function EnchantedLibrary() {
  return (
    <BiomeShell
      id="enchanted-library"
      emoji="📖"
      label="Biome 03"
      title="Enchanted Library"
      tone="library"
    >
      <p className="library__intro body-copy">
        Open a book. Short pages only.
      </p>
      <div className="library__shelf">
        {pages.map((text, i) => (
          <EnchantedBook key={text} index={i + 1} text={text} delay={i * 0.06} />
        ))}
      </div>
    </BiomeShell>
  )
}
