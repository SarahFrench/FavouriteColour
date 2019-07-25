import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Background extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      class: 'd-flex flex-row align-items-center justify-content-center background white',
    }
  }

  changeBackground(colour){
    this.setState({
      class: 'd-flex flex-row align-items-center justify-content-center background ' + colour,
    })
  }

  render() {
    return <div className={this.state.class}>
                < Input onClick={(colour) => this.changeBackground(colour)} />
           </div>
  }
}

class Input extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      colour: true,
      gif: false,
      message: "C'mon, don't be shy",
      messageChoices: ["That's a great choice!", "Really, <colour>? I expected better from you", "Yeah, <colour> is ok I guess", "That's my favourite too!", "Well, I liked <colour> before it was cool."]
    }
  }

  swapStateColourAndGif(mode){
    switch (mode) {
      case 'gif':
        this.setState({
          colour: false,
          gif: true,
        });
        break;
      case 'colour':
        this.setState({
          colour: true,
          gif: false,
        });
      default:
        this.setState({
          colour: true,
          gif: false,
        })
    }
  }

  updateMessage(input){
    if (this.inputIsColour(input)){
      let messageIndex = Math.floor(Math.random() * this.state.messageChoices.length)
      let message = this.state.messageChoices[messageIndex]
      let colourRegex = RegExp('<colour>', 'g')
      if (colourRegex.test(message)){
        message = message.replace(colourRegex, input)
      }
      this.state.message = message;
    } else {
      this.state.message = `Yeah. That isn't a colour. Here's a GIF for your trouble though.`
    }
  }

  inputIsColour(input){
    let acceptedColours = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'black', 'grey', 'gray', 'white']
    return acceptedColours.includes(input);
  }

  processInput(){
    let input = document.getElementById('input').value;
    input = input.toLowerCase().trim();
    return input;
  }

  useInput(){
    let input = this.processInput()
    let newClass = ''
    if (this.inputIsColour(input)){
      this.swapStateColourAndGif('colour');
      this.removeGif();
      newClass = input;
    } else if (input === '' ) {
      this.swapStateColourAndGif('gif');
      this.noInput();
      this.getSpecificGiphy();
      newClass = "white";
    } else {
      this.swapStateColourAndGif('gif');
      this.getGiphy(input);
      newClass = "white";
    }
    this.updateMessage(input);
    return newClass;
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

  removeGif(){
    if (!!document.getElementById('gif')){
      document.getElementById('gif').remove();
    }
  }

  noInputAlert(){
    window.alert("You didn't type anything in the text box!");
  }

  getGiphy(input){
    var GIPHY_API_KEY ='lDP1N91b3crbFDWjwtQqOHmUCN30SAnq';
    let url = `https://api.giphy.com/v1/gifs/search?q=${input}&api_key=${GIPHY_API_KEY}`
    let response = this.fetchAndDecode(url, 'text')

    response
      .then( response => {
        let json = JSON.parse(response);
        let imageSelection = Math.floor(Math.random() * json.data.length)
        let url = json.data[imageSelection].images.downsized.url
        let element = document.createElement('img');
        element.src= url;
        element.id = 'gif'
        element.className = 'gif mt-2'

        // remove pre-existing gif if any. Code here so transition fast
        this.removeGif();
        document.getElementById('input-box').appendChild(element);

      })
  }

  getSpecificGiphy(){
    var GIPHY_API_KEY ='lDP1N91b3crbFDWjwtQqOHmUCN30SAnq';
    const GIF_ID = 'iB4PoTVka0Xnul7UaC';
    let url = `https://api.giphy.com/v1/gifs/${GIF_ID}?api_key=${GIPHY_API_KEY}`
    let response = this.fetchAndDecode(url, 'text')

    response
      .then( response => {
        let json = JSON.parse(response);
        let url = json.data.images.original.url;
        let element = document.createElement('img');
        element.src= url;
        element.id = 'gif'
        element.className = 'gif mt-2'

        // remove pre-existing gif if any. Code here so transition fast
        this.removeGif();
        document.getElementById('input-box').appendChild(element);

      })
  }

  render(){
    return <div id="input-box" className="box w-50">
        <h5 className="mb-4">
          Tell me your favourite colour:
        </h5>
        <div>
          <input id="input"></input>
          <button className="button" onClick={() => this.props.onClick(this.useInput())}>Tell me!</button>
        </div>
        <div className="mt-2">
          {this.state.message}
        </div>
      </div>
  }
}

// ========================================

ReactDOM.render(
  <Background />,
  document.getElementById('root')
);
