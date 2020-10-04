describe('Legal page', () => {
  beforeEach(() => {
    cy.visit('/legal')
  })

  it('Displays legal information', () => {
    cy.contains('h1', 'Legal')
    cy.contains('a', 'Terms & Conditions')
    cy.contains('a', 'Privacy policy')
  })
})
