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

  changeBackground(){
    this.setState({
      class: 'background white',
    })
  }

  render() {
    return <div className={this.state.class}>
              <h1>
                < Input onClick={() => this.changeBackground()} />
              </h1>
           </div>
  }
}

class Input extends React.Component {
  render(){
    return <button onClick={this.props.onClick}>Click me</button>
  }
}

// ========================================

ReactDOM.render(
  <Background />,
  document.getElementById('root')
);
