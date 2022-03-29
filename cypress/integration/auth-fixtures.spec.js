describe("Test auth with fixtures", () => {
  beforeEach(() => {
    cy.intercept("GET", "cards", { fixture: "cards.json" });
    cy.intercept("POST", "signin", { fixture: "login.json" }).as("postLogin");
    cy.intercept("GET", "me", { fixture: "me.json" });
    cy.viewport(1300, 800);
    cy.visit("http://localhost:3000/");
  });

  it("should login", () => {
    cy.get("[data-testid=email_input]").type(`review25@mail.com{enter}`);
    cy.get("[data-testid=password_input]").type(`12345678{enter}`);
    cy.wait("@postLogin").its("request.body").should("deep.equal", {
      email: "review25@mail.com",
      password: "12345678",
    });
    cy.get(".header__user").should("have.text", "review25@mail.com");
  });
});
