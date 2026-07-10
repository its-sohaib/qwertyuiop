import './sprites.css'

type Props = { className?: string; animate?: string }

export function MinecraftAxolotl({ className = '', animate = 'float' }: Props) {
  return (
    <svg
      viewBox="0 0 48 40"
      className={`sprite sprite--${animate} ${className}`}
      aria-hidden="true"
    >
      <ellipse cx="24" cy="24" rx="16" ry="10" fill="#f8bbd0" />
      <ellipse cx="24" cy="26" rx="14" ry="7" fill="#f48fb1" />
      <circle cx="16" cy="20" r="5" fill="#f8bbd0" />
      <circle cx="32" cy="20" r="5" fill="#f8bbd0" />
      <circle cx="15" cy="19" r="2" fill="#fff" />
      <circle cx="31" cy="19" r="2" fill="#fff" />
      <circle cx="15.5" cy="19.5" r="1" fill="#4a148c" />
      <circle cx="31.5" cy="19.5" r="1" fill="#4a148c" />
      <path d="M8 14 Q4 8 6 4" stroke="#f48fb1" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M40 14 Q44 8 42 4" stroke="#f48fb1" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="6" cy="4" r="2.5" fill="#e91e63" opacity="0.7" />
      <circle cx="42" cy="4" r="2.5" fill="#e91e63" opacity="0.7" />
      <path d="M38 24 L46 22 L46 28 Z" fill="#f48fb1" />
      <ellipse cx="22" cy="28" rx="3" ry="2" fill="#ec407a" opacity="0.5" />
      <ellipse cx="28" cy="28" rx="3" ry="2" fill="#ec407a" opacity="0.5" />
    </svg>
  )
}
