describe("Home: Search FIPE", () => {
  it("should render with empty form", () => {
    cy.visit("/");
  });

  it("should render with disabled button if empty form", () => {
    cy.visit("/");
    cy.get("[data-cy=submit-button]").should("have.attr", "disabled");
  });

  it("should select all inputs on form", () => {
    cy.visit("/");

    cy.get(`[data-cy=select-brand]`).click();
    cy.get(`[data-cy=select-option-7]`).click();

    cy.get(`[data-cy=select-model]`).click();
    cy.get(`[data-cy=select-option-4527]`).click();

    cy.get(`[data-cy=select-year]`).click();
    cy.get(`[data-cy=select-option-2013-1]`).click();

    cy.get("[data-cy=submit-button]").click();
  });
});

describe("Details", () => {
  it("should render details car page", () => {
    cy.visit("/details/7/4527/2013-1");
  });
});
