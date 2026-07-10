import './sprites.css'

type Props = { className?: string; animate?: string }

export function McBee({ className = '', animate = 'float' }: Props) {
  return (
    <svg
      viewBox="0 0 28 24"
      className={`sprite sprite--${animate} ${className}`}
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      <rect x="8" y="8" width="12" height="10" fill="#fdd835" />
      <rect x="8" y="10" width="12" height="2" fill="#2a2118" />
      <rect x="8" y="14" width="12" height="2" fill="#2a2118" />
      <rect x="4" y="10" width="4" height="3" fill="#fff" opacity="0.7" />
      <rect x="20" y="10" width="4" height="3" fill="#fff" opacity="0.7" />
      <rect x="2" y="6" width="2" height="2" fill="#2a2118" />
      <rect x="24" y="6" width="2" height="2" fill="#2a2118" />
      <rect x="12" y="4" width="2" height="2" fill="#2a2118" />
      <rect x="14" y="4" width="2" height="2" fill="#2a2118" />
      <rect x="10" y="18" width="3" height="3" fill="#2a2118" />
      <rect x="15" y="18" width="3" height="3" fill="#2a2118" />
    </svg>
  )
}
