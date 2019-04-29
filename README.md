# react-checkers

> React Tools for Building an Interactive Game of Checkers

[![NPM](https://img.shields.io/npm/v/use-api-request.svg)](https://www.npmjs.com/package/react-checkers)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Build Status](https://travis-ci.com/jmpolitzer/react-checkers.svg?branch=master)](https://travis-ci.com/jmpolitzer/react-checkers)
[![Coverage Status](https://coveralls.io/repos/github/jmpolitzer/react-checkers/badge.svg?branch=master)](https://coveralls.io/github/jmpolitzer/react-checkers?branch=master)

## Install 

```
npm install --save react-checkers
```
## Raison D'être

Because who hasn't always dreamed of building a game of checkers using a custom React hook? 

## Example

#### Using the component:
```
import { Checkerboard } from 'react-checkers';

function MyComponent() {
  <Checkerboard />
}
```

#### Using the hook (only for the adventurous types):
```
import { useCheckers } from 'react-checkers';

function MyComponent() {
  const { board, handleMove, handlePick, playerTurn, scoreboard, rules } = useCheckers();
  
  return (
    <div>
      <div>`Turn: ${playerTurn}`</div>
      <div>
        <div>Score:</div>
        <div>{`Player 1: ${scoreboard[1]} | Player 2: ${scoreboard[2]}`}</div>
      </div>
      <div>
        {Object.keys(board).map((row, j) => {
          return (
            <div key={j}>
              {Object.keys(board[row]).map((positionIndex, k) => {
                const square = board[row][positionIndex];
                const isEvenPosition = (square.position.x + 1 * square.position.y) % 2 === 0

                return (
                  <div onClick={() => (!square.occupiedBy ? handleMove(square) : null)}>
                    {square.occupiedBy !== null && isEvenPosition && (
                      <div onClick={() => handlePick(square)}>
                        {square.isKinged && 'K'}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
      <div>
        <div>Rules:</div>
        <div>
          {rules.map((rule, i) => (
            <div key={i}>
              {i + 1}. {rule}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

## Usage


## Features

  
## API


## License

MIT © [jmpolitzer](https://github.com/jmpolitzer)
