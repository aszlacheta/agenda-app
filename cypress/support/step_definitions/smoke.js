import { When, Then, And } from '@badeball/cypress-cucumber-preprocessor';

When('I open page', () => {
  cy.visit('/', {
    onBeforeLoad (win) {
      Object.defineProperty(win.navigator, 'language', { value: 'en-US' });
      Object.defineProperty(win.navigator, 'languages', { value: ['en'] });
      Object.defineProperty(win.navigator, 'accept_languages', { value: ['en'] });
    }
  });
});

Then('I should see header', () => {
  cy.getC('header').should('be.visible');
});

And('I should see menu', () => {
  cy.getC('agenda-link').should('be.visible');
  cy.getC('contact-link').should('be.visible');
});

And('I should see footer', () => {
  cy.getC('footer').should('be.visible').contains('All rights reserved');
});

And('I should see content', () => {
  cy.getC('page').should('be.visible');
});
