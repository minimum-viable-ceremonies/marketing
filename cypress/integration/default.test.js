describe('Marketing page', () => {
  beforeEach(() => {
    cy.visit('')
  })

  it('Hero welcomes the visitor', () => {
    cy.get('#hero').contains('h1', 'Free agile process planning tool')
    cy.get('#hero').contains('a', 'Make a room')
  })

  it('Footer contains contact us informatoin', () => {
    cy.get('#footer').contains('hey@minimal.cards')
    cy.get('#footer').contains('Contact us')
    cy.get('#footer').contains('Stay up to date')
  })
})
