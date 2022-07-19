Feature: Smoke tests
  Scenario: Contains basic elements
    When I open page
    Then I should see header
    And I should see menu
    And I should see footer
    And I should see content