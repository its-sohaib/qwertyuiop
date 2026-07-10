import { BiomeShell } from '../ui/BiomeShell'
import { EnchantedBook } from '../ui/EnchantedBook'
import './EnchantedLibrary.css'

const pages = [
  'You valid my nga.',
  'I fuk wid yuh heavy.',
  'You da real birthday.',
  'Level 20 and still that girl.',
  'No cap you a W.',
  'Stay weird. Stay you.',
  'Hope this year treats you right.',
  'Go get everything you want.',
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
        Tap a book.
      </p>
      <div className="library__shelf">
        {pages.map((text, i) => (
          <EnchantedBook key={text} index={i + 1} text={text} delay={i * 0.06} />
        ))}
      </div>
    </BiomeShell>
  )
}
