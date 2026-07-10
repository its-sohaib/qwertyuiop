import { MinecraftSteve } from './clipart/MinecraftSteve'
import { MinecraftAlex } from './clipart/MinecraftAlex'
import { MinecraftPig } from './clipart/MinecraftPig'
import { MinecraftAxolotl } from './clipart/MinecraftAxolotl'
import { GrassBlock } from './clipart/GrassBlock'
import { HeartopiaChibi } from './clipart/HeartopiaChibi'
import { HeartopiaCloud } from './clipart/HeartopiaCloud'
import { StarSparkle } from './clipart/StarSparkle'
import { HeartBubble } from './clipart/HeartBubble'
import './GameDecor.css'

export function GameDecor() {
  return (
    <div className="game-decor" aria-hidden="true">
      <div className="game-decor__item game-decor__cloud game-decor__cloud--1">
        <HeartopiaCloud animate="drift" />
      </div>
      <div className="game-decor__item game-decor__cloud game-decor__cloud--2">
        <HeartopiaCloud animate="float" />
      </div>
      <div className="game-decor__item game-decor__star game-decor__star--1">
        <StarSparkle color="#c9a0dc" />
      </div>
      <div className="game-decor__item game-decor__star game-decor__star--2">
        <StarSparkle color="#ffd4b8" animate="spin" />
      </div>
      <div className="game-decor__item game-decor__heart game-decor__heart--1">
        <HeartBubble />
      </div>
      <div className="game-decor__item game-decor__heart game-decor__heart--2">
        <HeartBubble animate="float" />
      </div>
      <div className="game-decor__item game-decor__chibi game-decor__chibi--reena">
        <HeartopiaChibi variant="reena" />
      </div>
      <div className="game-decor__item game-decor__chibi game-decor__chibi--friend">
        <HeartopiaChibi variant="friend" animate="bob" />
      </div>
      <div className="game-decor__item game-decor__steve">
        <MinecraftSteve />
      </div>
      <div className="game-decor__item game-decor__alex">
        <MinecraftAlex />
      </div>
      <div className="game-decor__item game-decor__pig">
        <MinecraftPig />
      </div>
      <div className="game-decor__item game-decor__axolotl">
        <MinecraftAxolotl />
      </div>
      <div className="game-decor__item game-decor__block game-decor__block--1">
        <GrassBlock />
      </div>
      <div className="game-decor__item game-decor__block game-decor__block--2">
        <GrassBlock animate="wiggle" />
      </div>
      <div className="game-decor__item game-decor__block game-decor__block--3">
        <GrassBlock animate="float" />
      </div>
    </div>
  )
}
