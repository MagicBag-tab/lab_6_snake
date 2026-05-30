export default function Snake({ segments, cellSize }) {
  return (
    <>
      {segments.map((seg, i) => {
        const style = {
          position: "absolute",
          left:   seg.x * cellSize,
          top:    seg.y * cellSize,
          width:  cellSize,
          height: cellSize,
        };
        return (
          <div
            key={i}
            className={`snake-segment ${i === 0 ? "snake-head" : ""}`}
            style={style}
          />
        );
      })}
    </>
  );
}