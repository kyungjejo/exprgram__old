import React, { Component } from 'react';
import './App.css';

import { BrowserRouter, Route } from 'react-router-dom'

import Title from './components/Title/Title';
import MainView from './components/MainView';
import Home from './components/Home';

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
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Home} />
            <Route path="/video/:videoId/:start/:end" component={MainView} />
          </div>
        </BrowserRouter>
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
