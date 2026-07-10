import './sprites.css'

type Props = { className?: string; animate?: string }

/** Reena-inspired skin: pigtails, lavender shirt, axolotl pink accents */
export function McReenaSkin({ className = '', animate = 'bounce' }: Props) {
  return (
    <svg
      viewBox="0 0 32 48"
      className={`sprite sprite--${animate} ${className}`}
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      {/* axolotl hat */}
      <rect x="6" y="0" width="20" height="6" fill="#f48fb1" />
      <rect x="4" y="2" width="4" height="4" fill="#f48fb1" />
      <rect x="24" y="2" width="4" height="4" fill="#f48fb1" />
      <rect x="2" y="0" width="3" height="3" fill="#e91e63" />
      <rect x="27" y="0" width="3" height="3" fill="#e91e63" />
      {/* hair pigtails */}
      <rect x="4" y="6" width="6" height="10" fill="#4a2c40" />
      <rect x="22" y="6" width="6" height="10" fill="#4a2c40" />
      <rect x="8" y="6" width="16" height="6" fill="#4a2c40" />
      {/* face */}
      <rect x="10" y="12" width="12" height="8" fill="#c69c6d" />
      <rect x="12" y="15" width="2" height="2" fill="#fff" />
      <rect x="12" y="16" width="1" height="1" fill="#2a2118" />
      <rect x="18" y="15" width="2" height="2" fill="#fff" />
      <rect x="19" y="16" width="1" height="1" fill="#2a2118" />
      {/* glasses hint - orange frames */}
      <rect x="11" y="14" width="4" height="3" fill="none" stroke="#e8956a" strokeWidth="1" />
      <rect x="17" y="14" width="4" height="3" fill="none" stroke="#e8956a" strokeWidth="1" />
      {/* lavender shirt */}
      <rect x="8" y="20" width="16" height="10" fill="#c9a0dc" />
      <rect x="8" y="20" width="3" height="10" fill="#b890d0" />
      <rect x="21" y="20" width="3" height="10" fill="#b890d0" />
      {/* arms */}
      <rect x="4" y="20" width="4" height="10" fill="#c69c6d" />
      <rect x="24" y="20" width="4" height="10" fill="#c69c6d" />
      {/* pink axolotl skirt/boots */}
      <rect x="9" y="30" width="6" height="10" fill="#f48fb1" />
      <rect x="17" y="30" width="6" height="10" fill="#f48fb1" />
      <rect x="8" y="40" width="7" height="4" fill="#e91e63" />
      <rect x="17" y="40" width="7" height="4" fill="#e91e63" />
    </svg>
  )
}
