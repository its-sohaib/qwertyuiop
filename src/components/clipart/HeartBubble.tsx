import './sprites.css'

type Props = { className?: string; animate?: string }

export function HeartBubble({ className = '', animate = 'bob' }: Props) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={`sprite sprite--${animate} ${className}`}
      aria-hidden="true"
    >
      <path
        d="M16 28 C16 28 4 18 4 11 C4 6.5 7.5 3 11.5 3 C14 3 15.5 4.5 16 6.5 C16.5 4.5 18 3 20.5 3 C24.5 3 28 6.5 28 11 C28 18 16 28 16 28Z"
        fill="#e8435a"
        opacity="0.85"
      />
      <ellipse cx="11" cy="10" rx="3" ry="2" fill="#fff" opacity="0.35" />
    </svg>
  )
}
