import './sprites.css'

type Props = { className?: string; animate?: string }

export function DirtBlock({ className = '', animate = 'bob' }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={`sprite sprite--${animate} ${className}`}
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      <rect width="32" height="32" fill="#8b6914" />
      <rect x="0" y="0" width="8" height="8" fill="#9c7a1a" />
      <rect x="16" y="8" width="8" height="8" fill="#7a5e10" />
      <rect x="8" y="16" width="8" height="8" fill="#9c7a1a" />
      <rect x="24" y="16" width="8" height="8" fill="#7a5e10" />
      <rect x="0" y="24" width="8" height="8" fill="#7a5e10" />
      <rect x="16" y="24" width="8" height="8" fill="#9c7a1a" />
    </svg>
  )
}
