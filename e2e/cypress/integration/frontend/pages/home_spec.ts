const randomSearchKeyword = (): string => {
  const keywords: string[] = ["cat", "dog", "sheep", "hamster"];
  return keywords[Math.floor(Math.random() * keywords.length)];
};

describe("/", () => {
  it("works", () => {
    cy.visit("/");

    // 英語切り替え
    cy.get("[data-testid=translate]").click();
    cy.get("[data-testid=translate-en]").click();
    cy.url().should("equal", Cypress.config().baseUrl + "/en");

    // 画像検索
    cy.get("[data-testid=tab-search-images]").click();
    cy.url().should(
      "equal",
      Cypress.config().baseUrl + "/en?tab=search_images"
    );
    cy.get("[data-testid=search-keyword]")
      .clear()
      .type(`${randomSearchKeyword()}{enter}`);
    cy.get("[data-testid=image-card-action-area]").first().click();
    cy.get("[data-testid=generate]").click();
    cy.contains("Generated LGTM image.");

    // お気に入り
    cy.get("[data-testid=tab-favorites]").click();
    cy.url().should("equal", Cypress.config().baseUrl + "/en?tab=favorites");
    cy.get("[data-testid=no-favorites]").contains(
      "There are no favorites yet."
    );

    // LGTM
    cy.get("[data-testid=tab-lgtms]").click();
    cy.url().should("equal", Cypress.config().baseUrl + "/en");

    // 日本語切り替え
    cy.get("[data-testid=translate]").click();
    cy.get("[data-testid=translate-ja]").click();
    cy.url().should("equal", Cypress.config().baseUrl + "/");

    // 画像検索
    cy.get("[data-testid=tab-search-images]").click();
    cy.url().should("equal", Cypress.config().baseUrl + "/?tab=search_images");
    cy.get("[data-testid=search-keyword]")
      .clear()
      .type(`${randomSearchKeyword()}{enter}`);
    cy.get("[data-testid=image-card-action-area]").first().click();
    cy.get("[data-testid=generate]").click();
    cy.contains("LGTM 画像を生成しました");

    // お気に入り
    cy.get("[data-testid=tab-favorites]").click();
    cy.url().should("equal", Cypress.config().baseUrl + "/?tab=favorites");
    cy.get("[data-testid=no-favorites]").contains(
      "お気に入りした LGTM 画像はありません。"
    );

    // LGTM
    cy.get("[data-testid=tab-lgtms]").click();
    cy.url().should("equal", Cypress.config().baseUrl + "/");
  });
});
