const checkerboard = {
  display: 'flex',
  justifyContent: 'space-around',
  width: '50%'
}

const checkerboardRow = {
  display: 'flex'
}

const boardSquare = isEvenPosition => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 50,
  width: 50,
  backgroundColor: isEvenPosition ? 'black' : 'tan'
})

const regularChecker = color => ({
  height: 35,
  width: 35,
  borderRadius: '50%',
  backgroundColor: color,
  cursor: 'pointer'
})

const kingedChecker = color => ({
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 27,
  width: 27,
  borderRadius: '50%',
  border: `5px solid ${color}`,
  color: color,
  fontWeight: 'bold',
  fontSize: 17
})

const playerScoreboard = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}

const playerName = (playerTurn, player, color) => ({
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
})

const playerScore = {
  display: 'flex',
  width: '80px',
  flexWrap: 'wrap',
  justifyContent: 'space-around'
}

const capturedChecker = {
  marginBottom: '5px'
}

export {
  checkerboard,
  checkerboardRow,
  boardSquare,
  regularChecker,
  kingedChecker,
  playerScoreboard,
  playerName,
  playerScore,
  capturedChecker
}
