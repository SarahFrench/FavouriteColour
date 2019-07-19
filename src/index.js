import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Background extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      class: 'background black',
    }
  }

  changeBackground(colour){
    this.setState({
      class: 'background ' + colour,
    })
  }

  render() {
    return <div className={this.state.class}>
              <h1>
                < Input onClick={(colour) => this.changeBackground(colour)} />
              </h1>
           </div>
  }
}

class Input extends React.Component {
  getNewClass(){
    let input = document.getElementById('input').value;
    input = input.toLowerCase().trim()
    let acceptedColours = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'black', 'grey', 'gray', 'white']
    if (acceptedColours.includes(input)){
      return input
    } else {
      return 'ERROR'
    }
  }

  render(){
    return <div><input id="input"></input><button onClick={() => this.props.onClick(this.getNewClass())}>submit</button></div>
  }
}

// ========================================

ReactDOM.render(
  <Background />,
  document.getElementById('root')
);
