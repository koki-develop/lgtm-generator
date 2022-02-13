// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import "cypress-file-upload";

Cypress.Commands.add("getByTestId", (id: string) => {
  return cy.get(`[data-testid='${id}']`);
});

Cypress.Commands.add(
  "findByTestId",
  { prevSubject: "element" },
  (subject, id: string) => {
    return cy.wrap(subject).find(`[data-testid='${id}']`);
  }
);

Cypress.Commands.add("pathname", () => {
  return cy.url().then((url) => {
    return cy.wrap(new URL(url).pathname);
  });
});

Cypress.Commands.add("search", () => {
  return cy.url().then((url) => {
    return cy.wrap(new URL(url).search);
  });
});

Cypress.Commands.add("enter", { prevSubject: "element" }, (subject) => {
  return cy.wrap(subject).type("{enter}");
});

Cypress.Commands.add("visible", { prevSubject: "element" }, (subject) => {
  return cy.wrap(subject).filter(":visible");
});
