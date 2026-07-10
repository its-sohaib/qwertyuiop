import './Petals.css'

const PETAL_COUNT = 48

const petals = Array.from({ length: PETAL_COUNT }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 3) % 96}%`,
  delay: `${(i * 0.65) % 12}s`,
  duration: `${10 + (i % 6) * 2.5}s`,
  size: 8 + (i % 5) * 3,
  rotate: (i * 47) % 360,
  drift: -30 + (i % 7) * 12,
  hue: i % 4,
  variant: i % 3,
}))

export function Petals() {
  return (
    <div className="petals" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className={`petal petal--${p.hue} petal--v${p.variant}`}
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            width: p.size,
            height: p.size * 1.35,
            ['--rot' as string]: `${p.rotate}deg`,
            ['--drift' as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  )
}
