import { Section } from '../ui/Section'
import { EnchantedBook } from '../ui/EnchantedBook'
import './WishesSection.css'

const wishes = [
  { title: 'wish i', text: 'you valid my nga.' },
  { title: 'wish ii', text: 'i fuk wid yuh heavy. Grabe ka.' },
  { title: 'wish iii', text: 'you da real birthday. Pwede ba?', accent: true },
]

export function WishesSection() {
  return (
    <Section id="wishes" label="chapter ii" title="tiny wishes">
      <p className="wishes__intro body-text">
        Three books. Zero cringe. Tap mo.
      </p>
      <div className="wishes__books">
        {wishes.map((w, i) => (
          <EnchantedBook
            key={w.title}
            title={w.title}
            text={w.text}
            delay={i * 0.12}
            accent={w.accent}
          />
        ))}
      </div>
    </Section>
  )
}
