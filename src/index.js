import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Background extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      class: 'd-flex flex-row align-items-center justify-content-center background white',
      colours: require('./colours.js'),
      backgroundColour: '#FFFFFF',
      textBorderColour: '#000000'
    }
  }

  changeBackground(colour, textBorderColour){
    this.setState({
      class: 'd-flex flex-row align-items-center justify-content-center background',
      backgroundColour: colour,
      textBorderColour: textBorderColour
    })
  }

  render() {
    return <div className={this.state.class} style={{backgroundColor:this.state.backgroundColour,colour:this.state.textBorderColour}}>
                < Input onClick={(colour) => this.changeBackground(colour)} colours={this.state.colours} />
           </div>
  }
}

class Input extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      colour: true,
      colourValue: '',
      gif: false,
      message: "C'mon, don't be shy",
    }
  }

  getColour(input){
    let colours = this.props.colours.colours;
    let options = colours.filter(object => RegExp('\\b' + input + '\\b', 'i').test(object.name))
    let choice = Math.floor(Math.random()* options.length);
    this.setState({colourValue: options[choice].hex})
    return options[choice];
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
        break;
      default:
        this.setState({
          colour: true,
          gif: false,
        })
    }
  }

  updateMessage(input, colour){
    if (input.length > 0 && colour){
      console.log(colour);
      this.state.message = `This colour is called ${colour.name}`;
    } else if (input.length > 0) {
      this.state.message = `Yeah. I couldn't find a colour for that input. Here's a GIF for your trouble though.`
    } else {
      this.state.message = 'Watch the gif'
    }
  }

  processInput(){
    let input = document.getElementById('input').value;
    input = input.toLowerCase().trim();
    return input;
  }

  useInput(){
    let input = this.processInput()
    let newClass = ''
    let colour = this.getColour(input);
    if (colour && input.length > 0){
      this.swapStateColourAndGif('colour');
      this.removeGif();
      this.updateMessage(input, colour);
      newClass = colour.hex;
    } else if (input === '' ) {
      this.swapStateColourAndGif('gif');
      this.noInputAlert();
      this.getSpecificGiphy();
      this.updateMessage(input, colour);
      newClass = "white";
    } else {
      this.swapStateColourAndGif('gif');
      this.getGiphy(input);
      newClass = "white";
    }
    return newClass;
  }

  textAndBorderColour(hexcode){
    console.log(hexcode.toLowerCase() > '#464646');
    if(RegExp('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$','i').test(hexcode)){
      if (hexcode.toLowerCase() > '#464646' ){
        return '#000000C0';
      } else {
        return '#FFFFFFC0';
      }
    } else {
      return '#000000C0'
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
    return <div id="input-box" className="box w-50 box-dark">
        <h5 className="mb-4">
          Tell me your favourite colour:
        </h5>
        <div>
          <input id="input"></input>
          <button className="button" onClick={() => this.props.onClick(this.useInput(), this.textAndBorderColour(this.colourValue))}>Tell me!</button>
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
