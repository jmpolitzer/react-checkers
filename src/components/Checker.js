import PropTypes from 'prop-types'

/** @jsx jsx */
import { jsx } from '@emotion/core'

import { regularChecker, kingedChecker } from './styles'

function Checker({
  square,
  square: { isKinged, occupiedBy } = {},
  handlePick,
  label,
  scoreboardStyle,
  styles,
  playerColors
}) {
  const { player1, player2 } = playerColors
  const color = occupiedBy
    ? occupiedBy === 1
      ? player1 || 'white'
      : player2 || 'red'
    : label === 'player1'
      ? player1 || 'red'
      : player2 || 'black'

  return (
    <div
      css={[
        isKinged
          ? styles.kingedChecker
            ? styles.kingedChecker(color)
            : kingedChecker(color)
          : styles.regularChecker
            ? styles.regularChecker(color)
            : regularChecker(color),
        scoreboardStyle
      ]}
      data-checker={label && label}
      onClick={handlePick ? () => handlePick(square) : null}
    >
      {isKinged && 'K'}
    </div>
  )
}

Checker.propTypes = {
  square: PropTypes.object.isRequired,
  handlePick: PropTypes.func.isRequired,
  label: PropTypes.string,
  scoreboardStyle: PropTypes.object,
  styles: PropTypes.object,
  playerColors: PropTypes.object
}

export default Checker
