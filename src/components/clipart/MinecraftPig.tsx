import './sprites.css'

type Props = { className?: string; animate?: string }

export function MinecraftPig({ className = '', animate = 'wiggle' }: Props) {
  return (
    <svg
      viewBox="0 0 32 24"
      className={`sprite sprite--${animate} ${className}`}
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      <rect x="4" y="6" width="20" height="14" fill="#f48fb1" />
      <rect x="2" y="10" width="4" height="6" fill="#f48fb1" />
      <rect x="22" y="10" width="4" height="6" fill="#f48fb1" />
      <rect x="6" y="20" width="4" height="4" fill="#f48fb1" />
      <rect x="18" y="20" width="4" height="4" fill="#f48fb1" />
      <rect x="6" y="22" width="4" height="2" fill="#2a2118" />
      <rect x="18" y="22" width="4" height="2" fill="#2a2118" />
      <rect x="22" y="10" width="8" height="8" fill="#f06292" />
      <rect x="26" y="12" width="2" height="2" fill="#880e4f" />
      <rect x="30" y="12" width="2" height="2" fill="#880e4f" />
      <rect x="8" y="8" width="2" height="2" fill="#2a2118" />
      <rect x="14" y="8" width="2" height="2" fill="#2a2118" />
      <rect x="4" y="4" width="2" height="2" fill="#f48fb1" />
      <rect x="22" y="4" width="2" height="2" fill="#f48fb1" />
    </svg>
  )
}
