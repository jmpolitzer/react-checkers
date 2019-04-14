import React from 'react'

import Player from './Player'
import Square from './Square'
import useCheckers from '../hooks/useCheckers'

function Checkerboard({ dimensions }) {
  const { playerTurn, scoreboard, board, handlePick, handleMove } = useCheckers(
    dimensions
  )

  return (
    <div
      style={{ display: 'flex', justifyContent: 'space-around', width: '50%' }}
    >
      <Player player={1} playerTurn={playerTurn} scoreboard={scoreboard} />
      <div>
        {Object.keys(board).map((row, j) => {
          return (
            <div key={j} style={{ display: 'flex' }}>
              {Object.keys(board[row]).map((positionIndex, k) => {
                return (
                  <Square
                    key={k}
                    square={board[row][positionIndex]}
                    handlePick={handlePick}
                    handleMove={handleMove}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
      <Player player={2} playerTurn={playerTurn} scoreboard={scoreboard} />
    </div>
  )
}

export default Checkerboard
