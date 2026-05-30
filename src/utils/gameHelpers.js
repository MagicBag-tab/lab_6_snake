export const BOARD_SIZE = 20;
// El primer segmento siempre es la cabeza de la serpiente.
export const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];
export const INITIAL_DIRECTION = { x: 1, y: 0 };
export const INITIAL_SPEED = 150;

export function getRandomFood(snake) {
  let pos;
  do {
    pos = {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
  } while (snake.some((s) => s.x === pos.x && s.y === pos.y));
  return pos;
}

export function checkCollision(head, snake) {
  if (
    head.x < 0 ||
    head.x >= BOARD_SIZE ||
    head.y < 0 ||
    head.y >= BOARD_SIZE
  ) {
    return true;
  }
  return snake.slice(1).some((s) => s.x === head.x && s.y === head.y);
}
