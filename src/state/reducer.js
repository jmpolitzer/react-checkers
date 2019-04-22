import * as actionTypes from './constants'

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.SWAP_TURNS:
      return {
        ...state,
        playerTurn: state.playerTurn === 1 ? 2 : 1
      }

    case actionTypes.INCREMENT_SCOREBOARD:
      return {
        ...state,
        scoreboard: {
          ...state.scoreboard,
          [action.payload.player]:
            state.scoreboard[action.payload.player] +
            (action.payload.isKing ? 2 : 1)
        }
      }

    case actionTypes.DECREMENT_SCOREBOARD:
      return {
        ...state,
        scoreboard: {
          ...state.scoreboard,
          [action.payload.player]:
            state.scoreboard[action.payload.player] > 0
              ? state.scoreboard[action.payload.player] - 1
              : 0
        }
      }

    case actionTypes.SET_ACTIVE_SQUARE:
      return {
        ...state,
        activeSquare: action.payload.activeSquare
      }

    case actionTypes.SET_IS_MULTI_JUMP:
      return {
        ...state,
        isMultiJump: action.payload.isMultiJump
      }

    case actionTypes.INCREMENT_MOVES_MADE:
      return {
        ...state,
        movesMade: state.movesMade + 1
      }

    case actionTypes.RESET_MOVES_MADE:
      return {
        ...state,
        movesMade: 0
      }

    case actionTypes.SET_POSITIONS:
      return {
        ...state,
        positions: action.payload.positions
      }
  }
}

export default reducer
