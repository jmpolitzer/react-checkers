import PropTypes from 'prop-types'

/** @jsx jsx */
import { jsx } from '@emotion/core'

import Checker from './Checker'
import {
  playerScoreboard,
  playerName,
  playerScore,
  capturedChecker
} from './styles'

function Player({ player, playerTurn, scoreboard, styles, playerColors }) {
  const { player1, player2 } = playerColors
  const color = player === 1 ? player1 || 'black' : player2 || 'red'

  return (
    <div css={styles.playerScoreboard || playerScoreboard}>
      <div
        css={
          styles.playerName
            ? styles.playerName(playerTurn, player, color)
            : playerName(playerTurn, player, color)
        }
      >
        <h1>{player}</h1>
      </div>
      <div css={styles.playerScore || playerScore}>
        {[...Array(scoreboard[player])].map((_, i) => {
          return (
            <Checker
              key={i}
              label={`player${player}`}
              scoreboardStyle={styles.capturedChecker || capturedChecker}
              styles={styles}
              playerColors={playerColors}
            />
          )
        })}
      </div>
    </div>
  )
}

Player.propTypes = {
  player: PropTypes.number.isRequired,
  playerTurn: PropTypes.number.isRequired,
  scoreboard: PropTypes.object.isRequired,
  styles: PropTypes.object,
  playerColors: PropTypes.object
}

export default Player
