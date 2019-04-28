import React from 'react'
import { fireEvent, render, cleanup } from 'react-testing-library'
import 'jest-dom/extend-expect'

import { Checkerboard } from '../index'

const styles = {
  showRulesButton: rulesAreVisible => ({
    margin: 30,
    padding: '5px 10px',
    border: '2px solid red',
    borderRadius: 5,
    backgroundColor: rulesAreVisible ? 'red' : 'white',
    color: rulesAreVisible ? 'white' : 'red',
    fontWeight: 'bold',
    ':hover': {
      cursor: 'pointer'
    }
  }),
  checkerboard: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '50%'
  },
  checkerboardRow: {
    display: 'flex'
  },
  boardSquare: isEvenPosition => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 50,
    backgroundColor: isEvenPosition ? 'black' : 'tan'
  }),
  regularChecker: color => ({
    height: 35,
    width: 35,
    borderRadius: '50%',
    backgroundColor: color,
    cursor: 'pointer'
  }),
  kingedChecker: color => ({
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
  }),
  playerScoreboard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  playerName: (playerTurn, player, color) => ({
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
  }),
  playerScore: {
    display: 'flex',
    width: '80px',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  capturedChecker: {
    marginBottom: '5px'
  }
}

const playerColors = {
  player1: 'teal',
  player2: 'purple'
}

afterEach(cleanup)

describe('Checkerboard', () => {
  it('should render a board with a number of squares equal to dimensions * dimensions', () => {
    const { getAllByTestId } = render(<Checkerboard />)

    expect(getAllByTestId(/\[.*?\]/).length).toBe(64)
  })

  it('should render a board with custom styles, playerColors, dimensions, and no rules', () => {
    const { getAllByTestId, queryByText } = render(
      <Checkerboard
        dimensions={10}
        styles={styles}
        playerColors={playerColors}
        showRules={false}
      />
    )

    expect(getAllByTestId(/\[.*?\]/).length).toBe(100)
    expect(queryByText('Show Rules')).not.toBeInTheDocument()
  })

  it('should render a board with toggleable rules', () => {
    const { getByText, queryByText } = render(<Checkerboard />)

    getByText('Show Rules').click()
    expect(
      getByText("1. If a player's circle is full, it is their turn.")
    ).toBeInTheDocument()
    getByText('Hide Rules').click()
    expect(
      queryByText("1. If a player's circle is full, it is their turn.")
    ).not.toBeInTheDocument()
  })

  it("should move a single checker one forward-diagonal square if it the player's turn", () => {
    const { getByTestId } = render(<Checkerboard />)

    getByTestId('[4, 2]').children[0].click()
    getByTestId('[3, 3]').click()

    expect(getByTestId('[4, 2]').children[0]).toBe(undefined)
    expect(getByTestId('[3, 3]').children[0]).toBeInTheDocument()
  })

  it("should not move a single checker one forward-diagonal square if it is not the player's turn", () => {
    const { getByTestId } = render(<Checkerboard />)

    getByTestId('[1, 5]').children[0].click()
    getByTestId('[2, 4]').click()

    expect(getByTestId('[1, 5]').children[0]).toBeInTheDocument()
    expect(getByTestId('[2, 4]').children[0]).toBe(undefined)
  })

  it('should not move a single checker two forward-diagonal squares if it is not a jump', () => {
    const { getByTestId } = render(<Checkerboard />)

    getByTestId('[4, 2]').children[0].click()
    getByTestId('[2, 4]').click()

    expect(getByTestId('[4, 2]').children[0]).toBeInTheDocument()
    expect(getByTestId('[2, 4]').children[0]).toBe(undefined)
  })

  it("should jump a single checker and player's score should be incremented by 1", () => {
    const { getByTestId, getAllByTestId } = render(<Checkerboard />)

    getByTestId('[4, 2]').children[0].click()
    getByTestId('[3, 3]').click()
    getByTestId('[1, 5]').children[0].click()
    getByTestId('[2, 4]').click()
    getByTestId('[3, 3]').children[0].click()
    getByTestId('[1, 5]').click()

    expect(getAllByTestId('player1-checker').length).toBe(1)
  })

  it("should jump two checkers moving forward if the m key is pressed down and the player's score should be incremented by 2", () => {
    const { container, getByTestId, getAllByTestId } = render(<Checkerboard />)

    getByTestId('[4, 2]').children[0].click()
    getByTestId('[3, 3]').click()
    getByTestId('[3, 5]').children[0].click()
    getByTestId('[4, 4]').click()
    getByTestId('[3, 3]').children[0].click()
    getByTestId('[2, 4]').click()
    getByTestId('[2, 6]').children[0].click()
    getByTestId('[3, 5]').click()
    getByTestId('[5, 1]').children[0].click()
    getByTestId('[4, 2]').click()

    fireEvent.keyDown(container, { key: 'm', code: 77, charCode: 77 })
    getByTestId('[1, 5]').children[0].click()
    getByTestId('[3, 3]').click()
    getByTestId('[5, 1]').click()
    fireEvent.keyUp(container, { key: 'm', code: 77, charCode: 77 })

    expect(getAllByTestId('player2-checker').length).toBe(2)
  })

  it('should not be able jump two checkers moving forward if a key other than m is pressed down', () => {
    const { container, getByTestId, getAllByTestId } = render(<Checkerboard />)

    getByTestId('[4, 2]').children[0].click()
    getByTestId('[3, 3]').click()
    getByTestId('[3, 5]').children[0].click()
    getByTestId('[4, 4]').click()
    getByTestId('[3, 3]').children[0].click()
    getByTestId('[2, 4]').click()
    getByTestId('[2, 6]').children[0].click()
    getByTestId('[3, 5]').click()
    getByTestId('[5, 1]').children[0].click()
    getByTestId('[4, 2]').click()

    fireEvent.keyDown(container, { key: 'n', code: 77, charCode: 77 })
    getByTestId('[1, 5]').children[0].click()
    getByTestId('[3, 3]').click()
    getByTestId('[5, 1]').click()
    fireEvent.keyUp(container, { key: 'n', code: 77, charCode: 77 })

    /* score will still increment by one */
    expect(getAllByTestId('player2-checker').length).toBe(1)
  })

  it('should not be able jump two checkers moving forward if the m key is lifted in the middle of a double jump', () => {
    const { container, getByTestId, getAllByTestId } = render(<Checkerboard />)

    getByTestId('[4, 2]').children[0].click()
    getByTestId('[3, 3]').click()
    getByTestId('[3, 5]').children[0].click()
    getByTestId('[4, 4]').click()
    getByTestId('[3, 3]').children[0].click()
    getByTestId('[2, 4]').click()
    getByTestId('[2, 6]').children[0].click()
    getByTestId('[3, 5]').click()
    getByTestId('[5, 1]').children[0].click()
    getByTestId('[4, 2]').click()

    fireEvent.keyDown(container, { key: 'm', code: 77, charCode: 77 })
    fireEvent.keyDown(container, { key: 'm', code: 77, charCode: 77 }) // Does not set isMultiJump to true if already true
    getByTestId('[1, 5]').children[0].click()
    fireEvent.keyUp(container, { key: 'm', code: 77, charCode: 77 })
    fireEvent.keyUp(container, { key: 'm', code: 77, charCode: 77 }) // Does not set isMultiJump to false if already false
    getByTestId('[3, 3]').click()
    getByTestId('[5, 1]').click()

    /* score will still increment by one */
    expect(getAllByTestId('player2-checker').length).toBe(1)
  })

  it("should decrement the opposing player's score when player is kinged by jump", () => {
    const { container, getByTestId, getAllByTestId, queryByTestId } = render(
      <Checkerboard styles={styles} playerColors={playerColors} />
    )

    getByTestId('[4, 2]').children[0].click()
    getByTestId('[3, 3]').click()
    getByTestId('[1, 5]').children[0].click()
    getByTestId('[2, 4]').click()
    getByTestId('[3, 3]').children[0].click()
    getByTestId('[1, 5]').click()
    expect(getAllByTestId('player1-checker').length).toBe(1)
    getByTestId('[3, 5]').children[0].click()
    getByTestId('[4, 4]').click()
    getByTestId('[5, 1]').children[0].click()
    getByTestId('[4, 2]').click()
    getByTestId('[4, 4]').children[0].click()
    getByTestId('[5, 3]').click()
    getByTestId('[4, 2]').children[0].click()
    getByTestId('[3, 3]').click()
    getByTestId('[5, 5]').children[0].click()
    getByTestId('[6, 4]').click()
    getByTestId('[6, 0]').children[0].click()
    getByTestId('[5, 1]').click()

    fireEvent.keyDown(container, { key: 'm', code: 77, charCode: 77 })
    getByTestId('[0, 6]').children[0].click()
    getByTestId('[2, 4]').click()
    getByTestId('[4, 2]').click()
    getByTestId('[6, 0]').click()
    fireEvent.keyUp(container, { key: 'm', code: 77, charCode: 77 })

    expect(queryByTestId('player1-checker')).toBeNull()
    expect(getAllByTestId('player2-checker').length).toBe(3)
    expect(getByTestId('[6, 0]')).toHaveTextContent('K')
  })

  it("should increment the player's score by two when a king is jumped", () => {
    const { container, getByTestId, getAllByTestId, queryByTestId } = render(
      <Checkerboard />
    )

    getByTestId('[4, 2]').children[0].click()
    getByTestId('[3, 3]').click()
    getByTestId('[1, 5]').children[0].click()
    getByTestId('[2, 4]').click()
    getByTestId('[3, 3]').children[0].click()
    getByTestId('[1, 5]').click()
    expect(getAllByTestId('player1-checker').length).toBe(1)
    getByTestId('[3, 5]').children[0].click()
    getByTestId('[4, 4]').click()
    getByTestId('[5, 1]').children[0].click()
    getByTestId('[4, 2]').click()
    getByTestId('[4, 4]').children[0].click()
    getByTestId('[5, 3]').click()
    getByTestId('[4, 2]').children[0].click()
    getByTestId('[3, 3]').click()
    getByTestId('[5, 5]').children[0].click()
    getByTestId('[6, 4]').click()
    getByTestId('[6, 0]').children[0].click()
    getByTestId('[5, 1]').click()

    fireEvent.keyDown(container, { key: 'm', code: 77, charCode: 77 })
    getByTestId('[0, 6]').children[0].click()
    getByTestId('[2, 4]').click()
    getByTestId('[4, 2]').click()
    getByTestId('[6, 0]').click()
    fireEvent.keyUp(container, { key: 'm', code: 77, charCode: 77 })

    expect(queryByTestId('player1-checker')).toBeNull()
    expect(getAllByTestId('player2-checker').length).toBe(3)
    expect(getByTestId('[6, 0]')).toHaveTextContent('K')

    getByTestId('[6, 2]').children[0].click()
    getByTestId('[4, 4]').click()
    expect(getAllByTestId('player1-checker').length).toBe(1)
    getByTestId('[6, 0]').children[0].click()
    getByTestId('[5, 1]').click()
    getByTestId('[4, 0]').children[0].click()
    getByTestId('[6, 2]').click()
    expect(getAllByTestId('player1-checker').length).toBe(3)
    expect(getAllByTestId('player2-checker').length).toBe(3)
  })

  it("should decrement player1's score when player2 is kinged by single move", () => {
    const { getByTestId, getAllByTestId, queryByTestId } = render(
      <Checkerboard />
    )

    getByTestId('[0, 2]').children[0].click()
    getByTestId('[1, 3]').click()
    getByTestId('[1, 5]').children[0].click()
    getByTestId('[0, 4]').click()
    getByTestId('[1, 3]').children[0].click()
    getByTestId('[2, 4]').click()
    getByTestId('[0, 4]').children[0].click()
    getByTestId('[1, 3]').click()
    getByTestId('[2, 2]').children[0].click()
    getByTestId('[3, 3]').click()
    getByTestId('[1, 3]').children[0].click()
    getByTestId('[0, 2]').click()
    getByTestId('[1, 1]').children[0].click()
    getByTestId('[2, 2]').click()
    getByTestId('[3, 5]').children[0].click()
    getByTestId('[1, 3]').click()
    expect(getAllByTestId('player2-checker').length).toBe(1)
    getByTestId('[2, 2]').children[0].click()
    getByTestId('[0, 4]').click()
    expect(getAllByTestId('player1-checker').length).toBe(1)
    getByTestId('[0, 6]').children[0].click()
    getByTestId('[1, 5]').click()
    getByTestId('[0, 0]').children[0].click()
    getByTestId('[1, 1]').click()
    getByTestId('[1, 5]').children[0].click()
    getByTestId('[2, 4]').click()
    getByTestId('[1, 1]').children[0].click()
    getByTestId('[2, 2]').click()
    getByTestId('[0, 2]').children[0].click()
    getByTestId('[1, 1]').click()
    getByTestId('[2, 2]').children[0].click()
    getByTestId('[1, 3]').click()
    getByTestId('[1, 1]').children[0].click()
    getByTestId('[0, 0]').click()

    expect(queryByTestId('player1-checker')).toBeNull()
    expect(getByTestId('[0, 0]')).toHaveTextContent('K')
  })

  it("should decrement the player2's score when player1 is kinged by single move", () => {
    const { getByTestId, getAllByTestId, queryByTestId } = render(
      <Checkerboard />
    )

    getByTestId('[0, 2]').children[0].click()
    getByTestId('[1, 3]').click()
    getByTestId('[1, 5]').children[0].click()
    getByTestId('[2, 4]').click()
    getByTestId('[1, 3]').children[0].click()
    getByTestId('[0, 4]').click()
    getByTestId('[0, 6]').children[0].click()
    getByTestId('[1, 5]').click()
    getByTestId('[2, 2]').children[0].click()
    getByTestId('[1, 3]').click()
    getByTestId('[2, 4]').children[0].click()
    getByTestId('[0, 2]').click()
    expect(getAllByTestId('player2-checker').length).toBe(1)
    getByTestId('[1, 1]').children[0].click()
    getByTestId('[2, 2]').click()
    getByTestId('[1, 5]').children[0].click()
    getByTestId('[2, 4]').click()
    getByTestId('[0, 4]').children[0].click()
    getByTestId('[1, 5]').click()
    getByTestId('[2, 4]').children[0].click()
    getByTestId('[1, 3]').click()
    getByTestId('[1, 5]').children[0].click()
    getByTestId('[0, 6]').click()
    getByTestId('[2, 6]').children[0].click()
    getByTestId('[1, 5]').click()
    getByTestId('[2, 2]').children[0].click()
    getByTestId('[3, 3]').click()
    getByTestId('[1, 7]').children[0].click()
    getByTestId('[2, 6]').click()
    getByTestId('[0, 6]').children[0].click()
    getByTestId('[1, 7]').click()

    expect(queryByTestId('player2-checker')).toBeNull()
    expect(getByTestId('[1, 7]')).toHaveTextContent('K')
  })

  it("should not decrement the opposing player's score when player is kinged if opposing player has not captured any checkers", () => {
    const { getByTestId, queryByTestId } = render(<Checkerboard />)

    getByTestId('[0, 2]').children[0].click()
    getByTestId('[1, 3]').click()
    getByTestId('[1, 5]').children[0].click()
    getByTestId('[2, 4]').click()
    getByTestId('[1, 3]').children[0].click()
    getByTestId('[0, 4]').click()
    getByTestId('[0, 6]').children[0].click()
    getByTestId('[1, 5]').click()
    getByTestId('[2, 2]').children[0].click()
    getByTestId('[1, 3]').click()
    getByTestId('[2, 4]').children[0].click()
    getByTestId('[3, 3]').click()
    getByTestId('[1, 1]').children[0].click()
    getByTestId('[0, 2]').click()
    getByTestId('[3, 3]').children[0].click()
    getByTestId('[2, 2]').click()
    getByTestId('[1, 3]').children[0].click()
    getByTestId('[2, 4]').click()
    getByTestId('[3, 5]').children[0].click()
    getByTestId('[4, 4]').click()
    getByTestId('[0, 2]').children[0].click()
    getByTestId('[1, 3]').click()
    getByTestId('[4, 4]').children[0].click()
    getByTestId('[3, 3]').click()
    getByTestId('[2, 0]').children[0].click()
    getByTestId('[1, 1]').click()
    getByTestId('[5, 5]').children[0].click()
    getByTestId('[4, 4]').click()
    getByTestId('[1, 1]').children[0].click()
    getByTestId('[0, 2]').click()
    getByTestId('[2, 2]').children[0].click()
    getByTestId('[1, 1]').click()
    getByTestId('[3, 1]').children[0].click()
    getByTestId('[2, 2]').click()
    getByTestId('[1, 1]').children[0].click()
    getByTestId('[2, 0]').click()

    expect(queryByTestId('player1-checker')).toBeNull()
    expect(getByTestId('[2, 0]')).toHaveTextContent('K')
  })
})
