describe('a complete game of checkers', () => {
  it('should play checkers until there is one player left', () => {
    cy.visit('http://localhost:3000')

    // White moves one
    cy.get('[data-testid="[4, 2]"]').click()
    cy.get('[data-testid="[3, 3]"]').click()

    // Red moves one
    cy.get('[data-testid="[1, 5]"]').click()
    cy.get('[data-testid="[2, 4]"]').click()

    // White jumps over red
    cy.get('[data-testid="[3, 3]"]').click()
    cy.get('[data-testid="[1, 5]"]').click()
    cy.get('[data-testid="player1-checker"]').should('have.length', 1)

    // Red jumps over white
    cy.get('[data-testid="[0, 6]"]').click()
    cy.get('[data-testid="[2, 4]"]').click()
    cy.get('[data-testid="player2-checker"]').should('have.length', 1)

    // White moves one
    cy.get('[data-testid="[2, 2]"]').click()
    cy.get('[data-testid="[3, 3]"]').click()

    // Red moves one
    cy.get('[data-testid="[2, 4]"]').click()
    cy.get('[data-testid="[1, 3]"]').click()

    // White moves one
    cy.get('[data-testid="[3, 3]"]').click()
    cy.get('[data-testid="[4, 4]"]').click()

    // Red moves one
    cy.get('[data-testid="[7, 5]"]').click()
    cy.get('[data-testid="[6, 4]"]').click()

    // White moves one
    cy.get('[data-testid="[1, 1]"]').click()
    cy.get('[data-testid="[2, 2]"]').click()

    // Red jumps over two whites
    cy.get('body').trigger('keydown', { key: 'm' })
    cy.get('[data-testid="[5, 5]"]').click()
    cy.get('[data-testid="[3, 3]"]').click()
    cy.get('[data-testid="[1, 1]"]').click()
    cy.get('body').trigger('keyup', { key: 'm' })
    cy.get('[data-testid="player2-checker"]').should('have.length', 3)
    cy.contains('1')
      .parent()
      .should('have.css', 'background-color', 'rgb(0, 0, 0)')

    // White jumps over two reds
    cy.get('body').trigger('keydown', { key: 'm' })
    cy.get('[data-testid="[0, 0]"]').click()
    cy.get('[data-testid="[2, 2]"]').click()
    cy.get('[data-testid="[0, 4]"]').click()
    cy.get('body').trigger('keyup', { key: 'm' })
    cy.get('[data-testid="player1-checker"]').should('have.length', 3)
    cy.contains('2')
      .parent()
      .should('have.css', 'background-color', 'rgb(255, 0, 0)')

    // Red moves one
    cy.get('[data-testid="[3, 5]"]').click()
    cy.get('[data-testid="[2, 4]"]').click()

    // White moves one
    cy.get('[data-testid="[3, 1]"]').click()
    cy.get('[data-testid="[2, 2]"]').click()

    // Red moves one
    cy.get('[data-testid="[2, 6]"]').click()
    cy.get('[data-testid="[3, 5]"]').click()

    // White moves one
    cy.get('[data-testid="[0, 4]"]').click()
    cy.get('[data-testid="[1, 5]"]').click()

    // Red moves one
    cy.get('[data-testid="[1, 7]"]').click()
    cy.get('[data-testid="[0, 6]"]').click()

    // White moves one
    cy.get('[data-testid="[6, 2]"]').click()
    cy.get('[data-testid="[5, 3]"]').click()

    // Red moves one
    cy.get('[data-testid="[6, 6]"]').click()
    cy.get('[data-testid="[5, 5]"]').click()

    // White moves one
    cy.get('[data-testid="[2, 0]"]').click()
    cy.get('[data-testid="[3, 1]"]').click()

    // Red jumps over two whites and is kinged
    cy.get('body').trigger('keydown', { key: 'm' })
    cy.get('[data-testid="[6, 4]"]').click()
    cy.get('[data-testid="[4, 2]"]').click()
    cy.get('[data-testid="[2, 0]"]').click()
    cy.get('body').trigger('keyup', { key: 'm' })
    cy.get('[data-testid="[2, 0]"]')
      .contains('K')
      .should('have.css', 'height', '27px')
    cy.get('[data-testid="player1-checker"]').should('have.length', 2)
    cy.get('[data-testid="player2-checker"]').should('have.length', 5)
    cy.contains('1')
      .parent()
      .should('have.css', 'background-color', 'rgb(0, 0, 0)')

    // White moves one
    cy.get('[data-testid="[1, 5]"]').click()
    cy.get('[data-testid="[2, 6]"]').click()

    // Red moves one
    cy.get('[data-testid="[2, 0]"]').click()
    cy.get('[data-testid="[3, 1]"]').click()

    // White moves one and is kinged
    cy.get('[data-testid="[2, 6]"]').click()
    cy.get('[data-testid="[1, 7]"]').click()
    cy.get('[data-testid="[1, 7]"]')
      .contains('K')
      .should('have.css', 'height', '27px')
    cy.get('[data-testid="player2-checker"]').should('have.length', 4)

    // Red moves one
    cy.get('[data-testid="[0, 6]"]').click()
    cy.get('[data-testid="[1, 5]"]').click()

    // White moves one
    cy.get('[data-testid="[1, 7]"]').click()
    cy.get('[data-testid="[2, 6]"]').click()

    // Red moves one
    cy.get('[data-testid="[3, 1]"]').click()
    cy.get('[data-testid="[4, 2]"]').click()

    // White king jumps over two reds and jumps backwards
    cy.get('body').trigger('keydown', { key: 'm' })
    cy.get('[data-testid="[2, 6]"]').click()
    cy.get('[data-testid="[4, 4]"]').click()
    cy.get('[data-testid="[6, 6]"]').click()
    cy.get('body').trigger('keyup', { key: 'm' })
    cy.get('[data-testid="player1-checker"]').should('have.length', 4)
    cy.contains('2')
      .parent()
      .should('have.css', 'background-color', 'rgb(255, 0, 0)')

    // Red jumps over white king and gets two checkers
    cy.get('[data-testid="[7, 7]"]').click()
    cy.get('[data-testid="[5, 5]"]').click()
    cy.get('[data-testid="player2-checker"]').should('have.length', 6)

    // White moves one
    cy.get('[data-testid="[7, 1]"]').click()
    cy.get('[data-testid="[6, 2]"]').click()

    // Red moves one
    cy.get('[data-testid="[1, 5]"]').click()
    cy.get('[data-testid="[0, 4]"]').click()

    // White jumps over two reds, one of which is a king
    cy.get('body').trigger('keydown', { key: 'm' })
    cy.get('[data-testid="[5, 1]"]').click()
    cy.get('[data-testid="[3, 3]"]').click()
    cy.get('[data-testid="[1, 5]"]').click()
    cy.get('body').trigger('keyup', { key: 'm' })
    cy.get('[data-testid="player1-checker"]').should('have.length', 7)
    cy.contains('2')
      .parent()
      .should('have.css', 'background-color', 'rgb(255, 0, 0)')

    // Red moves one
    cy.get('[data-testid="[5, 5]"]').click()
    cy.get('[data-testid="[4, 4]"]').click()

    // White moves one
    cy.get('[data-testid="[6, 2]"]').click()
    cy.get('[data-testid="[5, 3]"]').click()

    // Red moves one
    cy.get('[data-testid="[5, 7]"]').click()
    cy.get('[data-testid="[6, 6]"]').click()

    // White jumps over two reds and is kinged
    cy.get('body').trigger('keydown', { key: 'm' })
    cy.get('[data-testid="[5, 3]"]').click()
    cy.get('[data-testid="[3, 5]"]').click()
    cy.get('[data-testid="[5, 7]"]').click()
    cy.get('body').trigger('keyup', { key: 'm' })
    cy.get('[data-testid="[5, 7]"]')
      .contains('K')
      .should('have.css', 'height', '27px')
    cy.get('[data-testid="player1-checker"]').should('have.length', 9)
    cy.contains('2')
      .parent()
      .should('have.css', 'background-color', 'rgb(255, 0, 0)')

    // Red moves one
    cy.get('[data-testid="[6, 6]"]').click()
    cy.get('[data-testid="[5, 5]"]').click()

    // White moves one
    cy.get('[data-testid="[2, 2]"]').click()
    cy.get('[data-testid="[1, 3]"]').click()

    // Red moves one
    cy.get('[data-testid="[5, 5]"]').click()
    cy.get('[data-testid="[4, 4]"]').click()

    // White moves one
    cy.get('[data-testid="[4, 0]"]').click()
    cy.get('[data-testid="[3, 1]"]').click()

    // Red moves one
    cy.get('[data-testid="[4, 4]"]').click()
    cy.get('[data-testid="[3, 3]"]').click()

    // White moves one
    cy.get('[data-testid="[6, 0]"]').click()
    cy.get('[data-testid="[5, 1]"]').click()

    // Red jumps over two whites and is kinged
    cy.get('body').trigger('keydown', { key: 'm' })
    cy.get('[data-testid="[0, 4]"]').click()
    cy.get('[data-testid="[2, 2]"]').click()
    cy.get('[data-testid="[4, 0]"]').click()
    cy.get('body').trigger('keyup', { key: 'm' })
    cy.get('[data-testid="[4, 0]"]')
      .contains('K')
      .should('have.css', 'height', '27px')
    cy.get('[data-testid="player1-checker"]').should('have.length', 8)
    cy.get('[data-testid="player2-checker"]').should('have.length', 7)
    cy.contains('1')
      .parent()
      .should('have.css', 'background-color', 'rgb(0, 0, 0)')

    // White king moves one backwards
    cy.get('[data-testid="[5, 7]"]').click()
    cy.get('[data-testid="[4, 6]"]').click()

    // Red jumps over white king and gets two checkers
    cy.get('[data-testid="[3, 7]"]').click()
    cy.get('[data-testid="[5, 5]"]').click()
    cy.get('[data-testid="player2-checker"]').should('have.length', 9)

    // White moves one
    cy.get('[data-testid="[5, 1]"]').click()
    cy.get('[data-testid="[4, 2]"]').click()

    // Red jumps over white
    cy.get('[data-testid="[3, 3]"]').click()
    cy.get('[data-testid="[5, 1]"]').click()
    cy.get('[data-testid="player2-checker"]').should('have.length', 10)

    // White moves one
    cy.get('[data-testid="[1, 5]"]').click()
    cy.get('[data-testid="[2, 6]"]').click()

    // Red moves one
    cy.get('[data-testid="[4, 0]"]').click()
    cy.get('[data-testid="[3, 1]"]').click()

    // White moves one and is kinged
    cy.get('[data-testid="[2, 6]"]').click()
    cy.get('[data-testid="[1, 7]"]').click()
    cy.get('[data-testid="[1, 7]"]')
      .contains('K')
      .should('have.css', 'height', '27px')
    cy.get('[data-testid="player2-checker"]').should('have.length', 9)

    // Red moves one
    cy.get('[data-testid="[5, 5]"]').click()
    cy.get('[data-testid="[4, 4]"]').click()

    // White king moves one backwards
    cy.get('[data-testid="[1, 7]"]').click()
    cy.get('[data-testid="[2, 6]"]').click()

    // Red moves one
    cy.get('[data-testid="[4, 4]"]').click()
    cy.get('[data-testid="[3, 3]"]').click()

    // White moves one
    cy.get('[data-testid="[0, 2]"]').click()
    cy.get('[data-testid="[1, 3]"]').click()

    // Red king moves one backwards
    cy.get('[data-testid="[3, 1]"]').click()
    cy.get('[data-testid="[2, 2]"]').click()

    // White king moves one backwards
    cy.get('[data-testid="[2, 6]"]').click()
    cy.get('[data-testid="[1, 5]"]').click()

    // Red king jumps over white
    cy.get('[data-testid="[2, 2]"]').click()
    cy.get('[data-testid="[0, 4]"]').click()
    cy.get('[data-testid="player2-checker"]').should('have.length', 10)

    // White king moves one
    cy.get('[data-testid="[1, 5]"]').click()
    cy.get('[data-testid="[0, 6]"]').click()

    // Red king moves one backwards
    cy.get('[data-testid="[0, 4]"]').click()
    cy.get('[data-testid="[1, 5]"]').click()

    // White jumps over three reds to win the game
    cy.get('body').trigger('keydown', { key: 'm' })
    cy.get('[data-testid="[0, 6]"]').click()
    cy.get('[data-testid="[2, 4]"]').click()
    cy.get('[data-testid="[4, 2]"]').click()
    cy.get('[data-testid="[6, 0]"]').click()
    cy.get('body').trigger('keyup', { key: 'm' })
    cy.get('[data-testid="player1-checker"]').should('have.length', 12)
    cy.contains('2')
      .parent()
      .should('have.css', 'background-color', 'rgb(255, 0, 0)')
  })
})
