import React from 'react'
import { render, cleanup } from 'react-testing-library'
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
})
