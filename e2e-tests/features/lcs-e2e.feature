@LcsRegression
@LcsRegressionCI
Feature: LCS - Landlords Checking Service

  @RegressionLcsAndNrmCI
  Scenario Outline: Landlords Checking Service - E2E NEW
    Given I visit the Landlords checking service page
    When I fill out my answers for LCS "<Description>"
    Then "Right to rent check requested" text is displayed as page header for LCS
    And Request another check button is displayed for LCS
    Examples:
      | Description                                                                                               |
      | Living in property, born before 1988 and has been in uk before 1988 answer is Yes                         |
      | Living in property, born before 1988 and has been in uk before 1988 answer is No                          |
      | Not living in property, born before 1988 and has been in uk before 1988 answer is Yes                     |
      | Not living in property, born before 1988 and has been in uk before 1988 answer is No                      |
      | Not living in property, born after 1988                                                                   |
      | Living in property, born after 1988                                                                       |
      | Dob is 30/12/1987, has been in uk before 1988 answer is Yes and Date tenant moved to the UK is 31/12/1987 |
      | Living in property, Dob is 31/12/1987 then has been in uk before 1988 page bypassed                       |



  Scenario Outline: Landlords Checking Service - links
    Given I visit the Landlords checking service page
    When I navigate to "<Page>" page
    And I select "<Link Name>" link
    Then I will be redirected to the correct page "<Page title>"
    Examples:
      | Page           | Link Name                                              | Page title                                                   |
      | Start page     | Ask to see relevant documents                          | Right to rent document checks: a user guide - GOV.UK         |
      | Start page     | Checking guide                                         | Check if someone can rent your residential property - GOV.UK |
      | Privacy policy | read more about how the Home Office uses personal data | Personal information charter - Home Office - GOV.UK          |