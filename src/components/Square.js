import Checker from './Checker'

/** @jsx jsx */
import { jsx } from '@emotion/core'

import { boardSquare } from './styles'

function Square({
  square,
  square: {
    position: { x, y },
    occupiedBy
  },
  handlePick,
  handleMove,
  styles,
  playerColors
}) {
  const isEvenPosition = (x + 1 * y) % 2 === 0

  return (
    <div
      data-position={`[${x}, ${y}]`}
      css={
        styles.boardSquare
          ? styles.boardSquare(isEvenPosition)
          : boardSquare(isEvenPosition)
      }
      onClick={() => (!occupiedBy ? handleMove(square) : {})}
    >
      {occupiedBy !== null && isEvenPosition && (
        <Checker
          square={square}
          handlePick={handlePick}
          styles={styles}
          playerColors={playerColors}
        />
      )}
    </div>
  )
}

export default Square
