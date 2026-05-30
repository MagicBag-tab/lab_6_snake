import Board from "../components/Board";
import Score from "../components/Score";
import { useGameLoop } from "../hooks/useGameLoop";

export default function Game({ onBack }) {
  const { snake, food, score, gameOver, started, resetGame } = useGameLoop();

  return (
    <main className="app game-screen">
      <div className="game-header">
        <button className="btn secondary-btn" onClick={onBack}>
          INICIO
        </button>
        <Score score={score} />
        <button className="btn secondary-btn" onClick={resetGame}>
          NUEVA
        </button>
      </div>

      <div className="game-stage">
        <Board snake={snake} food={food} />

        {!started && !gameOver && (
          <div className="overlay">
            <p>Presiona una flecha para empezar</p>
          </div>
        )}

        {gameOver && (
          <div className="overlay">
            <p className="game-over-text">GAME OVER</p>
            <p>
              Puntaje final: <strong>{score}</strong>
            </p>
            <button className="btn" onClick={resetGame}>
              REINICIAR
            </button>
          </div>
        )}
      </div>

      <p className="hint">Usa las flechas para mover</p>
    </main>
  );
}
