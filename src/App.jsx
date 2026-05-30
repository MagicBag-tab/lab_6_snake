import { useGameLoop } from "./hooks/useGameLoop";
import Board from "./components/Board";
import Score from "./components/Score";
import "./App.css";

export default function App() {
  const { snake, food, score, gameOver, started, startGame } = useGameLoop();

  return (
    <div className="app">
      <h1 className="title">Snake</h1>

      <Score score={score} />

      {!started && !gameOver && (
        <div className="overlay">
          <p>Usá las flechas del teclado para mover la serpiente</p>
          <button className="btn" onClick={startGame}>
            INICIAR JUEGO
          </button>
        </div>
      )}

      {gameOver && (
        <div className="overlay">
          <p className="game-over-text">GAME OVER</p>
          <p>Puntaje final: <strong>{score}</strong></p>
          <button className="btn" onClick={startGame}>
            REINICIAR
          </button>
        </div>
      )}

      {started && <Board snake={snake} food={food} />}

      <p className="hint">↑ ↓ ← → para mover</p>
    </div>
  );
}