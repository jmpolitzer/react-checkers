import React from 'react'

import Checker from '../Checker'

function Player({ player, playerTurn, scoreboard }) {
  const color = player === 1 ? 'black' : 'red'
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    playerName: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '50px',
      width: '50px',
      border: `5px solid ${color}`,
      borderRadius: '50%',
      color: playerTurn === player ? 'white' : color,
      backgroundColor: playerTurn === player ? color : 'white',
      marginBottom: '10px'
    },
    playerBoard: {
      display: 'flex',
      width: '80px',
      flexWrap: 'wrap',
      justifyContent: 'space-around'
    },
    capturedChecker: {
      marginBottom: '5px'
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.playerName}>
        <h1>{player}</h1>
      </div>
      <div style={styles.playerBoard}>
        {[...Array(scoreboard[player])].map((_, i) => {
          return (
            <Checker
              key={i}
              className={`player${player}`}
              color={player === 1 ? 'red' : 'black'}
              boardStyle={styles.capturedChecker}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Player
