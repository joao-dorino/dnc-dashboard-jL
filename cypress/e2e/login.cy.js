describe('Login', () => {
  it('should login with valid credentials', () => {
    cy.visit('http://localhost:5173/')

    cy.get('input[type="email"]').type('admin@email.com')
    cy.get('input[type="password"]').type('Testednc@7')
    cy.get('button[type="submit"]').click()
    cy.url().should('include', '/home')
    cy.get('header').should('be.visible')
  })
})

describe('Login flow invalid credentials', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login')
  })

  it('should show error message with invalid credentials', () => {
    cy.get('form').should('be.visible')
  })

  it('should login with invalid credentials', () => {
    cy.get('input[type="email"]').type('usuario@invalido.com')
    cy.get('input[type="password"]').type('Testednc@8')
    cy.get('button[type="submit"]').click()
    cy.contains('Email ou senha inválidos').should('be.visible')
  })
})
