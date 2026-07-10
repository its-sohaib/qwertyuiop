import './sprites.css'

type Props = { className?: string; animate?: string }

export function GrassBlock({ className = '', animate = 'bob' }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={`sprite sprite--${animate} ${className}`}
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      <rect x="0" y="0" width="32" height="8" fill="#5dab46" />
      <rect x="0" y="0" width="8" height="4" fill="#7ec850" />
      <rect x="16" y="0" width="8" height="4" fill="#7ec850" />
      <rect x="8" y="4" width="8" height="4" fill="#4a9638" />
      <rect x="24" y="4" width="8" height="4" fill="#4a9638" />
      <rect x="0" y="8" width="32" height="24" fill="#8b6914" />
      <rect x="0" y="8" width="8" height="8" fill="#9c7a1a" />
      <rect x="16" y="16" width="8" height="8" fill="#9c7a1a" />
      <rect x="8" y="24" width="8" height="8" fill="#7a5e10" />
    </svg>
  )
}
