# react-checkers

> Components for Building an Interactive Game of Checkers

[![NPM](https://img.shields.io/npm/v/use-api-request.svg)](https://www.npmjs.com/package/react-checkers)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Build Status](https://travis-ci.com/jmpolitzer/react-checkers.svg?branch=master)](https://travis-ci.com/jmpolitzer/react-checkers)
[![Coverage Status](https://coveralls.io/repos/github/jmpolitzer/react-checkers/badge.svg?branch=master)](https://coveralls.io/github/jmpolitzer/react-checkers?branch=master)

## Install 

```
npm install --save react-checkers
```

## Example

```
import { Checkerboard } from 'react-checkers';

function MyComponent() {
  <Checkerboard />
}
```

```
import { useCheckers } from 'react-checkers';

function MyComponent() {
  const { playerTurn, scoreboard, board, handlePick, handleMove } = useCheckers();
  
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
    </div>
  );
}
```

## Usage


## Features

  
## API


## License

MIT © [jmpolitzer](https://github.com/jmpolitzer)
