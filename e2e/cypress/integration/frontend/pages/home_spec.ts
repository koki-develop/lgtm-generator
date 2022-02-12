import urlJoin from "url-join";

describe("/", () => {
  it("Does not do much!", () => {
    cy.visit("/");

    // 言語切替
    cy.get("[data-testid=translate]").click();
    cy.get("[data-testid=translate-en]").click();
    cy.url().should("equal", Cypress.config().baseUrl + "/en");
    cy.get("[data-testid=translate]").click();
    cy.get("[data-testid=translate-ja]").click();
    cy.url().should("equal", Cypress.config().baseUrl + "/");

    // 画像検索
    cy.get("[data-testid=tab-search-images]").click();
    cy.url().should("equal", Cypress.config().baseUrl + "/?tab=search_images");

    // お気に入り
    cy.get("[data-testid=tab-favorites]").click();
    cy.url().should("equal", Cypress.config().baseUrl + "/?tab=favorites");
  });
});
