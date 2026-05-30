export default function Food({ position, cellSize }) {
  const style = {
    position: "absolute",
    left:   position.x * cellSize,
    top:    position.y * cellSize,
    width:  cellSize,
    height: cellSize,
  };

  return <div className="food" style={style} />;
}