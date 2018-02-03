# REACT INTRO

## Prerequisites

### Basic understanding of Webpack, Gulp or Grunt

React uses Webpack to copy, combine and convert our JavaScript files. We will be doing our work in the `src` folder. The code we see in the browser will be the code from the `public` folder. The code in the `public` folder is constantly being overriden and should not be modified directly. 

If you're not familiar with task runners, spend some time looking at Webpack, Gulp or Grunt before proceeding.

### Intro to JSX

JSX allows us to build our views directly inside of JavaScript. It's similar to how we constructed HTML using jQuery but JSX is much cleaner and easier to read. JSX is neither a string nor HTML. In Angular, we kept our HTML templates and controllers in separate files. In React, the best practice is to put them together into a single file. More on this in a little bit.

```JSX
const header = <h1>React Intro</h1>;
```

The equivalent JavaScript would look like this: 

```JavaScript
var header = React.createElement(
  "h1",
  null,
  "React Intro"
);
```

https://reactjs.org/docs/introducing-jsx.html

### Installing React

This starter repository already includes all of the packages you'll need for React. When we create a new project we'll be using `create-react-app my-app` (where `my-app` is the name of your app). We'll be installing `create-react-app` later in this tutorial. For now, run `npm install` in the starter project.

### Install Dev Tools
Install the React Dev Tools Chrome extension to make debugging easier. [https://fb.me/react-devtools](https://fb.me/react-devtools)

## Getting Started

We'll be using the following starter repo: [https://github.com/PrimeAcademy/react-intro-starter](https://github.com/PrimeAcademy/react-intro-starter)

```
npm install
npm start
```

React will watch for changes and update the DOM automatically!

### Import React

First, we need to import React. This allows us to use React in our JavaScript file. React is broken into two primary parts, React and ReactDOM. We'll need them both for our basic example to work. The following code will all be added to `src/index.js`.

```JavaScript
import React from 'react';
// Rendering components on the DOM requires react-dom
import ReactDOM from 'react-dom';
```

### Write our JSX

Now that we've imported React, we need to write some code that will appear on the DOM. Unlike Angular, our HTML is built in to our JavaScript using JSX.

```JSX
import React from 'react';
// Rendering components on the DOM requires react-dom
import ReactDOM from 'react-dom';

const App = function() {
    return <div><h1>React Intro</h1></div>;
}
```

> NOTE: Demonstrate what's going on using [http://babeljs.io/repl/](http://babeljs.io/repl/)

### Render on the DOM

Finally, let's get our HTML to appear on the DOM. To do this, we need to call a function called `render`. This function takes in two arguments, **what** we want to render (our App) and **where** we want it to go on our HTML page.

```JSX
import React from 'react';
// Rendering components on the DOM requires react-dom
import ReactDOM from 'react-dom';

const App = function() {
    return <div><h1>React Intro</h1></div>;
}

// <App /> creates an instance of our App component
// The second argument is where we should put the component
ReactDOM.render(<App />, document.getElementById('root'));

// In Angular, we defined the app using a directive. In React,
// we are initializing our app by passing in the target id.
```

### Angular Equivalent

In Angular, the above code would look something like this:

```HTML
<!DOCTYPE html>
<!-- Most basic Angular app -->
<html> <!-- Angular has full control over the page -->
  <head>
    <meta charset="utf-8">
    <title></title>
    <script type="text/javascript" src="vendors/angular.js"></script>
    <script type="text/javascript" src="scripts/client.js"></script>
  </head>
  <body>
    <div ng-app="app">
      <div><h1>Hello World</h1></div>
    </div>
  </body>
</html>
```


```JavaScript
var App = angular.module('app', []);
```

## Class Components

Our App is currently a function component. If we want to add user interactions, we'll want to upgrade it to a Class component.

> NOTE: We'll dive into components in more detail in a later lecture.

```JSX
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    // Similar to our toHTML function from classes with jQuery
    render() {
        return <div>
            <h1>React Intro</h1>
            <input onChange={this.onInputChange} />
        </div>;
    }

    onInputChange(event) {
        console.log(event.target.value);
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
```

### Local State

Angular does data binding for us. In React, we need to do more intentional when updating variables that appear on the DOM. This is one of the more confusing parts about React but does have advantages over Angular.

First, we need to add a constructor to our app.

```JSX
constructor(props) {
    // Required for React.Component to run correctly
    super(props);

    // Only assign state in the constructor, use setState in all other places
    this.state = {userInput: ''};
}
```

Next, we'll update the state using `this.setState()` in our `onInputChange(event)` function.

```JSX
onInputChange(event) {
    console.log(event.target.value);
    // DO NOT re assign state, always use setState
    this.setState({userInput: event.target.value});
}
```

Let's try it out. At this point, you should receive a console error when typing in the input field. This is happening because when React calls our `onInputChange` function, it is creating a new scope. Set a break point and observe that `this` is `undefined`. In Angular, we got around this by doing things like `const vm = this;` or `const self = this;` to keep a reference to `this` around. React provides us with a function called `bind` that we need to use for any functions that run as the result of an **event**. Calling methods from your constructor **will** still have a reference to `this`.


```JSX
// Similar to const self = this;
this.onInputChange = this.onInputChange.bind(this);
```

The final result should look like this:

```JSX
import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        // Required for React.Component to run correctly
        super(props);

        // Only assign state in the constructor, use setState in all other places
        this.state = {userInput: ''};

        // Similar to const self = this;
        this.onInputChange = this.onInputChange.bind(this);
    }

    // Similar to our toHTML function from classes with jQuery
    render() {
        return <div>
            <h1>React Intro</h1>
            <input onChange={this.onInputChange} />
            <br/>
            You typed: {this.state.userInput}
        </div>;
    }

    onInputChange(event) {
        console.log(event.target.value);
        // DO NOT re assign state, always use setState
        this.setState({userInput: event.target.value});
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
```  

## Resources 

### Getting Started

- https://reactjs.org/docs/try-react.html

### State

- https://medium.freecodecamp.org/where-do-i-belong-a-guide-to-saving-react-component-data-in-state-store-static-and-this-c49b335e2a00
- https://reactjs.org/docs/state-and-lifecycle.html