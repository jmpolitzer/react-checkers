import PropTypes from 'prop-types'
import useCheckers from '../hooks/useCheckers'

/** @jsx jsx */
import { jsx } from '@emotion/core'

import Player from './Player'
import Square from './Square'
import { checkerboard, checkerboardRow } from './styles'

function Checkerboard({ dimensions = 8, styles = {}, playerColors = {} }) {
  const { playerTurn, scoreboard, board, handlePick, handleMove } = useCheckers(
    dimensions
  )

  return (
    <div css={styles.checkerboard || checkerboard}>
      <Player
        player={1}
        playerTurn={playerTurn}
        scoreboard={scoreboard}
        styles={styles}
        playerColors={playerColors}
      />
      <div>
        {Object.keys(board).map((row, j) => {
          return (
            <div key={j} css={styles.checkerboardRow || checkerboardRow}>
              {Object.keys(board[row]).map((positionIndex, k) => {
                return (
                  <Square
                    key={k}
                    square={board[row][positionIndex]}
                    handlePick={handlePick}
                    handleMove={handleMove}
                    styles={styles}
                    playerColors={playerColors}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
      <Player
        player={2}
        playerTurn={playerTurn}
        scoreboard={scoreboard}
        styles={styles}
        playerColors={playerColors}
      />
    </div>
  )
}

Checkerboard.propTypes = {
  dimensions: PropTypes.number,
  styles: PropTypes.object,
  playerColors: PropTypes.object
}

export default Checkerboard
