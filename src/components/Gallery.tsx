import type { CSSProperties } from 'react'
import { useReveal } from '../hooks/useReveal'
import { GrassBlock } from './clipart/GrassBlock'
import './Gallery.css'

const heartopiaShots = [
  { src: '/assets/heartopia/1.jpeg', alt: 'Reena in Heartopia by the lavender car' },
  { src: '/assets/heartopia/2.jpeg', alt: 'Lavender and peach flower fields in Heartopia' },
  { src: '/assets/heartopia/3.jpeg', alt: 'Reena in her bubble outfit among the lavender' },
  { src: '/assets/heartopia/4.jpeg', alt: 'Us on a bench under the tree in Heartopia' },
]

export function Gallery() {
  const ref = useReveal<HTMLElement>()

  return (
    <section className="gallery reveal" ref={ref}>
      <div className="gallery__chest mc-panel">
        <div className="gallery__chest-header">
          <GrassBlock animate="bob" className="gallery__slot-icon" />
          <h2 className="gallery__title mc-pixel">memories</h2>
        </div>
        <p className="gallery__hint mc-pixel">scroll →</p>

        <div className="gallery__inventory">
          {heartopiaShots.map((shot, i) => (
            <figure
              key={shot.src}
              className="gallery__slot mc-frame"
              style={{ '--i': i } as CSSProperties}
            >
              <div className="gallery__slot-inner mc-frame__inner">
                <img src={shot.src} alt={shot.alt} loading="lazy" />
              </div>
            </figure>
          ))}
        </div>

        <div className="gallery__divider" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="gallery__divider-block" />
          ))}
        </div>

        <figure className="gallery__featured mc-frame">
          <div className="gallery__featured-label mc-pixel">home base</div>
          <div className="gallery__slot-inner mc-frame__inner">
            <img
              src="/assets/minecraft.jpeg"
              alt="Us together in Minecraft"
              loading="lazy"
            />
          </div>
          <figcaption className="gallery__featured-cap mc-pixel">
            the world we built
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
