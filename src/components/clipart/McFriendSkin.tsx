import './sprites.css'

type Props = { className?: string; animate?: string }

export function McFriendSkin({ className = '', animate = 'bob' }: Props) {
  return (
    <svg
      viewBox="0 0 32 48"
      className={`sprite sprite--${animate} ${className}`}
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      <rect x="8" y="2" width="16" height="6" fill="#2a2118" />
      <rect x="10" y="10" width="12" height="8" fill="#c69c6d" />
      <rect x="12" y="14" width="2" height="2" fill="#fff" />
      <rect x="12" y="15" width="1" height="1" fill="#2a2118" />
      <rect x="18" y="14" width="2" height="2" fill="#fff" />
      <rect x="19" y="15" width="1" height="1" fill="#2a2118" />
      <rect x="8" y="18" width="16" height="12" fill="#2a2118" />
      <rect x="4" y="18" width="4" height="12" fill="#c69c6d" />
      <rect x="24" y="18" width="4" height="12" fill="#c69c6d" />
      <rect x="9" y="30" width="6" height="12" fill="#5c6bc0" />
      <rect x="17" y="30" width="6" height="12" fill="#5c6bc0" />
      <rect x="8" y="42" width="7" height="4" fill="#2a2118" />
      <rect x="17" y="42" width="7" height="4" fill="#2a2118" />
    </svg>
  )
}
