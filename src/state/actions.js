import * as actionTypes from "./constants";

export function swapTurns() {
  return {
    type: actionTypes.SWAP_TURNS
  };
}

export function incrementScoreboard(player, isKing) {
  return {
    type: actionTypes.INCREMENT_SCOREBOARD,
    payload: {
      player,
      isKing
    }
  };
}

export function decrementScoreboard(player) {
  return {
    type: actionTypes.DECREMENT_SCOREBOARD,
    payload: {
      player
    }
  };
}

export function setActiveSquare(activeSquare) {
  return {
    type: actionTypes.SET_ACTIVE_SQUARE,
    payload: {
      activeSquare
    }
  };
}

export function setIsMultiJump(isMultiJump) {
  return {
    type: actionTypes.SET_IS_MULTI_JUMP,
    payload: {
      isMultiJump
    }
  };
}

export function incrementMovesMade() {
  return {
    type: actionTypes.INCREMENT_MOVES_MADE
  };
}

export function resetMovesMade() {
  return {
    type: actionTypes.RESET_MOVES_MADE
  };
}

export function setPositions(positions) {
  return {
    type: actionTypes.SET_POSITIONS,
    payload: {
      positions
    }
  };
}
