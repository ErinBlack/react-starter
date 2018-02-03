import React from 'react';
import ReactDOM from 'react-dom';

const App = function(){
  return <div><h1>React Intro</h1></div>;
}

ReactDOM.render(<App />, document.getElementById('root'));


class App2 extends React.Component {
  render(){
    return <div>
      <h1>React Intro</h1>
      <input onChange={this.onInputChange}/>
    </div>;
  }

  onInputChange(event){
    console.log(event.target.value);
    this.setState({userInput: event.target.value});
  }

  constructor(props) {
      super(props);
      this.state = {userInput: ''};

      this.onInputChange = this.onInputChange.bind(this);
  }
}


ReactDOM.render(<App2 />,
document.getElementById('root'));
