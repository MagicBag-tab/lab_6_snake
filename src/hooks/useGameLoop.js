import { useState, useEffect, useCallback, useRef } from "react";
import {
  INITIAL_SNAKE,
  INITIAL_DIRECTION,
  INITIAL_SPEED,
  getRandomFood,
  checkCollision,
} from "../utils/gameHelpers";

export function useGameLoop() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(() => getRandomFood(INITIAL_SNAKE));
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [started, setStarted] = useState(false);
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  const directionRef = useRef(direction);
  directionRef.current = direction;

  useEffect(() => {
    const handleKey = (e) => {
      const dir = directionRef.current;
      const map = {
        ArrowUp:    { x: 0,  y: -1 },
        ArrowDown:  { x: 0,  y: 1  },
        ArrowLeft:  { x: -1, y: 0  },
        ArrowRight: { x: 1,  y: 0  },
      };
      const next = map[e.key];
      if (!next) return;
      if (next.x === -dir.x && next.y === -dir.y) return;
      setDirection(next);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (!started || gameOver) return;

    const interval = setInterval(() => {
      setSnake((prev) => {
        const dir = directionRef.current;
        const head = { x: prev[0].x + dir.x, y: prev[0].y + dir.y };

        if (checkCollision(head, prev)) {
          setGameOver(true);
          return prev;
        }

        const newSnake = [head, ...prev];

        setFood((currentFood) => {
          if (head.x === currentFood.x && head.y === currentFood.y) {
            setScore((s) => {
              const newScore = s + 10;
              if (newScore % 50 === 0) {
                setSpeed((sp) => Math.max(60, sp - 15));
              }
              return newScore;
            });
            setFood(getRandomFood(newSnake));
            return currentFood;
          }
          newSnake.pop();
          return currentFood;
        });

        return newSnake;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [started, gameOver, speed]);

  const startGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setFood(getRandomFood(INITIAL_SNAKE));
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setGameOver(false);
    setSpeed(INITIAL_SPEED);
    setStarted(true);
  }, []);

  return { snake, food, score, gameOver, started, startGame };
}