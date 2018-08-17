import React, { Component } from 'react';
import './Router.css';

import { Route, BrowserRouter } from 'react-router-dom'

import ReactGA from 'react-ga';

import Forms from '../components';
import MainView from '../components/MainView';
import Home from '../components/Home';
import Progress from '../components/Progress';
import withTracker from './withTracker';
import Test from '../components/Test';
import TestHome from '../components/TestHome';

const DEFAULT_CONFIG = {
  trackingId: 'UA-123028321-1',
  debug: false,
  gaOptions: {
    cookieDomain: 'none'
  }
};

class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      configs: [DEFAULT_CONFIG]
    }
    this._onPlay = this._onPlay.bind(this);
    this._onPause = this._onPause.bind(this);
  }

  componentWillMount() {
    ReactGA.initialize(this.state.configs);
    ReactGA.pageview(window.location.pathname);
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={withTracker(Forms)} />
            <Route exact path="/home/:userid" component={withTracker(Home)} />
            <Route exact path="/progress/:userid" component={withTracker(Progress)} />
            <Route path="/video/:videoId/:start/:end/:number/:index/:userid" component={withTracker(MainView)} />
            <Route path="/testhome/:userid" component={withTracker(TestHome)} />
            <Route path="/test/:videoId/:start/:end/:number/:index/:userid/:type" component={withTracker(Test)} />
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
    // console.log(this.state.currentTime);
    this.setState({
      currentTime: time
    })
    // console.log(this.state.currentTime);
  }
}

export default Router;
