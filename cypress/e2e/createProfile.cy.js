describe('Check if create profile page renders the correct componentes', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/cadastro')
  })
   
it('should steps 1 and 2 works', () => {
    cy.get('input[type="text"]').type('Teste Cypress')
    cy.get('input[type="email"]').type('joao@email.com')
    cy.get('input[type="tel"]').type('123456789')
    cy.get('button[type="submit"]').click()
    cy.get('input[type="password"]').type('Testednc@8')
    cy.get('button[type="submit"]').should('be.visible')
})
})