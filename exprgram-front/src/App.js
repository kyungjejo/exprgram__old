import React, { Component } from 'react';
import './App.css';

import { BrowserRouter, Route } from 'react-router-dom'

import Forms from './components';
import MainView from './components/MainView';
import Home from './components/Home';
import Progress from './components/Progress';
import Instruction from './components/Instruction';

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
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Forms} />
            <Route exact path="/home/:userid" component={Home} />
            <Route exact path="/progress/:userid" component={Progress} />
            <Route exact path="/instruction/:userid" component={Instruction} />
            <Route path="/video/:videoId/:start/:end/:number/:index/:userid" component={MainView} />
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
