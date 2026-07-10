import './Background.css'

export function Background() {
  return (
    <div className="bg" aria-hidden="true">
      <div className="bg__sky" />
      <div className="bg__clouds">
        <div className="bg__cloud bg__cloud--1" />
        <div className="bg__cloud bg__cloud--2" />
        <div className="bg__cloud bg__cloud--3" />
      </div>
      <div className="bg__terrain">
        <div className="bg__grass-row" />
        <div className="bg__dirt-row" />
      </div>
      <div className="bg__bedrock" />
    </div>
  )
}
