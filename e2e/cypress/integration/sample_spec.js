describe('My First Test', () => {
  it('Does not do much!', () => {
    cy.visit('http://localhost:3000');

    // 画像検索
    cy.get('[data-testid=tab-search-images]').click();
    cy.url().should('equal', 'http://localhost:3000/?tab=search_images');

    // お気に入り
    cy.get('[data-testid=tab-favorites]').click();
    cy.url().should('equal', 'http://localhost:3000/?tab=favorites');
  });
});
