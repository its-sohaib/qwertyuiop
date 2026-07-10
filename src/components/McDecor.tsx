import { MinecraftSteve } from './clipart/MinecraftSteve'
import { MinecraftAlex } from './clipart/MinecraftAlex'
import { MinecraftPig } from './clipart/MinecraftPig'
import { MinecraftAxolotl } from './clipart/MinecraftAxolotl'
import { GrassBlock } from './clipart/GrassBlock'
import { DirtBlock } from './clipart/DirtBlock'
import { McReenaSkin } from './clipart/McReenaSkin'
import { McFriendSkin } from './clipart/McFriendSkin'
import { McBee } from './clipart/McBee'
import { McFox } from './clipart/McFox'
import { PixelHeart } from './clipart/PixelHeart'
import './McDecor.css'

export function McDecor() {
  return (
    <div className="mc-decor" aria-hidden="true">
      <div className="mc-decor__item mc-decor__reena">
        <McReenaSkin />
      </div>
      <div className="mc-decor__item mc-decor__friend">
        <McFriendSkin animate="bob" />
      </div>
      <div className="mc-decor__item mc-decor__steve">
        <MinecraftSteve animate="bounce" />
      </div>
      <div className="mc-decor__item mc-decor__alex">
        <MinecraftAlex />
      </div>
      <div className="mc-decor__item mc-decor__pig">
        <MinecraftPig />
      </div>
      <div className="mc-decor__item mc-decor__axolotl">
        <MinecraftAxolotl />
      </div>
      <div className="mc-decor__item mc-decor__bee">
        <McBee />
      </div>
      <div className="mc-decor__item mc-decor__fox">
        <McFox />
      </div>
      <div className="mc-decor__item mc-decor__grass mc-decor__grass--1">
        <GrassBlock animate="wiggle" />
      </div>
      <div className="mc-decor__item mc-decor__grass mc-decor__grass--2">
        <GrassBlock animate="float" />
      </div>
      <div className="mc-decor__item mc-decor__dirt">
        <DirtBlock animate="bob" />
      </div>
      <div className="mc-decor__item mc-decor__heart mc-decor__heart--1">
        <PixelHeart />
      </div>
      <div className="mc-decor__item mc-decor__heart mc-decor__heart--2">
        <PixelHeart animate="float" />
      </div>
      <div className="mc-decor__item mc-decor__heart mc-decor__heart--3">
        <PixelHeart animate="bob" />
      </div>
    </div>
  )
}
