import { BiomeShell } from '../ui/BiomeShell'
import { EnchantedBook } from '../ui/EnchantedBook'
import './EnchantedLibrary.css'

const pages = [
  'You valid my nga. Obviously.',
  'I fuk wid yuh heavy',
  'You da real birthday',
  '20 already? Welcome unccc',
  'I wanna jujustsu your kaisen',
  'tung tung sahor',
  'cake ahh nga',
  'my delicious ahh nga',
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
        Tap a book. Don't be shy.
      </p>
      <div className="library__shelf">
        {pages.map((text, i) => (
          <EnchantedBook key={text} index={i + 1} text={text} delay={i * 0.06} />
        ))}
      </div>
    </BiomeShell>
  )
}
