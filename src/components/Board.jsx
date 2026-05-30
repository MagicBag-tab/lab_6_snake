import Snake from "./Snake";
import Food from "./Food";
import { BOARD_SIZE } from "../utils/gameHelpers";

const CELL_SIZE = 24;
const BOARD_PX = BOARD_SIZE * CELL_SIZE;

export default function Board({ snake, food, direction }) {
  return (
    <div
      className="board"
      style={{
        width: BOARD_PX,
        height: BOARD_PX,
        "--cell-size": `${CELL_SIZE}px`,
      }}
    >
      <Snake segments={snake} cellSize={CELL_SIZE} direction={direction} />
      <Food position={food} cellSize={CELL_SIZE} />
    </div>
  );
}
