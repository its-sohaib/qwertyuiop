import './MuteToggle.css'

type Props = {
  muted: boolean
  onToggle: () => void
}

export function MuteToggle({ muted, onToggle }: Props) {
  return (
    <button
      className="mute-toggle"
      onClick={onToggle}
      aria-label={muted ? 'Unmute ambience' : 'Mute ambience'}
      title={muted ? 'Unmute' : 'Mute'}
    >
      <span className="mute-toggle__icon" aria-hidden="true">
        {muted ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M11 5L6 9H3v6h3l5 4V5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M22 9l-6 6M16 9l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M11 5L6 9H3v6h3l5 4V5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            <path d="M15.5 8.5a5 5 0 010 7M18.5 6a9 9 0 010 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        )}
      </span>
    </button>
  )
}
