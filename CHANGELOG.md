# Solid React Application Generator

## 0.4.0 (March 20, 2019)

#### Solid React Application Base

##### Added
- Incorporated LDFlex data writing examples
- Profile Page
  - View Profile
  - Edit Profile
- Site Footer
  
##### Updated
- Made some adjustments to prepare for [React Hooks](https://reactjs.org/docs/hooks-intro.html) support
- Created environment file to store branding-specific variables. This should make it easier to change the branding on generated applications

##### Fixed
 - Toast messages now close when the site's language changes, to prevent confusion
 - Added some form validation to the profile form

## 0.3.0 (March 6, 2019)

#### Solid React Application Base

##### Added
- Internationalization support using [react-i18next](https://react.i18next.com/). This includes resource files for English and Spanish languages
- Language selection dropdown added to top navigation bar
- Ability to edit and upload a new profile image

##### Updated
- Solid Style Guide has been updated to the most recent version
- Solid React Components library has been updated to the most recent version
- Several changes to existing Solid React Components, such as new added parameters

## 0.2.1 (February 20, 2019)

#### Generator

##### Removed

- Deleted the default .yo-rc file, as it was not required by the generator

#### Solid React Application Base

##### Added

- Loading animation

##### Updated

- Dropdown menu for logout and profile
- Updated style guide to the latest version
- Solid React Components updated to v0.2.3

##### Fixed

- Minor style tweaks
- Welcome page image no longer becomes an oval on tall images
- Fixed notification display so it properly uses the title and content fields
- Error message is cleared when switching between provider login and webID login
- Login error text has been updated to add clarity

## 0.1.1 (February 5, 2019)

#### Solid React Application Base

##### Changed

- Updated Welcome Page text to be more clear and concise

## 0.1.0 (January 30, 2019)

### First Release

#### Generator

##### Added

- Generator created using [yeoman-generator](https://github.com/yeoman/generator-generator)
- First version of yeoman application configuration
- Added voca as a dependency to handle casing properly for app name

#### Solid React Application Base

##### Added

- Built scaffolded app with create-react-app, ejected to allow change in webpack configurations
- [LDFlex for Solid](https://github.com/solid/query-ldflex) added as the primary interface for most Linked Data operations
- Dependencies from [Solid React SDK](https://github.com/inrupt-inc/solid-react-sdk):
  - [Atomic Style Guide for Solid](https://github.com/Inrupt-inc/inrupt-atomic-styleguide) to provide global styling
  - [Solid React Components Library](https://github.com/Inrupt-inc/solid-react-components) to provide reusable core functionality
- [Styled Components](https://www.styled-components.com/) added as dependency to handle layout and custom styling
- Basic and Authenticated Nav Bar
- Login page
- Register page
- Not Found Page (404)
- Error handling
- Error page
- Test Infrastructure
- Unit testing for all components
