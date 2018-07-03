import React, { Component } from 'react';
import YouTube from 'react-youtube';

/* <YouTube
  videoId={string}                  // defaults -> null
  id={string}                       // defaults -> null
  className={string}                // defaults -> null
  containerClassName={string}       // defaults -> ''
  opts={obj}                        // defaults -> {}
  onReady={func}                    // defaults -> noop
  onPlay={func}                     // defaults -> noop
  onPause={func}                    // defaults -> noop
  onEnd={func}                      // defaults -> noop
  onError={func}                    // defaults -> noop
  onStateChange={func}              // defaults -> noop
  onPlaybackRateChange={func}       // defaults -> noop
  onPlaybackQualityChange={func}    // defaults -> noop
/> */

class Video extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _Interval: '',
        }
        this._onPlay = this._onPlay.bind(this);
        this._onPause = this._onPause.bind(this);
    }

    componentDidUpdate() {
		console.log(this.props.time);
	}

    render() {
        console.log(this.props.end);
        const opts = {
            height: '390',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
              autoplay: 0,
              start: this.props.start,
              end: this.props.end,
              controls: 0,
            }
        };
        return (
            <YouTube
                videoId={this.props.videoId}
                opts={opts}
                onPlay={this._onPlay}
                onPause={this._onPause}
                // onReady={this._onReady}
            />
                
        )
    }

    _onPlay(event) {
        if (!this._Interval) {
            this._Interval = setInterval(() => 
                this.props._onPlay(event.target.getCurrentTime())
            ,300);
        }
    }

    _onPause(event) {
        clearInterval(this._Interval);
        this._Interval = false;
        // this.props._onPause(event.target.getCurrentTime());
    }
    // _onReady(event) {
    //     // access to player in all event handlers via event.target
    //     event.target.pauseVideo();
    // }
}

export default Video;
