import PropTypes from 'prop-types'
import useCheckers from '../hooks/useCheckers'

/** @jsx jsx */
import { jsx } from '@emotion/core'

import Player from './Player'
import Square from './Square'
import { rules, checkerboard, checkerboardRow } from './styles'

function Checkerboard({ dimensions = 8, styles = {}, playerColors = {} }) {
  const { playerTurn, scoreboard, board, handlePick, handleMove } = useCheckers(
    dimensions
  )

  return (
    <div>
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
      <div css={styles.rules || rules}>
        <div>Rules:</div>
        <ol>
          <li>If a player's circle is full, it is their turn.</li>
          <li>Players get one move per turn.</li>
          <li>
            A checker is kinged when it reaches the opposite end of the board.
          </li>
          <li>Press and hold "m" to make multiple jumps.</li>
          <li>Any checker can make single or multiple jumps going forward.</li>
          <li>
            Only a king can make single or multiple jumps going forward and
            backward.
          </li>
          <li>
            When player jumps a checker, their score will increment by one.
          </li>
          <li>When player jumps a king, their score will increment by two.</li>
          <li>
            When player is kinged, their opponent's score will decrement by one.
          </li>
        </ol>
      </div>
    </div>
  )
}

Checkerboard.propTypes = {
  dimensions: PropTypes.number,
  styles: PropTypes.object,
  playerColors: PropTypes.object
}

export default Checkerboard
