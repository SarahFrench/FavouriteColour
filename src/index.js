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

  render() {
    return <div className={this.state.class}>
              <h1>
                Hello Sarah!
              </h1>
           </div>
  }
}

class Input extends React.Component {
  render(){
    return <button>Click me</button>
  }
}

// ========================================

ReactDOM.render(
  <Background />,
  document.getElementById('root')
);
