const breakpoints = {
  xSmall: 400
}
const mq = bp => `@media (max-width: ${breakpoints[bp]}px)`

const checkerboard = {
  display: 'flex',
  flexWrap: 'wrap'
}

const checkerboardRow = {
  display: 'flex'
}

const boardSquare = isEvenPosition => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 45,
  width: 45,
  backgroundColor: isEvenPosition ? 'black' : 'tan',
  [mq('xSmall')]: {
    height: 45,
    width: 45
  }
})

const regularChecker = color => ({
  height: 35,
  width: 35,
  borderRadius: '50%',
  backgroundColor: color,
  cursor: 'pointer',
  [mq('xSmall')]: {
    height: 30,
    width: 30
  }
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
  fontSize: 17,
  [mq('xSmall')]: {
    height: 22,
    width: 22,
    fontSize: 12
  }
})

const playerScoreboard = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '0px 20px',
  [mq('xSmall')]: {
    width: `100%`,
    flexDirection: 'row',
    margin: '20px 0px'
  }
}

const playerName = (playerTurn, player, color) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 50,
  width: 50,
  border: `5px solid ${color}`,
  borderRadius: '50%',
  color: playerTurn === player ? 'white' : color,
  backgroundColor: playerTurn === player ? color : 'white',
  marginBottom: '10px',
  [mq('xSmall')]: {
    height: 45,
    width: 45,
    marginBottom: '0px'
  }
})

const playerScore = {
  display: 'flex',
  width: 80,
  flexWrap: 'wrap',
  justifyContent: 'space-around'
}

const capturedChecker = {
  marginBottom: '5px',
  [mq('xSmall')]: {
    height: 20,
    width: 20
  }
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
