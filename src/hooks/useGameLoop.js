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
    paused: false,
    speed: INITIAL_SPEED,
  };
}

function isOppositeDirection(currentDirection, nextDirection) {
  return (
    nextDirection.x === -currentDirection.x &&
    nextDirection.y === -currentDirection.y
  );
}

function moveSnake(current) {
  const head = {
    x: current.snake[0].x + current.direction.x,
    y: current.snake[0].y + current.direction.y,
  };
  const ateFood = head.x === current.food.x && head.y === current.food.y;
  const collisionSnake = ateFood ? current.snake : current.snake.slice(0, -1);

  if (checkCollision(head, collisionSnake)) {
    return {
      ...current,
      gameOver: true,
    };
  }

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
}

export function useGameLoop() {
  const [game, setGame] = useState(getInitialGameState);

  useEffect(() => {
    const handleKey = (e) => {
      const isPauseKey = e.code === "Space" || e.key === " ";
      if (isPauseKey) {
        e.preventDefault();
        setGame((current) => {
          if (!current.started || current.gameOver) return current;

          return {
            ...current,
            paused: !current.paused,
          };
        });
        return;
      }

      const nextDirection = KEY_DIRECTIONS[e.key];
      if (!nextDirection) return;

      e.preventDefault();
      setGame((current) => {
        if (
          current.gameOver ||
          isOppositeDirection(current.direction, nextDirection)
        ) {
          return current;
        }

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
    if (!game.started || game.gameOver || game.paused) return;

    const interval = setInterval(() => {
      setGame((current) => {
        if (!current.started || current.gameOver || current.paused) {
          return current;
        }

        return moveSnake(current);
      });
    }, game.speed);

    return () => clearInterval(interval);
  }, [game.started, game.gameOver, game.paused, game.speed]);

  const resetGame = useCallback(() => {
    setGame(getInitialGameState());
  }, []);

  return {
    snake: game.snake,
    food: game.food,
    direction: game.direction,
    score: game.score,
    gameOver: game.gameOver,
    started: game.started,
    paused: game.paused,
    resetGame,
  };
}
