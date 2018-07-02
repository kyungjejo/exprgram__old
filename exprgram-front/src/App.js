import React, { Component } from 'react';
import './App.css';

import { Container, Grid } from 'semantic-ui-react'

import Video from './components/VideoContainer/Video';
import Title from './components/Title/Title';
import Subtitle from './components/SubtitlteContainer/Subtitle';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
    }
    this._onPlay = this._onPlay.bind(this);
    this._onPause = this._onPause.bind(this);
  }

  render() {
    return (
      <div>
        <Title />
        <div className="container center" id="main">
          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column>
                <Video 
                  _onPlay={this._onPlay}
                  _onPause={this._onPause}/>
              </Grid.Column>
              <Grid.Column>
                <Subtitle />
              </Grid.Column>
            </Grid.Row>
          </Grid> 
        </div>
      </div>
    );
  }
  
  _onPlay(time) {
    this.setState({
      currentTime: time
    })
  }

  _onPause(time) {
    console.log(this.state.currentTime);
    this.setState({
      currentTime: time
    })
    console.log(this.state.currentTime);
  }
}

export default App;
