# Solid React Application Generator

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
