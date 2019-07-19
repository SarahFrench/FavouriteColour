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
      this.getGiphy()
      return ""
    }
  }

  fetchAndDecode(url, type) {
    return fetch(url).then(response => {
      if (type === 'blob') {
        return response.blob();
      } else if (type === 'text') {
        return response.text();
      }
    })
    .catch(e => {
      console.log('There has been a problem with your fetch operation: ' + e.message);
    });
  }

  getGiphy(){

    var GIPHY_API_KEY ='lDP1N91b3crbFDWjwtQqOHmUCN30SAnq';
    let url = `//api.giphy.com/v1/gifs/search?q=weird&api_key=${GIPHY_API_KEY}`
    let response = this.fetchAndDecode(url, 'text')
    response.then( x => {
      let json = JSON.parse(x);
      let element = document.createElement('img')
      element.src= `${json.data[0].bitly_gif_url}`
      console.log(element);
      document.getElementById('container').appendChild(element);
    })
  }

  render(){
    return <div id="container"><input id="input"></input><button onClick={() => this.props.onClick(this.getNewClass())}>submit</button></div>
  }
}

// ========================================

ReactDOM.render(
  <Background />,
  document.getElementById('root')
);
