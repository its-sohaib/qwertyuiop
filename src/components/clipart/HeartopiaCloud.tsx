import './sprites.css'

type Props = { className?: string; animate?: string }

export function HeartopiaCloud({ className = '', animate = 'drift' }: Props) {
  return (
    <svg
      viewBox="0 0 80 40"
      className={`sprite sprite--${animate} ${className}`}
      aria-hidden="true"
    >
      <ellipse cx="28" cy="26" rx="22" ry="14" fill="#fff" opacity="0.95" />
      <ellipse cx="48" cy="22" rx="18" ry="12" fill="#fff" opacity="0.9" />
      <ellipse cx="58" cy="28" rx="14" ry="10" fill="#f3ebf8" opacity="0.85" />
      <ellipse cx="18" cy="28" rx="12" ry="9" fill="#f3ebf8" opacity="0.8" />
      <ellipse cx="38" cy="16" rx="14" ry="10" fill="#fff" />
    </svg>
  )
}
