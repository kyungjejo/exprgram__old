import React, { Component } from 'react';

import { Container, Grid } from 'semantic-ui-react'

import Video from './VideoContainer/Video';
import Subtitle from './SubtitlteContainer/Subtitle';

class MainView extends Component {
    render() {
        return (
        <div className="container center" id="main">
            <Grid columns={2} divided>
              <Grid.Row>
                <Grid.Column>
                  <Video
                    vid={this.props.match.params.videoId}
                    _onPlay={this._onPlay}
                    _onPause={this._onPause}/>
                </Grid.Column>
                <Grid.Column>
                  <Subtitle />
                </Grid.Column>
              </Grid.Row>
            </Grid> 
          </div>
        )
    }
}

export default MainView;