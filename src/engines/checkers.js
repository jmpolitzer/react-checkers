import replaceAt from '../helpers/replaceAt'

class CheckersEngine {
  didBecomeKing(activeSquare, square, dimensions) {
    const {
      position: { y }
    } = square
    const { occupiedBy } = activeSquare
    return (
      (occupiedBy === 1 && y === dimensions - 1) ||
      (occupiedBy === 2 && y === 0)
    )
  }

  didJump(activeSquare, square) {
    const {
      position: { x: newX, y: newY }
    } = square
    const {
      position: { x, y }
    } = activeSquare

    return Math.abs(newX - x) === 2 && Math.abs(newY - y) === 2
  }

  checkValidMove(
    activeSquare,
    square,
    jumpedSquare,
    isMultiJump,
    movesMade,
    playerTurn
  ) {
    const {
      position: { x: newX, y: newY }
    } = square

    const { exes, whys } = this.getPossiblePositions(activeSquare)
    const jumped = this.didJump(activeSquare, square)

    /* Check and see whether we're jumping an opponent's occupied square; if not, prevent move. */
    if (jumped) {
      if (jumpedSquare.occupiedBy && playerTurn !== jumpedSquare.occupiedBy) {
        return exes.includes(newX) && whys.includes(newY)
      }
    } else {
      /* Normal one square move. We don't want to allow this if a player has just made multiple jumps. */
      return (
        exes.includes(newX) &&
        whys.includes(newY) &&
        !isMultiJump &&
        movesMade <= 1
      )
    }
  }

  getJumpedSquare(activeSquare, square, positions) {
    const {
      position: { x: activeX, y: activeY }
    } = activeSquare
    const {
      position: { x: destX, y: destY }
    } = square
    const jumpedX = activeX > destX ? activeX - 1 : destX - 1
    const jumpedY = activeY > destY ? activeY - 1 : destY - 1
    return positions.find(
      pos => pos.position.x === jumpedX && pos.position.y === jumpedY
    )
  }

  getNewPositions(activeSquare, square, positions, becameKing) {
    const oldSquare = {
      ...activeSquare,
      occupiedBy: null,
      isKinged: false
    }
    const newSquare = {
      ...square,
      occupiedBy: activeSquare.occupiedBy,
      isKinged: activeSquare.isKinged || becameKing
    }
    const oldIndex = positions.findIndex(
      squ =>
        activeSquare.position.x === squ.position.x &&
        activeSquare.position.y === squ.position.y
    )
    const newIndex = positions.findIndex(
      squ =>
        square.position.x === squ.position.x &&
        square.position.y === squ.position.y
    )

    /* Swap formerly occupied square with the newly occupied square. */
    const withOld = replaceAt(positions, oldIndex, oldSquare)

    return replaceAt(withOld, newIndex, newSquare)
  }

  getPossiblePositions(activeSquare) {
    const {
      position: { x, y },
      occupiedBy,
      isKinged
    } = activeSquare

    /* Find possible moves. A checker can move a maximum of two squares away. */
    const xHigh = [x + 1, x + 2]
    const xLow = [x - 1, x - 2]
    const standardYHigh = [y + 1, y + 2]
    const standardYLow = [y - 1, y - 2]
    const kingedY = standardYHigh.concat(standardYLow)

    /* Each side moves in opposite directions along the y axis. */
    const yHigh = isKinged
      ? kingedY
      : occupiedBy === 1
        ? standardYHigh
        : [null]
    const yLow = isKinged ? kingedY : occupiedBy === 2 ? standardYLow : [null]

    const exes = xHigh.concat(xLow)
    const whys = yHigh.concat(yLow)

    return { exes, whys }
  }
}

export default CheckersEngine
