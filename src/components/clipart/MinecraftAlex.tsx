import './sprites.css'

type Props = { className?: string; animate?: string }

export function MinecraftAlex({ className = '', animate = 'bob' }: Props) {
  return (
    <svg
      viewBox="0 0 32 48"
      className={`sprite sprite--${animate} ${className}`}
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      <rect x="8" y="2" width="16" height="4" fill="#c4782a" />
      <rect x="6" y="6" width="20" height="4" fill="#c4782a" />
      <rect x="10" y="4" width="12" height="2" fill="#e8a040" />
      <rect x="8" y="10" width="16" height="8" fill="#c69c6d" />
      <rect x="10" y="14" width="3" height="2" fill="#fff" />
      <rect x="11" y="15" width="1" height="1" fill="#3d2817" />
      <rect x="19" y="14" width="3" height="2" fill="#fff" />
      <rect x="20" y="15" width="1" height="1" fill="#3d2817" />
      <rect x="14" y="16" width="4" height="1" fill="#d4956a" />
      <rect x="6" y="18" width="20" height="12" fill="#8bc34a" />
      <rect x="6" y="18" width="4" height="12" fill="#689f38" />
      <rect x="22" y="18" width="4" height="12" fill="#689f38" />
      <rect x="2" y="18" width="4" height="12" fill="#c69c6d" />
      <rect x="26" y="18" width="4" height="12" fill="#c69c6d" />
      <rect x="8" y="30" width="7" height="12" fill="#5d4037" />
      <rect x="17" y="30" width="7" height="12" fill="#5d4037" />
      <rect x="7" y="42" width="8" height="4" fill="#2a2118" />
      <rect x="17" y="42" width="8" height="4" fill="#2a2118" />
    </svg>
  )
}
