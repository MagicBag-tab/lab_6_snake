function getHeadDirectionClass(direction) {
  if (direction.y < 0) return "snake-head-up";
  if (direction.y > 0) return "snake-head-down";
  if (direction.x < 0) return "snake-head-left";
  return "snake-head-right";
}

export default function Snake({ segments, cellSize, direction }) {
  return (
    <>
      {segments.map((seg, i) => {
        const isHead = i === 0;
        const isTail = i === segments.length - 1;
        const style = {
          position: "absolute",
          left: seg.x * cellSize,
          top: seg.y * cellSize,
          width: cellSize,
          height: cellSize,
        };
        const className = [
          "snake-segment",
          isHead ? `snake-head ${getHeadDirectionClass(direction)}` : "",
          isTail && !isHead ? "snake-tail" : "",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <div
            key={i}
            className={className}
            style={style}
          />
        );
      })}
    </>
  );
}
