import React, { Component } from 'react';

import { Grid,  Loader, Dropdown, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import {HOST_URL} from './common';

import Title from './Title/Title';
import Subtitle from './SubtitlteContainer/Subtitle';
import Activities from './ActivityModal';

class Test extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			subtitle: {},
			activeSentence: 0,
			playing: false,
			_interval: '',
			targetSentence: '',
			targetSentences: '',
			activityModalState: [],
			target: '',
			activityTrigger: false,
			prompt: false,
			similar: {},
			videoID: this.props.match.params.videoId,
			rewatch: [false,-1],
			next: [],
			type: '',
		}
		this.updateActiveSentence = this.updateActiveSentence.bind(this);
		this._onPlay = this._onPlay.bind(this);
		this._onPause = this._onPause.bind(this);
		this._onReady = this._onReady.bind(this);
		this._onEnd = this._onEnd.bind(this);
		this._onClickSent = this._onClickSent.bind(this);
		this._onStateChange=this._onStateChange.bind(this);
		this._onCloseActivityModal = this._onCloseActivityModal.bind(this);
		this.rewatch = this.rewatch.bind(this);
	}

	componentDidMount() {
		// ReactGA.set({ 
		// 	userId: this.props.match.params.userid,
		// 	videoId: this.props.match.params.videoId,
		// 	sentNumber: this.props.match.params.index,
		// });
		const type = this.props.match.params.type;
		this.setState({
			type: type
		})

		this.setState({
			activityModalState: type === 'a' ? [false] : [false,false,false,false,false]
		})
		
		fetch(HOST_URL+'/fetchSubtitle?videoId='+this.props.match.params.videoId, {'Access-Control-Allow-Origin':'*'})
			.then(res => res.json())
			.then((result) => 
				this.setState({
					subtitle: result,
					targetSentence: result[this.props.match.params.number]['sent'],
					targetSentences: this.props.match.params.number
				}),
		)
		fetch(HOST_URL+'/fetchSimilarVideos?index='+this.props.match.params.index+'&userid='+this.props.match.params.userid, {'Access-Control-Allow-Origin':'*'})
			.then(res => res.json())
			.then((result) => 
				(
					this.setState({
						similar: result
					}),
					Object.keys(result).map((id,i) =>
					(
						parseInt(result[id][3],10) === parseInt(this.props.match.params.index,10)
						?
						null
						:
						this.setState({next:result[id]})
					)
							
					)
				)
			)

		// const state = this.state.instructionModalState.slice();
		// state[0] = true;
		this.setState({
			// instructionModalState: state,
			activeSentence: this.props.match.params.number,
		});
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.match.params.type === 'b' && this.state.type !== 'b') 
			this.setState({type:'b'}, () => window.location.reload())
	}
	// componentWillUpdate() {
	// 		// this.setState({videoID: this.props.match.params.videoId});
	// 		// fetch('/fetchSubtitle?videoId='+this.props.match.params.videoId, {'Access-Control-Allow-Origin':'*'})
	// 		// .then(res => res.json())
	// 		// .then((result) => 
	// 		// 	this.setState({
	// 		// 		subtitle: result,
	// 		// 		targetSentence: result[this.props.match.params.number]['sent'],
	// 		// 		targetSentences: this.props.match.params.number
	// 		// 	})
	// 		// )
	// 		// fetch('/fetchSimilarVideos?index='+this.props.match.params.index, {'Access-Control-Allow-Origin':'*'})
	// 		// 	.then(res => res.json())
	// 		// 	.then((result) => this.setState({
	// 		// 		similar: result
	// 		// 	}))
			
	// 		// const state = this.state.instructionModalState.slice();
	// 		// // state[0] = true;
	// 		// this.setState({
	// 		// 	instructionModalState: state,
	// 		// 	activeSentence: this.props.match.params.number
	// 		// });
	// }

	render() {
		const opts = {
			height: '390',
			width: '640',
			playerVars: { // https://developers.google.com/youtube/player_parameters
				autoplay: 0,
				start: parseInt(this.props.match.params.start,10),
				end: parseInt(this.props.match.params.end,10),
				controls: 1,
				rel: 0,
				modestbranding: 1,
				disablekb: 1,
			}
		}
		return (
		<div>
			<Activities 
				_onCloseModal={this._onCloseActivityModal}
				_openModal={this.state.activityModalState}
				targetExpression={this.state.targetSentence}
				rewatch={this.rewatch}
				userid={this.props.match.params.userid}
				next={this.state.next}
				videoId={this.props.match.params.videoId}
				start={this.props.match.params.start}
				end={this.props.match.params.end}
				number={this.props.match.params.number}
				sentNumber={this.props.match.params.index}
                type={this.props.match.params.type} />
			<Title userid={this.props.match.params.userid}/>
			<div className="container center" id="main">
				<Header as='h3' textAlign={'center'}>
                    {this.state.targetSentence ? 'Current sentence: '+this.state.targetSentence : 'Current sentence: '} 
				</Header>
				<br />
				<Grid columns={2} divided>
					<Grid.Row>
						<Grid.Column style={{margin: 'auto'}}>
							<YouTube
								videoId={this.props.match.params.videoId}
								opts={opts}
								onPlay={this._onPlay}
								onPause={this._onPause}
								onReady={this._onReady}
								onStateChange={this._onStateChange}
								onEnd={this._onEnd}
							/>
						</Grid.Column>
						<Grid.Column>
							{
								!this.state.target &&
								<Loader active />
							}
							{
								this.state.target &&
								<Subtitle 
									videoId={this.props.match.params.videoId}
									subtitle={this.state.subtitle}
									activeSentence={this.state.activeSentence}
									targetSentence={this.props.match.params.number}
									_onClickSent={this._onClickSent}
									onReady={this._onReady}
									prompt={this.state.prompt}>
								</Subtitle>
							}
						</Grid.Column>
					</Grid.Row>
				</Grid>
				</div>
			</div>
		)
	}

	updateActiveSentence(time) {
		if (parseInt(time,10) < parseInt(this.props.match.params.start,10)){
			this.state.target.seekTo(parseInt(this.props.match.params.start,10));
		}
		if (parseInt(time,10) >= parseInt(this.props.match.params.end,10)) {
			this._onEnd();
		}
		for (var i=0; i<Object.keys(this.state.subtitle).length; i++) {
			if (this.state.subtitle[i].start !== -1 &&
				this.state.subtitle[i].end !== -1 &&
				time > this.state.subtitle[i].start && 
				time < this.state.subtitle[i].end)
			{
				this.setState({
					activeSentence: i
				});
				// if (!this.state.activityTrigger && this.state.targetSentences.includes(this.state.activeSentence)) {
				// 	this.setState({activityTrigger: true});
				// 	setTimeout(() => 
				// 		(this.startActivity(this.state.activeSentence),
				// 		this._onPause()
				// 		)
				// 	,parseInt(parseInt((this.state.subtitle[i]['end']-this.state.target.getCurrentTime())*1000)+5000));
				// }
				return;
			}
		}
	}

	rewatch(idx) {
		const type = this.props.match.params.type;
		let modalState = this.state.activityModalState.slice();
		modalState[idx] = false;
		// console.log(modalState);
		this.setState({
			rewatch:[true,idx],
			activityModalState: modalState
		});
		this.state.target.seekTo(parseInt(this.props.match.params.start,10))
		this.state.target.playVideo();
	}

	startActivity() {
		let modalState = this.state.activityModalState.slice();
		if (this.state.rewatch[0]) {
			modalState[this.state.rewatch[1]] = true;
		}
		else {
			modalState[0] = true;
		}
		let target = this.state.targetSentences;
		this.setState({
			activityModalState: modalState,
			targetSentences: target,
			activityTrigger: false,
		});
	}

	_onCloseActivityModal(idx) {
		const modalState = this.state.activityModalState.slice();
		modalState[idx] = false;
		if (idx+1<this.state.activityModalState.length)
			modalState[idx+1] = true;
		this.setState({
			activityModalState: modalState
		});
		
	}

	_onReady(event) {
		const column = document.querySelector('.ui.divided.two .row .column');
		const iframe = document.querySelector('iframe');
		iframe.width = parseInt(column.clientWidth*0.95,10);
		iframe.height = parseInt(column.clientWidth/1.77,10);
		this.setState({target:event.target})
	}

    _onPlay() {
		// this.setState({playing: true});
		this.state.target.playVideo();
        if (!this._interval) {
			this._interval = setInterval(() => 
				(this.updateActiveSentence(this.state.target.getCurrentTime()),
				this.state.activityModalState.indexOf(true)>=0 ? this.state.target.pauseVideo() : null
				)
            ,300);
		}
    }

    _onPause() {
		// this.setState({playing: false});
		this.state.target.pauseVideo();
        clearInterval(this._interval);
        this._interval = false;
	}

	_onEnd() {
		this.startActivity(this.state.activeSentence);
		this.state.target.seekTo(parseInt(this.props.match.params.start,10))
		this.state.target.pauseVideo();
		// this.setState({
		// 	prompt: true
		// })
	}

	_onClickSent(time,idx) {
		this.state.target.seekTo(time-1);
		if (!this.state.playing) {
			this.state.target.playVideo();
			this.setState({
				// playing: !this.state.playing,
				activeSentence: idx
			});
		}
	}

	_onStateChange(event) {
		if (event.target.j.playerState===1) {
			this.setState({playing: true})
		}
		else {
			this.setState({playing: false})
		}
	}

}

export default Test;
