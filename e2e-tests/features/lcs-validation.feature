@LcsRegression

Feature: LCS - Landlords Checking Service


  Scenario: LSC - Property occupied page radio and Date validation check [TLF-108]
    Given I visit the Landlords checking service page
    And I navigate to "Does the person already live in your property?" page
    #  User selects 'Continue' without selecting a radio option then "Tell us whether the person already lives in your property" error message is displayed
    When I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Tell us whether the person already lives in your property" error summary
    #  User selects 'Continue' without entering a date then "Tell us when the tenant moved into the property" error message is displayed
    When I select "Yes" and enter tenant move in date as ""
    And I select to continue
    Then I should see "There is a problem" error message displayed
    And I should see "Tell us when the tenant moved into the property" error summary
    #  User selects 'Continue' after entering a date in the future then "This service only applies to tenants who moved in after 30 November 2014" error message is displayed
    When I select "Yes" and enter tenant move in date as "30/11/2014"
    And I select to continue
    Then I should see "There is a problem" error message displayed
    And I should see "This service only applies to tenants who moved in after 30 November 2014" error summary
    #  User selects 'Continue' after entering a date in the future then "This date must not be in the future" error message is displayed
    When I select "Yes" and enter tenant move in date as "tomorrow's date"
    And I select to continue
    Then I should see "There is a problem" error message displayed
    And I should see "This date must not be in the future" error summary



  Scenario: LSC - Tenant details page fields validation check [TLF-108]
    Given I visit the Landlords checking service page
    And I navigate to "Tenant's details" page
    #  User selects 'Continue' without entering a HOF TEST, date of birth, country of nationality and HO reference number
    When I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Enter the Tenant's full name¬Enter the Tenant's date of birth¬Select a country of nationality from the list¬Enter a Home Office reference number" error summary
    #  User selects 'Continue' but date of birth entered is less than 18 years ago
    When I fill in the fields below with for tenant's details:
      | Full name              | HOF TEST               |
      | Date of birth          | less than 18 years ago |
      | Country of nationality | Spain                  |
      | HO reference number    | 1234567                |
    And I select to continue
    Then I should see "There is a problem" error message displayed
    And I should see "The Tenant must be 18 years or older. The right to rent scheme does not apply to children." error summary
    #  User selects 'Continue' but date of birth entered is more than 120 years old
    When I fill in the fields below with for tenant's details:
      | Full name              | HOF TEST                |
      | Date of birth          | more than 120 years ago |
      | Country of nationality | Spain                   |
      | HO reference number    | 1234567                 |
    And I select to continue
    Then I should see "There is a problem" error message displayed
    And I should see "Enter a real date of birth" error summary
    #  User selects 'Continue' after entering date of birth that is after the date the tenant moved (moved in date is 11/11/2015)
    When I fill in the fields below with for tenant's details:
      | Full name              | HOF TEST   |
      | Date of birth          | 12/11/2015 |
      | Country of nationality | Spain      |
      | HO reference number    | 1234567    |
    And I select to continue
    Then I should see "There is a problem" error message displayed
    And I should see "Tenant cannot be born after they moved into the rental property. Enter a date before 11 November 2015." error summary




  Scenario: LSC - Tenant's current address page field validation check [TLF-]
    Given I visit the Landlords checking service page
    And I navigate to "Tenant's current address" page
    # User selects 'Continue' after leaving the Address line 1, Address Line 2 and Postcode fields blank
    When I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Enter address line 1, typically the building and street¬Enter a town or city¬Enter a postcode" error summary
    # Postcode in an invalid UK format
    When I fill in the fields below with tenant's current address details:
      | Address Line 1 | 123     |
      | Address Line 2 | Dome    |
      | Town or City   | Hull    |
      | Country        | England |
      | Postcode       | 2M2 l11 |
    And I select to continue
    Then I should see "There is a problem" error message displayed
    And I should see "Enter a real UK postcode" error summary
    #  Postcode that contains special characters (not including whitespace)
    When I fill in the fields below with tenant's current address details:
      | Address Line 1 | 123     |
      | Address Line 2 | Dome    |
      | Town or City   | Hull    |
      | Country        | England |
      | Postcode       | M1 %1K  |
    And I select to continue
    Then I should see "There is a problem" error message displayed
    And I should see "Enter a real UK postcode" error summary


  @LCS-Validation @TLF-111
  Scenario: LSC - Before 1988 page radio validation check [TLF-111]
    Given I visit the Landlords checking service page
    And I navigate to "Has the current tenant been in the UK since before 1988?" page
    When I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Tell us whether the Tenant came to the UK before 1988" error summary



  @LCS-Validation @TLF-111
  Scenario: LSC - Extra tenant's details page field validation check [TLF-111]
    Given I visit the Landlords checking service page
    And I navigate to "Extra tenant's details" page
    When I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Enter a date the Tenant came to the UK¬Enter a place of birth¬Enter a National Insurance number¬Enter a telephone number" error summary
    #    Date tenant moved in 1988, NI number is less than 9 and less than 8 for telephone no
    When I fill in the fields below with extra tenant's details:
      | Date tenant moved to the UK | 31/12/1988    |
      | Place of birth              | Spain         |
      | National Insurance number   | AA12345C      |
      | Email address               | test@test.com |
      | Telephone number            | 1234567       |
    And I select to continue
    Then I should see "There is a problem" error message displayed
    And I should see "Date must be before 1988¬Enter a National Insurance number in the correct format¬Enter a real telephone number, like 01632 960 001, 07700 900 982 or +44 808 157 0192" error summary
    #    Date tenant moved later than 1988, NI number is more than 9 and more than 16 for telephone no
    When I fill in the fields below with extra tenant's details:
      | Date tenant moved to the UK | 01/01/1989        |
      | Place of birth              | Spain             |
      | National Insurance number   | AA1234567C        |
      | Email address               | test@test.com     |
      | Telephone number            | 12345678901234567 |
    And I select to continue
    Then I should see "There is a problem" error message displayed
    And I should see "Date must be before 1988¬Enter a National Insurance number in the correct format¬Enter a real telephone number, like 01632 960 001, 07700 900 982 or +44 808 157 0192" error summary
    #    Date tenant moved date is before their date of birth(01/01/1960 ), NI number A, B, C or D as the 9th character and telephone no is more than 16 char
    When I fill in the fields below with extra tenant's details:
      | Date tenant moved to the UK | 31/12/1959        |
      | Place of birth              | Spain             |
      | National Insurance number   | AA123456E         |
      | Email address               | test@test.com     |
      | Telephone number            | 12345678901234567 |
    And I select to continue
    Then I should see "There is a problem" error message displayed
    And I should see "Date must be after the Tenant's date of birth. Enter a date after 01 January 1960¬Enter a National Insurance number in the correct format¬Enter a real telephone number, like 01632 960 001, 07700 900 982 or +44 808 157 0192" error summary
    #    Date tenant moved date is 120 years and Telephone number contains disallowed special characters or is in an invalid format
    When I fill in the fields below with extra tenant's details:
      | Date tenant moved to the UK | more than 120 years ago |
      | Place of birth              | Spain                   |
      | National Insurance number   | SE123456A               |
      | Email address               | test@test.com           |
      | Telephone number            | *448081570192           |
    And I select to continue
    Then I should see "There is a problem" error message displayed
    And I should see "Enter a real date the Tenant came to the UK¬Enter a real telephone number, like 01632 960 001, 07700 900 982 or +44 808 157 0192" error summary



  Scenario: LSC - Landlord's or agent's details page field validation check
    Given I visit the Landlords checking service page
    And I navigate to "Landlord's or agent's details" page
    #   User selects 'Continue' after leaving the Name and Email fields blank
    When I select continue
    Then I should see "There is a problem" error message displayed
    And I should see "Enter a full name¬Enter an email address¬Enter a postcode" error summary
    #   User entering Email address too long/short
    When I fill in the fields below with landlord's or agent's with postcode details:
      | Landlord full name | HOF TEST    |
      | Postcode           | M2 6MM      |
      | Company name       | Dome Ltd    |
      | Email              | t@t.c       |
      | Telephone number   | 01619012345 |
    And I select to continue
    Then I should see "There is a problem" error message displayed
    And I should see "Email address must be between 6 and 254 characters" error summary
    #   User entering Email address in invalid format does not have @ symbol
    When I fill in the fields below with landlord's or agent's with postcode details:
      | Landlord full name | HOF TEST    |
      | Postcode           | M2 6MM      |
      | Company name       | Dome Ltd    |
      | Email              | testest.com |
      | Telephone number   | 01619012345 |
    And I select to continue
    Then I should see "There is a problem" error message displayed
    And I should see "Enter a real email address" error summary
    # Email address in invalid format has nothing before the @ symbol
    When I fill in the fields below with landlord's or agent's with postcode details:
      | Landlord full name | HOF TEST     |
      | Postcode           | M2 6MM       |
      | Company name       | Dome Ltd     |
      | Email              | @testest.com |
      | Telephone number   | 01619012345  |
    And I select to continue
    Then I should see "There is a problem" error message displayed
    And I should see "Enter a real email address" error summary
    # Email address in invalid format has nothing after the @ symbol
    When I fill in the fields below with landlord's or agent's with postcode details:
      | Landlord full name | HOF TEST     |
      | Postcode           | M2 6MM       |
      | Company name       | Dome Ltd     |
      | Email              | testest.com@ |
      | Telephone number   | 01619012345  |
    And I select to continue
    Then I should see "There is a problem" error message displayed
    And I should see "Enter a real email address" error summary
    #  Telephone number is outside permitted character range (8-16)
    When I fill in the fields below with landlord's or agent's with postcode details:
      | Landlord full name | HOF TEST          |
      | Postcode           | M2 6MM            |
      | Company name       | Dome Ltd          |
      | Email              | tes@test.com      |
      | Telephone number   | 12345678901234567 |
    And I select to continue
    Then I should see "There is a problem" error message displayed
    And I should see "Enter a real telephone number, like 01632 960 001, 07700 900 982 or +44 808 157 0192" error summary
    # Telephone number contains disallowed special characters or is in an invalid format
    When I fill in the fields below with landlord's or agent's with postcode details:
      | Landlord full name | HOF TEST      |
      | Postcode           | M2 6MM        |
      | Company name       | Dome Ltd      |
      | Email              | tes@test.com  |
      | Telephone number   | *448081570192 |
    And I select to continue
    Then I should see "There is a problem" error message displayed
    And I should see "Enter a real telephone number, like 01632 960 001, 07700 900 982 or +44 808 157 0192" error summary
    #   Postcode in an invalid UK format
    When I fill in the fields below with landlord's or agent's with postcode details:
      | Landlord full name | HOF TEST      |
      | Postcode           | 2M2 l11       |
      | Company name       | Dome Ltd      |
      | Email              | tes@test.com  |
      | Telephone number   | +448081570192 |
    And I select to continue
    Then I should see "There is a problem" error message displayed
    And I should see "Enter a real UK postcode" error summary
    #  Postcode that contains special characters (not including whitespace)
    When I fill in the fields below with landlord's or agent's with postcode details:
      | Landlord full name | HOF TEST      |
      | Postcode           | M11 %11       |
      | Company name       | Dome Ltd      |
      | Email              | tes@test.com  |
      | Telephone number   | +448081570192 |
    And I select to continue
    Then I should see "There is a problem" error message displayed
    And I should see "Enter a real UK postcode" error summary



  Scenario: LSC - Privacy policy page checkbox not selected validation check [TLF-116]
    Given I visit the Landlords checking service page
    When I navigate to "Privacy policy" page
    And I select to submit request
    Then I should see "There is a problem" error message displayed
    And I should see "Confirm you have read the Data Protection statement" error summary