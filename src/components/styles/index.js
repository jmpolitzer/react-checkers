const breakpoints = {
  small: 700
}
const mq = bp => `@media (max-width: ${breakpoints[bp]}px)`

const showRulesButton = rulesAreVisible => ({
  margin: 30,
  padding: '5px 10px',
  border: '2px solid red',
  borderRadius: 5,
  backgroundColor: rulesAreVisible ? 'red' : 'white',
  color: rulesAreVisible ? 'white' : 'red',
  fontWeight: 'bold',
  ':hover': {
    cursor: 'pointer'
  },
  [mq('small')]: {
    margin: '0px 0px 15px 0px'
  }
})

const ruleStyle = {
  marginLeft: 40,
  textAlign: 'left',
  div: {
    fontStyle: 'italic',
    marginBottom: 7
  },
  [mq('small')]: {
    margin: 0
  }
}

const checkerboard = {
  display: 'flex',
  flexWrap: 'wrap',
  [mq('small')]: {
    flexDirection: 'column'
  }
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
  [mq('small')]: {
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
  [mq('small')]: {
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
  [mq('small')]: {
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
  [mq('small')]: {
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
  [mq('small')]: {
    height: 45,
    width: 45,
    margin: '0px 10px 0px'
  }
})

const playerScore = {
  display: 'flex',
  width: 80,
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  [mq('small')]: {
    flexDirection: 'column',
    justifyContent: 'center',
    height: 50,
    width: 'inherit'
  }
}

const capturedChecker = {
  marginBottom: '5px',
  [mq('small')]: {
    height: 20,
    width: 20,
    marginRight: 5
  }
}

export {
  showRulesButton,
  ruleStyle,
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
