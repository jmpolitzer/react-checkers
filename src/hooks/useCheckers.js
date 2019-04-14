import React, { useReducer, useEffect } from 'react'

import reducer from '../state/reducer'
import {
  swapTurns,
  incrementScoreboard,
  decrementScoreboard,
  setActiveSquare,
  setIsMultiJump,
  incrementMovesMade,
  resetMovesMade,
  setPositions
} from '../state/actions'
import CheckersEngine from '../engines/checkers'
import generatePositions from '../helpers/generatePositions'
import createBoard from '../helpers/createBoard'

const engine = new CheckersEngine()

function useCheckers(dimensions) {
  const initialState = {
    playerTurn: 1,
    scoreboard: {
      1: 0,
      2: 0
    },
    activeSquare: null,
    isMultiJump: false,
    movesMade: 0,
    positions: generatePositions(dimensions)
  }

  const [state, dispatch] = useReducer(reducer, initialState)
  const {
    playerTurn,
    scoreboard,
    activeSquare,
    isMultiJump,
    movesMade,
    positions
  } = state
  const board = createBoard(positions, dimensions)

  /* A user can hold down the m key and make multiple jumps. */
  useEffect(() => {
    window.onkeydown = e => {
      if (e.key === 'm') {
        if (!isMultiJump) {
          dispatch(setIsMultiJump(true))
        }
      }
    }

    /* This allows us to swap turns after multiple moves are made. */
    window.onkeyup = e => {
      if (e.key === 'm') {
        if (isMultiJump) {
          dispatch(setIsMultiJump(false))

          if (movesMade > 1) {
            dispatch(resetMovesMade())
            dispatch(setActiveSquare(null))
            dispatch(swapTurns())
          }
        }
      }
    }
  })

  const handlePick = square => {
    const { occupiedBy } = square
    if (occupiedBy === playerTurn) {
      movesMade !== 0 && dispatch(resetMovesMade())
      dispatch(setActiveSquare(square))
    }
  }

  const handleMove = square => {
    if (activeSquare) {
      const jumpedSquare =
        engine.didJump(activeSquare, square) &&
        engine.getJumpedSquare(activeSquare, square, positions)
      const becameKing = engine.didBecomeKing(activeSquare, square, dimensions)
      const isValid = engine.checkValidMove(
        activeSquare,
        square,
        jumpedSquare,
        isMultiJump,
        movesMade
      )

      if (isValid) {
        const newPositions = engine.getNewPositions(
          activeSquare,
          square,
          positions,
          becameKing
        )

        if (jumpedSquare) {
          const remainingCheckers = newPositions.map(pos => {
            return pos.position.x === jumpedSquare.position.x &&
              pos.position.y === jumpedSquare.position.y
              ? { ...pos, occupiedBy: null }
              : pos
          })

          if (playerTurn !== jumpedSquare.occupiedBy) {
            dispatch(incrementScoreboard(playerTurn, jumpedSquare.isKinged))
          }

          if (becameKing) {
            dispatch(decrementScoreboard(jumpedSquare.occupiedBy))
          }

          dispatch(setPositions(remainingCheckers))

          /* User is holding down the m key. */
          if (isMultiJump) {
            const newActiveSquare = {
              ...square,
              isKinged: activeSquare.isKinged,
              occupiedBy: activeSquare.occupiedBy
            }

            dispatch(setActiveSquare(newActiveSquare))
          } else {
            dispatch(setActiveSquare(null))
            dispatch(swapTurns())
          }
        } else {
          if (becameKing) {
            dispatch(decrementScoreboard(playerTurn === 1 ? 2 : 1))
          }

          dispatch(setPositions(newPositions))
          dispatch(setActiveSquare(null))
          dispatch(swapTurns())
        }

        dispatch(incrementMovesMade())
      }
    }
  }

  return { playerTurn, scoreboard, board, handlePick, handleMove }
}

export default useCheckers
