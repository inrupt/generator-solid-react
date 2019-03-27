# Solid React Application Generator
Based on Facebook's <a href="https://github.com/facebookincubator/create-react-app" target="_blank">Create React App</a>.

Application Generator for [Solid](https://solid.inrupt.com) React applications. Part of the [React SDK for Solid](https://github.com/inrupt-inc/solid-react-sdk).

## External Dependencies

* [Solid React Components](https://github.com/Inrupt-inc/solid-react-components)
* [Solid Atomic Style Guide](https://design.inrupt.com)
* [LDFlex](https://github.com/solid/query-ldflex)
* [React Toast Notifications](https://jossmac.github.io/react-toast-notifications/)
* [Styled Components](https://www.styled-components.com)

## Prerequisites

### Administrator Privilege
You will need administrative privilege on your local computer to install the generator and prerequisites. Depending upon your operating system:

* Mac:
  1. Prefix the command lines to be executed with sudo.
  2. You will be prompted for the Administrator password. Refer to: https://support.apple.com/en-us/HT202035.
* Windows:
  1. Type cmd in the search bar.
  2. Right click on "Command prompt" and select "Run as Administrator".

### npm and Yeoman
To install the generator, you will need both [npm](https://www.npmjs.com) and [Yeoman](https://yeoman.io) if you don't already have them.

* [npm](https://www.npmjs.com) makes it easy for JavaScript developers to share and reuse code, and makes it easy to update the code that you’re sharing. To install, follow the instructions at [npm](https://www.npmjs.com/get-npm).
* [Yeoman](https://yeoman.io) provides a generator ecosystem to scaffold complete projects. You can install Yeoman using the running the command: ```npm install -g yo```

## Installation

To install the generator:

```
npm install -g @inrupt/generator-solid-react
```

## Usage
Once the generator is installed, you can create a new application with just a few steps.

1. In a console window, navigate to the desired parent folder of the new application
2. Use the command ``` yo @inrupt/solid-react ```
3. You will be prompted to set:
 1. An application name. This will also be the name of the new folder in which the new application lives
 2. A version number
 3. Whether the application is private or public
4. Navigate into the new folder
5. If you would like to start the application, simply run ``` npm run start ``` in the new folder, otherwise you can begin editing and writing your application!

Note: We have noticed an error is sometimes thrown when the generator tries to install one of the dependencies of application. If this occurs, try installing [Git](https://git-scm.com/downloads) and then recreating your application.

## What is a Generator?

A [Yeoman generator](https://yeoman.io/) is a scaffolding tool at its core. You can use Yeoman to install applications based on templates. This repo is an example of a template - an application with a build, code structure, and dependencies added and organized for you!

Using a generator accelerates application development. You don't have to worry about best practices for foundational elements, because we've incorporated them. Our template generates a fully functional application foundation that becomes the base of your new project.

We have included integrations with essential libraries, as well as pages, routes, and components that are both useful in most Solid applications (like login pages) but also serve as example code to demonstrate how to interface with Solid and [Linked Data](https://solid.inrupt.com/docs/intro-to-linked-data).

The generated application also incorporates our [Atomic Style Guide for Solid](https://design.inrupt.com/atomic-core) (source available [here](https://github.com/inrupt-inc/solid-style-guide)), featuring a nice integration with [Styled Components](https://www.styled-components.com).

## The Solid React Application

Once you've [run the generator](#installation-and-usage) and created your starter application, you'll have a site with some basic functionality and style guide integration. As the SDK is continually evolving, take a look at the [React SDK for Solid](https://github.com/inrupt-inc/solid-react-sdk) [Release Timeline](https://github.com/Inrupt-inc/solid-react-sdk/tree/master#release-timeline) for what has been implemented and what is currently planned.

If you would like to add your own look and feel, there are two options. First, you can override the styles from the style guide on demand. A list of the classes and example code can be found on the github page. Second, you could remove the style guide entirely, by removing the dependency from npm / package.json. Note if you do this, the application will lose almost all of its styling, and will need work to look "right" again.

Next, you can start building your application! Feel free to remove any pages or code you no longer need. You can use pages (such as the Welcome Page) provided by the generator as a template for how to build your next pages.

There are also examples of how to use libraries like [LDFlex](https://github.com/solid/query-ldflex) for reading and writing data to a POD, and examples of using existing components.


## Error Handling

We provide different types of error handling in the generated application, which ultimately fall into the following two groups:

1. ***Service Errors***: These errors usually come from an external resource, like a server, library, or other dependency. In our case, this also includes errors from the Solid Server. We use try/catch blocks to display a message to the user.

2. ***UI Errors***: Data errors when a component waits for formatted data typically lead to these. If the data format is wrong, or there are missing properties that are required, this kind of error could trigger. We're using [React Error Boundaries](https://reactjs.org/docs/error-boundaries.html) to show custom messages to the user, rather than the default, which is to show the component tree.


 ### Service Errors

 We provide a custom wrapper component around the React Toast Notifications library to handle Service Errors.

***Usage***

First, you will need to import ToastConsumer to have Toaster methods available:

```javascript
import { ToastConsumer } from 'react-toast-notifications';
```
Second, call the add method to show a toaster notification

```javascript
<ToastConsumer>

   {({ add }) => (
      <button onClick={(e) => add(['Title', 'Message'], { appearance: 'error | success | warning' })}>
        Toasty
      </button>
    )}

</ToastConsumer>
 ```

 You can also use [Higher-Order Components](https://reactjs.org/docs/higher-order-components.html) to have props available in your component:

 ```javascript
  withToastManager(YourComponent);
 ```

 The idea is to catch all of the errors from external services and show the user as much detail as we can about the source of the error.

### UI Errors

We are using [React Error Boundaries](https://reactjs.org/docs/error-boundaries.html), and we have a top level component called ```ErrorBoundaries``` located in the ```components``` folder to catch all possible errors in our components.

Also included in the same folder is a custom markup component for these global errors, appropriately called ```GlobalErrors```. It contains the actual HTML markup and default text for this component.

In the event you want more specific errors in a given component, you can call ErrorBoundaries and create your own custom markup:

```javascript
<ErrorBoundary
  component={(error, info) => <GlobalError error={error} info={info} />} >
  <App />
</ErrorBoundary>
  ```
  
## Internationalization
Internationalization (commonly known as i18n) is a core part of many web applications. We have integrated the sample application with the common i18n tool, called [react-i18next](https://react.i18next.com/), which is a React plugin for the popular [i18next plugin](https://www.i18next.com/).

### Resource Files
Our language and translation files are added as JSON files stored in the application. You can find the files in the installed application, under the public/locales folder.

Here you will find a folder per supported language, with a translation.json file inside. The JSON structure inside of the file is broken down by feature area, such as Welcome for the Welcome page.

### Setting a Language
The react-i18next plugin is automatically checking for a language code in the localStorage item `i18nextLng`. When the user takes an action that should change the language, simple store the language code (e.g. `en-us`) in this localStorage setting.

An example of both setting and getting a language can be seen in our component `LanguageDropdown` under /src/components/Utils.

### Adding a new language
To add a new language:
 
  1. First add a new folder and translation file to the /public/locales folder, with translations in place.

  2. Next, inside language-dropdown.component.js, add the new language to `const languages`. This object contains the languages, with an id and an icon. In this case, the icon maps to a flag, which is mapped using [flag-icon-css](http://flag-icon-css.lip.is/). This will add the language and flag to the dropdown.

Once those two steps are complete then the new language should be compatible with the generated application.

## Deployment

Once your application is ready, you can deploy it to a server of your choice.

It is ***highly recommended*** that you ensure your server is utilizing TLS. If not, you may encounter security-related errors in the browser, particular in Google Chrome.

## Ignore

Testing CI Build 0.3.0.001

