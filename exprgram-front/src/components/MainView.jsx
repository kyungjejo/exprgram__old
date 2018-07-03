import React, { Component } from 'react';

import { Grid, Button, Icon } from 'semantic-ui-react';
import YouTube from 'react-youtube';

import Subtitle from './SubtitlteContainer/Subtitle';

class MainView extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			subtitle: {},
			activeSentence: 0,
			playing: false,
			_interval: '',
		}
		this.updateActiveSentence = this.updateActiveSentence.bind(this);
		this._onPlay = this._onPlay.bind(this);
		this._onPause = this._onPause.bind(this);
		this._onReady = this._onReady.bind(this);
	}

	componentDidMount() {
		fetch('/fetchSubtitle?videoId='+this.props.match.params.videoId, {'Access-Control-Allow-Origin':'*'})
			.then(res => res.json())
			.then((result) => 
				this.setState({
					subtitle: result,
				})
			)
	}


	render() {
		const opts = {
			height: '390',
			width: '640',
			playerVars: { // https://developers.google.com/youtube/player_parameters
			  autoplay: 0,
			  start: this.props.match.params.start,
			  end: this.props.match.params.end,
			  controls: 1,
			  target: '',
			}
		};
		return (
		<div className="container center" id="main">
			<Grid columns={2} divided>
				<Grid.Row>
					<Grid.Column>
					<YouTube
						videoId={this.props.match.params.videoId}
						opts={opts}
						onPlay={this._onPlay}
						onPause={this._onPause}
						onReady={this._onReady}
					/>
					</Grid.Column>
					<Grid.Column>
						<Subtitle 
							videoId={this.props.match.params.videoId}
							subtitle={this.state.subtitle}
							activeSentence={this.state.activeSentence}
						/>
					</Grid.Column>
				</Grid.Row>
			</Grid>
			<Grid columns={2}>
				<Grid.Row>
					<Grid.Column textAlign="center">
						<Button icon labelPosition='left'onClick={() => 
								this.state.target.seekTo(this.state.target.getCurrentTime()-5)
							}>
							<Icon name='step backward' />
							-5 sec
						</Button>
						<Button icon labelPosition='left' onClick={
								() => (this.setState({playing: !this.state.playing}),
										this.state.playing ? this.state.target.pauseVideo() : this.state.target.playVideo()
								)}>
							<Icon name={this.state.playing? 'pause' : 'play'} />
							{this.state.playing ? 'Pause' : 'Play'}
						</Button>
						<Button icon labelPosition='right' onClick={() => 
								this.state.target.seekTo(this.state.target.getCurrentTime()+5)
							}>
							+5 sec
							<Icon name='step forward' />
						</Button>
					</Grid.Column>
					<Grid.Column>
						</Grid.Column>
				</Grid.Row>
			</Grid>
			</div>
		)
	}

	updateActiveSentence(time) {
		for (var i=0; i<Object.keys(this.state.subtitle).length; i++) {
			if (this.state.subtitle[i].start !== -1 &&
				this.state.subtitle[i].end !== -1 &&
				time > this.state.subtitle[i].start && 
				time < this.state.subtitle[i].end)
			{
				this.setState({
					activeSentence: i
				})
				return;
			}
		}
	}

	_onReady(event) {
		this.setState({target:event.target})
	}

    _onPlay(event) {
		this.setState({playing: true});
        if (!this._interval) {
			this._interval = setInterval(() => 
				this.updateActiveSentence(event.target.getCurrentTime())
            ,300);
        }
    }

    _onPause(event) {
		this.setState({playing: false});
        clearInterval(this._interval);
        this._interval = false;
	}

}

export default MainView;