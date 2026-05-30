import { useState, useEffect, useCallback } from "react";
import {
  INITIAL_SNAKE,
  INITIAL_DIRECTION,
  INITIAL_SPEED,
  getRandomFood,
  checkCollision,
} from "../utils/gameHelpers";

const KEY_DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
};

function getInitialGameState() {
  const snake = INITIAL_SNAKE.map((segment) => ({ ...segment }));

  return {
    snake,
    food: getRandomFood(snake),
    direction: INITIAL_DIRECTION,
    score: 0,
    gameOver: false,
    started: false,
    speed: INITIAL_SPEED,
  };
}

export function useGameLoop() {
  const [game, setGame] = useState(getInitialGameState);

  useEffect(() => {
    const handleKey = (e) => {
      const nextDirection = KEY_DIRECTIONS[e.key];
      if (!nextDirection) return;

      e.preventDefault();
      setGame((current) => {
        if (current.gameOver) return current;

        const isOppositeDirection =
          nextDirection.x === -current.direction.x &&
          nextDirection.y === -current.direction.y;

        if (isOppositeDirection) return current;

        return {
          ...current,
          started: true,
          direction: nextDirection,
        };
      });
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (!game.started || game.gameOver) return;

    const interval = setInterval(() => {
      setGame((current) => {
        if (!current.started || current.gameOver) return current;

        const head = {
          x: current.snake[0].x + current.direction.x,
          y: current.snake[0].y + current.direction.y,
        };

        if (checkCollision(head, current.snake)) {
          return {
            ...current,
            gameOver: true,
          };
        }

        const ateFood = head.x === current.food.x && head.y === current.food.y;
        const nextSnake = ateFood
          ? [head, ...current.snake]
          : [head, ...current.snake.slice(0, -1)];
        const nextScore = ateFood ? current.score + 10 : current.score;
        const nextSpeed =
          ateFood && nextScore % 50 === 0
            ? Math.max(60, current.speed - 15)
            : current.speed;

        return {
          ...current,
          snake: nextSnake,
          food: ateFood ? getRandomFood(nextSnake) : current.food,
          score: nextScore,
          speed: nextSpeed,
        };
      });
    }, game.speed);

    return () => clearInterval(interval);
  }, [game.started, game.gameOver, game.speed]);

  const resetGame = useCallback(() => {
    setGame(getInitialGameState());
  }, []);

  return {
    snake: game.snake,
    food: game.food,
    score: game.score,
    gameOver: game.gameOver,
    started: game.started,
    resetGame,
  };
}
