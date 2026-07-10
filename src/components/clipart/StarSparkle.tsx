import './sprites.css'

type Props = { className?: string; animate?: string; color?: string }

export function StarSparkle({ className = '', animate = 'spin', color = '#ffd4b8' }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`sprite sprite--${animate} ${className}`}
      aria-hidden="true"
    >
      <path
        d="M12 1 L14 9 L22 12 L14 15 L12 23 L10 15 L2 12 L10 9 Z"
        fill={color}
        opacity="0.85"
      />
      <circle cx="12" cy="12" r="2" fill="#fff" opacity="0.6" />
    </svg>
  )
}
