Cypress.Commands.add('getC', (selector, ...args) => {
  return cy.get(`[data-cy="${selector}"]`, ...args);
});

Cypress.Commands.add('clickOutside', () => {
  return cy.get('body').click(0, 0);
});
