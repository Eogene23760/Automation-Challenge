# =====================================================================
# Feature: Homepage 99 app (bagian revamp)
# Mengacu pada README:
#   1. Open the app
#   2. Once it's open, you will see the homepage
# =====================================================================

Feature: 99 App Homepage
  As a user of the 99 app
  I want to open the app and land on the homepage
  So that I can browse properties

  @smoke
  Scenario: Homepage is displayed after opening the app
    Given I open the 99 app
    Then I should see the homepage

  @homepage
  Scenario: Homepage key elements are visible
    Given I open the 99 app
    Then I should see the homepage
    And I should see the search bar
    And I should see the promo banner

  @homepage @tabs
  Scenario Outline: User can switch between homepage tabs
    Given I open the 99 app
    And I should see the homepage
    When I select the "<tab>" tab
    Then the "<tab>" tab content should be displayed

    Examples:
      | tab        |
      | Buy        |
      | Rent       |
      | New Launch |
