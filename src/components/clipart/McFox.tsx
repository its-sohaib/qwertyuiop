import './sprites.css'

type Props = { className?: string; animate?: string }

export function McFox({ className = '', animate = 'wiggle' }: Props) {
  return (
    <svg
      viewBox="0 0 32 28"
      className={`sprite sprite--${animate} ${className}`}
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      <rect x="4" y="8" width="24" height="14" fill="#e65100" />
      <rect x="8" y="12" width="16" height="10" fill="#fff" />
      <rect x="2" y="4" width="6" height="8" fill="#e65100" />
      <rect x="24" y="4" width="6" height="8" fill="#e65100" />
      <rect x="3" y="5" width="4" height="4" fill="#fff" />
      <rect x="25" y="5" width="4" height="4" fill="#fff" />
      <rect x="12" y="14" width="3" height="3" fill="#2a2118" />
      <rect x="17" y="14" width="3" height="3" fill="#2a2118" />
      <rect x="14" y="18" width="4" height="2" fill="#2a2118" />
      <rect x="6" y="22" width="6" height="4" fill="#e65100" />
      <rect x="20" y="22" width="6" height="4" fill="#e65100" />
      <rect x="26" y="14" width="6" height="4" fill="#fff" />
    </svg>
  )
}
