describe('Slack landing pages', () => {
  it('Displays a success page', () => {
    cy.visit('/slack?result=success')
    cy.contains('Congratulations!')
    cy.contains('code', '/mvc [Your room name]')
    cy.contains('a', 'Make a room')
  })

  it('Displays a failure page', () => {
    cy.visit('/slack?result=failure')
    cy.contains('Oops!')
    cy.contains('a', 'Try again')
  })
})
