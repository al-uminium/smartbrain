import React, { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/Logo';
import Rank from './components/rank/rank';
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/facerecognition/FaceRecognition';

const app = new Clarifai.App({apiKey: '672842eeb92541b38b897b2b80ad1bba'});

const particleOptions = {
  "particles": {
      "number": {
          "value": 150
      },
      "size": {
          "value": 1
      }
  },
  "interactivity": {
      "events": {
          "onhover": {
              "enable": true,
              "mode": "repulse"
          }
      }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
    }
  }

  getBoundBox = (data) => {
    const boundBox = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    
    const box = {
      bR: height - (boundBox.bottom_row*height),
      tR: boundBox.top_row*height,
      lC: boundBox.left_col*width,
      rC: width - (boundBox.right_col*width),
    }

    this.setState({
      box: box,
    })
  }

  onInputChange = (event) => {
    this.setState({
      input: event.target.value
    })
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict('f76196b43bbd45c99b4f3cd8e8b40a8a', this.state.input)
    .then(response => {
      this.getBoundBox(response);
      console.log()
      })
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet" /> 
        <script src="https://cdn.rawgit.com/progers/pathseg/master/pathseg.js"></script>
        <Particles className="particles" params={particleOptions} />
        <Navigation />
        <Logo />
        {/* {<Rank /> } */}
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} />
        <footer>
          <div className="v-btm">Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </footer>
      </div>
    );
  }
}

export default App;