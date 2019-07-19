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
  render(){
    return <div><input id="input"></input><button onClick={() => this.props.onClick('red')}>submit</button></div>
  }
}

// ========================================

ReactDOM.render(
  <Background />,
  document.getElementById('root')
);
