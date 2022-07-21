import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

When('I click on add button', () => {
  cy.getC('add-entry').should('be.visible').click();
});

Then('I should see add new entry form', () => {
  cy.getC('agenda-edit-entry').should('be.visible');
  cy.get('.start-date').should('be.visible');
  cy.getC('edit-name').should('be.visible');
  cy.getC('edit-description').should('be.visible');
});

When('I enter entry with name {string} and description {string}', (name, description) => {
  cy.getC('edit-name').type(name);
  cy.getC('edit-description').type(description);
});

When('I enter time {string}', (time) => {
  cy.get('span.start-date').click();
  cy.get('input.rc-time-picker-panel-input').invoke('val', '').type(time);
  cy.get('span.start-date').clickOutside();
});

When('I click on save', () => {
  cy.getC('save-button').click();
});

Then('I see entry with {string}, {string} and {string}', (time, name, description) => {
  cy.get('.agenda-entry')
    .children()
    .should('contain', time)
    .and('contain', name)
    .and('contain', description);
});

Then('I should not see entry with {string}, {string} and {string}', (time, name, description) => {
  cy.get('.agenda-entry')
    .children()
    .should('not.contain', time)
    .and('not.contain', name)
    .and('not.contain', description);
});

When('I should see {int} entries', (number) => {
  cy.get('.agenda-entry').should('have.length', number);
});

When('I click on delete button', () => {
  cy.getC('delete-entry').click();
});
