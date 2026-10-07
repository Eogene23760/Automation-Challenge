# =====================================================================
# Feature: Homepage 99 app (bagian revamp) - versi Indonesia (com.urbanindo.android)
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
    And I should see the bottom navigation tabs

  @homepage @tabs
  Scenario: User can open the Hunian Baru tab
    Given I open the 99 app
    And I should see the homepage
    When I tap the Hunian Baru tab
    Then the Hunian Baru tab should be active

  @homepage @tabs
  Scenario: User can open the Akun Saya tab
    Given I open the 99 app
    And I should see the homepage
    When I tap the Akun Saya tab
    Then the Akun Saya tab should be active

  @homepage @tabs
  Scenario: User can return to the Cari tab
    Given I open the 99 app
    And I should see the homepage
    When I tap the Akun Saya tab
    And I tap the Cari tab
    Then the Cari tab should be active
