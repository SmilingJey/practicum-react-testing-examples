describe('Test auth', () => {
    beforeEach(() => {
        const email = 'review25@mail.com';
        const password = '12345678';
        cy.visit('http://localhost:3000/')
        cy.get('[data-testid=email_input]').type(`${email}{enter}`)
        cy.get('[data-testid=password_input]').type(`${password}{enter}`)
    })

    it('should show user name', () => {
        cy.get(".header__user").should("have.text", "review25@mail.com");
    })

    it('should go to login page after logout', () => {
        cy.get('.header__logout').click();
        cy.get('.auth-form').should('exist')
    })
})

