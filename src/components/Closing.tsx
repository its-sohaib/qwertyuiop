import { useReveal } from '../hooks/useReveal'
import { PixelHeart } from './clipart/PixelHeart'
import './Closing.css'

export function Closing() {
  const ref = useReveal<HTMLElement>()

  return (
    <footer className="closing reveal" ref={ref}>
      <div className="closing__panel mc-panel">
        <div className="closing__hearts mc-hearts" aria-hidden="true">
          {Array.from({ length: 10 }).map((_, i) => (
            <PixelHeart key={i} className="mc-heart-icon" animate={i % 3 === 0 ? 'bounce' : 'bob'} />
          ))}
        </div>
        <p className="closing__words mc-pixel">can't wait to hug u</p>
        <p className="closing__date mc-pixel">11.06.26</p>
        <div className="closing__chars" aria-hidden="true">
          <span className="closing__char mc-pixel">♥ reena + u ♥</span>
        </div>
      </div>
    </footer>
  )
}
