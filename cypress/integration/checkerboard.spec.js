describe('a complete game of checkers', () => {
  it('should play checkers until there is one player left', () => {
    cy.visit('http://localhost:3000')

    // White moves one
    cy.get('[data-position="[4, 2]"]').click()
    cy.get('[data-position="[3, 3]"]').click()

    // Red moves one
    cy.get('[data-position="[1, 5]"]').click()
    cy.get('[data-position="[2, 4]"]').click()

    // White jumps over red
    cy.get('[data-position="[3, 3]"]').click()
    cy.get('[data-position="[1, 5]"]').click()
    cy.get('.player1').should('have.length', 1)

    // Red jumps over white
    cy.get('[data-position="[0, 6]"]').click()
    cy.get('[data-position="[2, 4]"]').click()
    cy.get('.player2').should('have.length', 1)

    // White moves one
    cy.get('[data-position="[2, 2]"]').click()
    cy.get('[data-position="[3, 3]"]').click()
  })
})
