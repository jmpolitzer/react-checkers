export default function generatePositions(dimensions) {
  const blankArray = [...Array(dimensions)]
  const squares = blankArray.reduce((acc, _, i) => {
    blankArray.forEach((_, j) => {
      const position = { x: i, y: j }
      const square = {
        position,
        occupiedBy: j < 3 ? 1 : j > dimensions - 4 ? 2 : null,
        isKinged: false
      }

      acc.push(square)
    })

    return acc
  }, [])

  return squares
}
