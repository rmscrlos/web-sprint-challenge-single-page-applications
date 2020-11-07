// my tests

describe('Form Test', () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/pizza")
  })

  it("tests input fields and submit button", () => {
    cy.get("input[name=name]")
    .should("exist")
    .type("Carlos Ramos")

    cy.get("input[name=ham]")
      .should("exist")
      .click()
    cy.get("input[name=pineapple]")
      .should("exist")
      .click()
    cy.get("input[name=bacon]")
      .should("exist")
      .click()

      cy.get("button[type=submit]")
      .should("exist")
      .click()
  })
  
})
