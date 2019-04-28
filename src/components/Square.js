import PropTypes from 'prop-types'

/** @jsx jsx */
import { jsx } from '@emotion/core'

import Checker from './Checker'

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
      data-testid={`[${x}, ${y}]`}
      css={
        styles.boardSquare
          ? styles.boardSquare(isEvenPosition)
          : boardSquare(isEvenPosition)
      }
      onClick={() => (!occupiedBy ? handleMove(square) : null)}
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

Square.propTypes = {
  square: PropTypes.object.isRequired,
  handlePick: PropTypes.func.isRequired,
  handleMove: PropTypes.func.isRequired,
  styles: PropTypes.object,
  playerColors: PropTypes.object
}

export default Square
