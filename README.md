# generator-solid-react
Solid generator for React applications.

#### Externals Libraries

* [React Toast Notifications](https://jossmac.github.io/react-toast-notifications/)
* [Styled Components](https://www.styled-components.com)

#### Error Handling

We are using some components to handling errors. We define 2 kind of possible errors.

1. ***Services Errors***: This errors usually comes from external resource like API in our case from Solid server. We are using try/catch to return a message to the user.

2. ***UI Errors***: This usually come from data errors when component wait to some formatted data but comes with different format this will fire an error and show it on screen, we are using Error Boundaries from React to show a custom message instead of the component tree that crashed.


 #####Services Errors

 We are a custom wrapper component of React Toast Notifications library to handling this errors.

***How use it***

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

 Or use HOC to have props available in your component

 ```javascript
  withToastManager(YourComponent);
 ```

 The idea is to catch all the errors from external services and show to user what happened.
