export default function Score({ score }) {
  return (
    <div className="score-container">
      <span className="score-label">PUNTOS</span>
      <span className="score-value">{score}</span>
    </div>
  );
}