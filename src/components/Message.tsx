import { useReveal } from '../hooks/useReveal'
import './Message.css'

export function Message() {
  const ref = useReveal<HTMLElement>()

  return (
    <section className="message reveal" ref={ref}>
      <div className="message__book mc-panel">
        <div className="message__book-header mc-pixel">chat</div>
        <div className="message__lines">
          <p className="message__line mc-pixel">&lt;You&gt; you valid my nga.</p>
          <p className="message__line mc-pixel">&lt;You&gt; i fuk wid yuh heavy.</p>
          <p className="message__line message__line--accent mc-pixel">
            &lt;You&gt; you da real birthday.
          </p>
        </div>
        <div className="message__book-footer mc-pixel">reena is typing...</div>
      </div>
    </section>
  )
}
