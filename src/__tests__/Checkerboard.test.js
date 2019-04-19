import React from 'react'
import { fireEvent, render, cleanup } from 'react-testing-library'
import 'jest-dom/extend-expect'

import { Checkerboard } from '../index'

afterEach(cleanup)

describe('Checkerboard', () => {
  it('should render a board with a number of squares equal to dimensions * dimensions', () => {
    const { getAllByTestId } = render(<Checkerboard dimensions={8} />)

    expect(getAllByTestId(/\[.*?\]/).length).toBe(64)
  })

  it("should move a single checker one forward-diagonal square if it the player's turn", () => {
    const { getByTestId } = render(<Checkerboard dimensions={8} />)

    getByTestId('[4, 2]').children[0].click()
    getByTestId('[3, 3]').click()

    expect(getByTestId('[4, 2]').children[0]).toBe(undefined)
    expect(getByTestId('[3, 3]').children[0]).toBeInTheDocument()
  })

  it("should not move a single checker one forward-diagonal square if it is not the player's turn", () => {
    const { getByTestId } = render(<Checkerboard dimensions={8} />)

    getByTestId('[1, 5]').children[0].click()
    getByTestId('[2, 4]').click()

    expect(getByTestId('[1, 5]').children[0]).toBeInTheDocument()
    expect(getByTestId('[2, 4]').children[0]).toBe(undefined)
  })

  it('should not move a single checker two forward-diagonal squares if it is not a jump', () => {
    const { getByTestId } = render(<Checkerboard dimensions={8} />)

    getByTestId('[4, 2]').children[0].click()
    getByTestId('[2, 4]').click()

    expect(getByTestId('[4, 2]').children[0]).toBeInTheDocument()
    expect(getByTestId('[2, 4]').children[0]).toBe(undefined)
  })

  it("should jump a single checker and player's score should be incremented by 1", () => {
    const { getByTestId, getAllByTestId } = render(
      <Checkerboard dimensions={8} />
    )

    getByTestId('[4, 2]').children[0].click()
    getByTestId('[3, 3]').click()
    getByTestId('[1, 5]').children[0].click()
    getByTestId('[2, 4]').click()
    getByTestId('[3, 3]').children[0].click()
    getByTestId('[1, 5]').click()

    expect(getAllByTestId('player1-checker').length).toBe(1)
  })

  it("should jump two checkers moving forward if the m key is pressed down and the player's score should be incremented by 2", () => {
    const { container, getByTestId, getAllByTestId } = render(
      <Checkerboard dimensions={8} />
    )

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
    const { container, getByTestId, getAllByTestId } = render(
      <Checkerboard dimensions={8} />
    )

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
    const { container, getByTestId, getAllByTestId } = render(
      <Checkerboard dimensions={8} />
    )

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
      <Checkerboard dimensions={8} />
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

  it("should decrement player1's score when player2 is kinged by single move", () => {
    const { getByTestId, getAllByTestId, queryByTestId } = render(
      <Checkerboard dimensions={8} />
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
      <Checkerboard dimensions={8} />
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
})
