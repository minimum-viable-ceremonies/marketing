describe('Legal page', () => {
  beforeEach(() => {
    cy.visit('/help')
  })

  it('Displays help information', () => {
    cy.contains('h1', 'Having trouble?')
    cy.contains('a', 'hey@minimal.cards')
    cy.contains('#fc_frame')
  })
})
