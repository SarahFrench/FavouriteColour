import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Background extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      class: 'd-flex flex-row align-items-center justify-content-center background',
      colours: require('./colours.js'),
      backgroundColour: '#FFFFFF',
      textColour: '#555555',
      borderColour: '#555555',
    }
  }

  changeColourScheme(object){
    this.setState({
      backgroundColour: object.background,
      textColour: object.text,
      borderColour: object.border,
    });
  }

  render() {
    return <div className={this.state.class} style={{backgroundColor:this.state.backgroundColour,colour:this.state.textColour}}>
                < Input onClick={(object) => this.changeColourScheme(object)} colours={this.state.colours} text={this.state.textColour} border={this.state.borderColour} />
           </div>
  }
}

class Input extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      colour: true,
      colourValue: '#FF0000',
      text: this.props.text,
      border: this.props.border,
      gif: false,
      message: "C'mon, don't be shy",
    }
  }

  getColour(input){
    if (input){
      let colours = this.props.colours.colours;
      let options = colours.filter(object => RegExp('\\b' + input + '\\b', 'i').test(object.name))
      if (options.length > 0){
        let choice = Math.floor(Math.random()* options.length);
        this.setState({colourValue: options[choice].hex})
        return options[choice];
      }
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
      this.setState({message : `This colour is called ${colour.name}`})
    } else if (input.length > 0) {
      this.setState({message : `Yeah. I couldn't find a colour for that input. Here's a GIF for your trouble though.`})
    } else {
      this.setState({message : 'Watch the gif'})
    }
  }

  processInput(){
    let input = document.getElementById('input').value;
    input = input.toLowerCase().trim();
    return input;
  }

  useInput(){
    let input = this.processInput()
    let colours = {background: '', text:'', border:''}
    let colour = this.getColour(input);
    if (colour && input.length > 0){
      this.swapStateColourAndGif('colour');
      this.removeGif();
      this.updateMessage(input, colour);
      colours = {background: colour.hex, text:this.invertHex(colour.hex), border:this.invertHex(colour.hex)};
    } else if (input === '' ) {
      this.swapStateColourAndGif('gif');
      this.noInputAlert();
      this.getSpecificGiphy();
      this.updateMessage(input, colour);
      colours = {background: '#FFFFFF', text:'#000000', border:'#000000'};
    } else {
      this.swapStateColourAndGif('gif');
      this.getGiphy(input);
      this.updateMessage(input, colour);
      colours = {background: '#FFFFFF', text:'#000000', border:'#000000'};
    }
    return colours;
  }

  // From this legend http://www.mattlag.com/scripting/hexcolorinverter.php
  invertHex(hexnum){
    hexnum = hexnum.slice(1,hexnum.length)
    if(hexnum.length !== 6) {
      alert("Hex color must be six hex numbers in length.");
      return false;
    }

    hexnum = hexnum.toUpperCase();
    var splitnum = hexnum.split("");
    var resultnum = "";
    var simplenum = "FEDCBA9876".split("");
    var complexnum = [];
    complexnum.A = "5";
    complexnum.B = "4";
    complexnum.C = "3";
    complexnum.D = "2";
    complexnum.E = "1";
    complexnum.F = "0";

    for(let i=0; i<6; i++){
      if(!isNaN(splitnum[i])) {
        resultnum += simplenum[splitnum[i]];
      } else if(complexnum[splitnum[i]]){
        resultnum += complexnum[splitnum[i]];
      } else {
        alert("Hex colors must only include hex numbers 0-9, and A-F");
        return false;
      }
    }

    return '#' + resultnum;
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
        if(JSON.parse(response).data.length > 0){
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
        } else {
          let element = document.createElement('p');
          element.innerText = 'Wait, no there isn\'t because you entered something too weird for Giphy. Well done.'
          element.className = 'gif mt-2'
          element.id = 'gif'
          this.removeGif();
          document.getElementById('input-box').appendChild(element);
        }
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
    return <div id="input-box" className="box w-50" style={{color:this.props.text,borderColor:this.props.border,borderStyle:'solid',borderWidth:'2px' }}>
        <h5 className="mb-4">
          Tell me your favourite colour:
        </h5>
        <div>
          <input id="input"></input>
          <button style={{color:this.props.text}} className="button" onClick={() => this.props.onClick(this.useInput())}>Tell me!</button>
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
