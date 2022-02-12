const randomSearchKeyword = (): string => {
  const keywords: string[] = ["cat", "dog", "sheep", "hamster"];
  return keywords[Math.floor(Math.random() * keywords.length)];
};

// TODO: リファクタ
// TODO: コピーボタンのテストを追加
describe("/", () => {
  it("works", () => {
    cy.visit("/");

    /*
     * 英語
     */
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
    cy.get("[data-testid=tab-lgtms]").click();
    cy.get("[data-testid=favorite]").first().click();
    cy.get("[data-testid=tab-favorites]").click();
    cy.get("[data-testid=no-favorites]").should("not.exist");
    cy.get("[data-testid=favorites-panel] [data-testid=unfavorite]")
      .first()
      .click();
    cy.get("[data-testid=no-favorites]").should("not.exist");
    cy.get("[data-testid=tab-lgtms]").click();
    cy.get("[data-testid=tab-favorites]").click();
    cy.get("[data-testid=no-favorites]").contains(
      "There are no favorites yet."
    );

    // LGTM
    cy.get("[data-testid=tab-lgtms]").click();
    cy.url().should("equal", Cypress.config().baseUrl + "/en");
    cy.get("[data-testid=upload-file]").attachFile("images/gray.png");
    cy.get("[data-testid=generate]").click();
    cy.contains("Generated LGTM image.");
    cy.get("[data-testid=lgtm-card-report-button]").first().click();
    cy.get("[data-testid=report-form-type-radio-other] input").check();
    cy.get("[data-testid=report-form-text-input]").type("e2e test");
    cy.get("[data-testid=report-form-send-button]").click();
    cy.contains("Sent.");

    /*
     * 日本語
     */
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
    cy.get("[data-testid=tab-lgtms]").click();
    cy.get("[data-testid=favorite]").first().click();
    cy.get("[data-testid=tab-favorites]").click();
    cy.get("[data-testid=no-favorites]").should("not.exist");
    cy.get("[data-testid=favorites-panel] [data-testid=unfavorite]")
      .first()
      .click();
    cy.get("[data-testid=no-favorites]").should("not.exist");
    cy.get("[data-testid=tab-lgtms]").click();
    cy.get("[data-testid=tab-favorites]").click();
    cy.get("[data-testid=no-favorites]").contains(
      "お気に入りした LGTM 画像はありません。"
    );

    // LGTM
    cy.get("[data-testid=tab-lgtms]").click();
    cy.url().should("equal", Cypress.config().baseUrl + "/");
    cy.get("[data-testid=upload-file]").attachFile("images/gray.png");
    cy.get("[data-testid=generate]").click();
    cy.contains("LGTM 画像を生成しました");
    cy.get("[data-testid=lgtm-card-report-button]").first().click();
    cy.get("[data-testid=report-form-type-radio-other] input").check();
    cy.get("[data-testid=report-form-text-input]").type("e2e test");
    cy.get("[data-testid=report-form-send-button]").click();
    cy.contains("送信しました");
  });
});
