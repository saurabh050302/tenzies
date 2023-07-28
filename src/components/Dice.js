import "./Dice.css";

export default function Dice(props) {
  return (
    <div
      className={`Dice ${props.isHeld ? "held" : ""}`}
      onClick={props.changeIsHeld}
    >
      {props.value || 0}
    </div>
  );
}
