import './sprites.css'

type Props = { className?: string; animate?: string; variant?: 'reena' | 'friend' }

export function HeartopiaChibi({ className = '', animate = 'bounce', variant = 'reena' }: Props) {
  const hair = variant === 'reena' ? '#4a2c40' : '#2a2118'
  const outfit = variant === 'reena' ? '#c9a0dc' : '#5c6bc0'

  return (
    <svg
      viewBox="0 0 64 80"
      className={`sprite sprite--${animate} ${className}`}
      aria-hidden="true"
    >
      {/* fluffy skirt */}
      <ellipse cx="32" cy="62" rx="22" ry="14" fill={outfit} opacity="0.9" />
      <ellipse cx="32" cy="58" rx="18" ry="10" fill="#e8d5f2" />
      {/* body */}
      <ellipse cx="32" cy="48" rx="14" ry="12" fill={outfit} />
      {/* arms */}
      <ellipse cx="14" cy="46" rx="6" ry="8" fill="#ffd4b8" />
      <ellipse cx="50" cy="46" rx="6" ry="8" fill="#ffd4b8" />
      {/* head */}
      <circle cx="32" cy="28" r="18" fill="#ffd4b8" />
      {/* hair */}
      <ellipse cx="32" cy="18" rx="18" ry="12" fill={hair} />
      <rect x="16" y="16" width="32" height="8" rx="4" fill={hair} />
      {/* bangs */}
      <ellipse cx="24" cy="22" rx="6" ry="5" fill={hair} />
      <ellipse cx="32" cy="20" rx="5" ry="5" fill={hair} />
      <ellipse cx="40" cy="22" rx="6" ry="5" fill={hair} />
      {/* glasses for reena */}
      {variant === 'reena' && (
        <>
          <circle cx="24" cy="28" r="6" fill="none" stroke="#e8956a" strokeWidth="2" />
          <circle cx="40" cy="28" r="6" fill="none" stroke="#e8956a" strokeWidth="2" />
          <line x1="30" y1="28" x2="34" y2="28" stroke="#e8956a" strokeWidth="1.5" />
        </>
      )}
      {/* eyes */}
      <ellipse cx="24" cy="30" rx="2.5" ry="3" fill="#2a2118" />
      <ellipse cx="40" cy="30" rx="2.5" ry="3" fill="#2a2118" />
      <circle cx="25" cy="29" r="1" fill="#fff" />
      <circle cx="41" cy="29" r="1" fill="#fff" />
      {/* blush */}
      <ellipse cx="18" cy="34" rx="4" ry="2" fill="#f4a5b0" opacity="0.5" />
      <ellipse cx="46" cy="34" rx="4" ry="2" fill="#f4a5b0" opacity="0.5" />
      {/* smile */}
      <path d="M26 36 Q32 40 38 36" stroke="#c47878" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* hood fluff */}
      <ellipse cx="32" cy="12" rx="8" ry="5" fill="#fff" opacity="0.6" />
    </svg>
  )
}
