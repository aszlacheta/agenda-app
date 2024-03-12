Feature: Agenda functionality

  Scenario: Add new entry to agenda
    When I open page
    Then I should see content
    When I click on add button
    Then I should see add new entry form
    When I enter entry with name "Test" and description "Test description"
    When I enter time "14:30"
    When I click on save
    Then I see entry with "14:30", "Test" and "Test description"

  Scenario: Delete entry from agenda
    When I open page
    Then I should see content
    When I click on add button
    When I enter entry with name "Test" and description "Test description"
    When I enter time "12:30"
    When I click on save
    Then I see entry with "12:30", "Test" and "Test description"
    And I should see 3 entries
    When I click on delete button
    Then I should not see entry with "12:30", "Test" and "Test description"
    And I should see 2 entries
