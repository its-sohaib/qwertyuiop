import './PixelHearts.css'

const hearts = Array.from({ length: 36 }, (_, i) => ({
  id: i,
  left: `${(i * 13 + 5) % 94}%`,
  delay: `${(i * 0.55) % 10}s`,
  duration: `${9 + (i % 5) * 2}s`,
  size: 10 + (i % 4) * 4,
  drift: -20 + (i % 6) * 10,
  variant: i % 3,
}))

export function PixelHearts() {
  return (
    <div className="pixel-hearts" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          className={`pixel-hearts__item pixel-hearts__item--${h.variant}`}
          style={{
            left: h.left,
            animationDelay: h.delay,
            animationDuration: h.duration,
            width: h.size,
            height: h.size * 0.85,
            ['--drift' as string]: `${h.drift}px`,
          }}
        />
      ))}
    </div>
  )
}
