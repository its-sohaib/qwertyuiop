import './sprites.css'

type Props = { className?: string; animate?: string; filled?: boolean }

export function PixelHeart({ className = '', animate = 'bob', filled = true }: Props) {
  return (
    <svg
      viewBox="0 0 16 14"
      className={`sprite sprite--${animate} ${className}`}
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      {filled ? (
        <>
          <rect x="2" y="2" width="4" height="4" fill="#ff385e" />
          <rect x="10" y="2" width="4" height="4" fill="#ff385e" />
          <rect x="0" y="4" width="16" height="4" fill="#ff385e" />
          <rect x="2" y="8" width="12" height="2" fill="#ff385e" />
          <rect x="4" y="10" width="8" height="2" fill="#ff385e" />
          <rect x="6" y="12" width="4" height="2" fill="#ff385e" />
          <rect x="3" y="3" width="2" height="2" fill="#ff8fab" opacity="0.6" />
        </>
      ) : (
        <>
          <rect x="2" y="2" width="4" height="1" fill="#555" />
          <rect x="10" y="2" width="4" height="1" fill="#555" />
          <rect x="1" y="3" width="1" height="2" fill="#555" />
          <rect x="6" y="3" width="4" height="1" fill="#555" />
          <rect x="14" y="3" width="1" height="2" fill="#555" />
          <rect x="0" y="5" width="1" height="3" fill="#555" />
          <rect x="15" y="5" width="1" height="3" fill="#555" />
          <rect x="1" y="8" width="1" height="2" fill="#555" />
          <rect x="14" y="8" width="1" height="2" fill="#555" />
          <rect x="2" y="10" width="1" height="1" fill="#555" />
          <rect x="13" y="10" width="1" height="1" fill="#555" />
          <rect x="4" y="11" width="1" height="1" fill="#555" />
          <rect x="11" y="11" width="1" height="1" fill="#555" />
          <rect x="6" y="12" width="4" height="1" fill="#555" />
        </>
      )}
    </svg>
  )
}
