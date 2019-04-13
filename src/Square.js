import React from "react";

import Checker from "./Checker";

function Square({
  square,
  square: {
    position: { x, y },
    occupiedBy
  },
  handlePick,
  handleMove
}) {
  const isEvenPosition = (x + 1 * y) % 2 === 0;

  return (
    <div
      data-position={`[${x}, ${y}]`}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        width: 50,
        backgroundColor: isEvenPosition ? "black" : "tan"
      }}
      onClick={() => (!occupiedBy ? handleMove(square) : {})}
    >
      {occupiedBy !== null && isEvenPosition && (
        <Checker
          square={square}
          handlePick={handlePick}
          color={occupiedBy === 1 ? "white" : "red"}
        />
      )}
    </div>
  );
}

export default Square;
