import { McReenaSkin } from './clipart/McReenaSkin'
import { McFriendSkin } from './clipart/McFriendSkin'
import { PixelHeart } from './clipart/PixelHeart'
import './Hero.css'

export function Hero() {
  return (
    <header className="hero">
      <div className="hero__sign mc-sign">
        <p className="hero__sign-line mc-pixel">maligayang kaarawan</p>
      </div>

      <div className="hero__chars" aria-hidden="true">
        <McReenaSkin animate="bounce" />
        <McFriendSkin animate="bob" />
      </div>

      <figure className="hero__frame mc-frame">
        <div className="hero__frame-inner mc-frame__inner">
          <img
            src="/assets/her_portrait.jpeg"
            alt="Reena"
            className="hero__photo"
            width={320}
            height={400}
          />
        </div>
        <figcaption className="hero__caption">
          <span className="hero__caption-title mc-pixel">happy birthday</span>
          <span className="hero__caption-name mc-pixel">reena</span>
        </figcaption>
      </figure>

      <div className="hero__xp mc-panel">
        <div className="hero__xp-label mc-pixel">level</div>
        <div className="hero__xp-num mc-pixel">20</div>
        <div className="hero__xp-bar">
          <div className="hero__xp-fill" />
        </div>
        <div className="hero__xp-sub mc-pixel">birthday unlocked</div>
      </div>

      <div className="hero__hearts mc-hearts" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, i) => (
          <PixelHeart key={i} animate={i % 2 ? 'bob' : 'bounce'} className="mc-heart-icon" />
        ))}
      </div>
    </header>
  )
}
