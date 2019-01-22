# generator-solid-react
Solid generator for React applications.

## External Dependencies

* [React Toast Notifications](https://jossmac.github.io/react-toast-notifications/)
* [Styled Components](https://www.styled-components.com)

## Installation and Usage

To install the application:

```
npm install -g @inrupt/generator-solid-react
```

Once it is installed, you can create a new application with just a few steps.

1. In a console window, navigate to the desired parent folder of the new application
2. Use the command ``` yo @inrupt/solid-react ```
3. You will be prompted to make an application name. This will be the new folder the app lives inside
4. Navigate into the new folder
5. If you would like to start the application, simply run ``` npm run start ``` in the new folder, otherwise you can begin editing and writing your application!

## What is a Generator?

A [Yeoman generator](https://yeoman.io/) is a scaffolding tool at its core. You can use Yeoman to install applications based on templates. This repo is an example of a template - it is an application with all of the folders and initial files created and set up for you. There's already a build, a code structure, and dependencies installed for you!

The idea behind a generator is accelerating application development, and we've taken the next step. In our template, we not only provide the basic files and folder structure, but also a fully functional application to become the base of your new project.

We have included integrations with existing libraries, as well as pages, routes, and components that are both useful in most applications (like login pages) but also serve as example code showing how Solid data management works.

The generated application is also integrated with our [Solid Style Guide](https://github.com/Inrupt-inc/inrupt-atomic-styleguide). You can read more about it on the github page, or check out a live version of the style guide at [design.inrupt.com](https://design.inrupt.com/atomic-core/). 

## Creating a Solid React Application 

The first step to get started is to follow the [Installation and Usage](#installation-and-usage) steps.

Once you've run the generator and created your starter application, you'll have a site with some basic functionality and style guide integration.

If you would like to add your own look and feel, there are two options. First, you can override the styles from the style guide on demand. A list of the classes and example code can be found on the github page. Second, you could remove the style guide entirely, by removing the dependency from npm / package.json. Note if you do this, the application will lose almost all of its styling, and will need work to look "right" again.

Next, you can start building your application! Feel free to remove any pages or code you no longer need. You can use pages (such as the Welcome Page) provided by the generator to use as a template for how to build your next pages.

There are also examples of how to use libraries like [LDFlex](https://github.com/solid/query-ldflex) for reading and writing data to a POD, and examples of using existing components. 

## What's in the starter application?
This list will update as new releases are made. Currently, the generated application contains the following high-level items:

* Login Page
* Styled Navbar, with Authenticated and Unauthenticated versions
* Welcome Page
  * Example of reading profile data with LDFlex
  * Documentation

## Error Handling

We have several different kinds of error handling we provide in the generated application. We define them as:
1. ***Services Errors***: This error usually comes from external resource like a server, a library, or another dependency. In our case, this also includes errors from the Solid Server. We are using try/catch blocks to display a message to the user.

2. ***UI Errors***: This usually comes from data errors when a component waits for formatted data. For example, if the data format is wrong, or there are missing properties that are required, this kind of error could trigger. We're using [React ErrorBoundaries](https://reactjs.org/docs/error-boundaries.html) to show custom messages to the user, instead of the default, which is to show the component tree.
 

 #### Service Errors

 We are a custom wrapper component around the React Toast Notifications library to handling these kinds of errors.

***Usage***

First you will need to import ToastConsumer to have available Toaster methods:

```javascript
import { ToastConsumer } from 'react-toast-notifications';
```
Second call add method to show toaster notification

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

 The idea is to catch all the errors from external services and show the user as much detail as we can about the source of the error.

#### React Errors Boundaries

We are using [React Error Boundaries](https://reactjs.org/docs/error-boundaries.html), and we have a top level component designed to catch all possible errors in our components. This component is called ErrorBoundaries and is located in the ```components``` folder.

Also included in the same folder is a custom markup component for these global errors. It's called GlobalErrors, and it contains the actual HTML markup and default text for this component.

In case that you want to have more specific errors in a specific component, you can call ErrorBoundaries and create your own custom markup:

```javascript
<ErrorBoundary
  component={(error, info) => <GlobalError error={error} info={info} />}
>
  <App />
</ErrorBoundary>
  ```
