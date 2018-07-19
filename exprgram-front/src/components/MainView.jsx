import React, { Component } from 'react';

import { Grid,  Loader, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import YouTube from 'react-youtube';

import Title from './Title/Title';
import Subtitle from './SubtitlteContainer/Subtitle';
import Buttons from './Buttons/Buttons';
import MainModal from './InstructionModal/MainModal';
import Activities from './ActivityModal';
import './index.css';

class MainView extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			subtitle: {},
			activeSentence: 0,
			playing: false,
			_interval: '',
			targetSentence: '',
			targetSentences: '',
			instructionModalState: [false,false,false],
			activityModalState: [false,false,false],
			target: '',
			activityTrigger: false,
			prompt: false,
			similar: {},
			videoID: this.props.match.params.videoId,
			rewatch: [false,-1],
			next: [],
		}
		this.updateActiveSentence = this.updateActiveSentence.bind(this);
		this._onPlay = this._onPlay.bind(this);
		this._onPause = this._onPause.bind(this);
		this._onReady = this._onReady.bind(this);
		this._onEnd = this._onEnd.bind(this);
		this._onClickSent = this._onClickSent.bind(this);
		this._onCloseInstructionModal = this._onCloseInstructionModal.bind(this);
		this._onStateChange=this._onStateChange.bind(this);
		this._onCloseActivityModal = this._onCloseActivityModal.bind(this);
		this.rewatch = this.rewatch.bind(this);
	}

	componentDidMount() {
		fetch('/progressCheck?userid='+this.props.match.params.userid, {'Access-Control-Allow-Origin':'*'})
			.then(res => res.json())
			.then((result) =>
				this.setState({
					instructionModalState: parseInt(result.pk,10)===0 ? [true,false,false] : [false,false,false]
				})
			)

		fetch('/fetchSubtitle?videoId='+this.props.match.params.videoId, {'Access-Control-Allow-Origin':'*'})
			.then(res => res.json())
			.then((result) => 
				this.setState({
					subtitle: result,
					targetSentence: result[this.props.match.params.number]['sent'],
					targetSentences: this.props.match.params.number
				}),
		)
		fetch('/fetchSimilarVideos?index='+this.props.match.params.index, {'Access-Control-Allow-Origin':'*'})
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
			activeSentence: this.props.match.params.number
		});
	}

	componentWillUpdate() {
		if (this.state.videoID !== this.props.match.params.videoId) {
			this.setState({videoID: this.props.match.params.videoId});
			fetch('/fetchSubtitle?videoId='+this.props.match.params.videoId, {'Access-Control-Allow-Origin':'*'})
			.then(res => res.json())
			.then((result) => 
				this.setState({
					subtitle: result,
					targetSentence: result[this.props.match.params.number]['sent'],
					targetSentences: this.props.match.params.number
				})
			)
			fetch('/fetchSimilarVideos?index='+this.props.match.params.index, {'Access-Control-Allow-Origin':'*'})
				.then(res => res.json())
				.then((result) => this.setState({
					similar: result
				}))
			
			const state = this.state.instructionModalState.slice();
			// state[0] = true;
			this.setState({
				instructionModalState: state,
				activeSentence: this.props.match.params.number
			});
		}
	}

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
		};
		return (
		<div>
			<MainModal
				_onCloseModal={this._onCloseInstructionModal}
				open={this.state.instructionModalState[0]} />
			<Activities 
				_onCloseModal={this._onCloseActivityModal}
				_openModal={this.state.activityModalState}
				taregtExpression={this.state.targetSentence}
				rewatch={this.rewatch}
				userid={this.props.match.params.userid}
				sentNumber={this.props.match.params.index}
				next={this.state.next} />
			<Title userid={this.props.match.params.userid}/>
			<div className="container center" id="main">
				<Dropdown text={this.state.targetSentence ? 'Current sentence: '+this.state.targetSentence : 'Current sentence: '} 
						className='link item dropdown-expressions' fluid size='medium'>
					<Dropdown.Menu className="dropdown-expressions-menu">
						<Dropdown.Header className="dropdown-header">Related Expressions</Dropdown.Header>
						{
							Object.keys(this.state.similar).map(((id, i) => 
								(
									<Link key={i} to={"/video/"+this.state.similar[id][0]+"/"+parseInt(this.state.similar[id][1]['start'],10)+
										"/"+parseInt(this.state.similar[id][1]['end'],10)+"/"+this.state.similar[id][2]+"/"+this.state.similar[id][3]+"/"+this.props.match.params.userid}>
										<Dropdown.Item className="dropdown-items">{this.state.similar[id][1]['sent']}</Dropdown.Item>
									</Link>
								)	
							)
							)
						}
					</Dropdown.Menu>
				</Dropdown>
				<br />
				<Grid columns={2} divided>
					<Grid.Row>
						<Grid.Column>
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
									_onCloseModal={this._onCloseInstructionModal}
									_openModal={this.state.instructionModalState[2]}
									prompt={this.state.prompt}>
								</Subtitle>
							}
						</Grid.Column>
					</Grid.Row>
				</Grid>
				{
					!this.state.target &&
					<Grid columns={2}>
					<Grid.Row>
						<Grid.Column textAlign="center" className="grid-buttons">
							<Loader active />
						</Grid.Column>
						<Grid.Column>
						</Grid.Column>
					</Grid.Row>
					</Grid>
				}
				{
					this.state.target &&
					<Buttons 
						target={this.state.target}
						playing={this.state.playing}
						_onPlay={this._onPlay}
						_onPause={this._onPause}
						_onCloseModal={this._onCloseInstructionModal}
						_openModal={this.state.instructionModalState[1]}/>
				}
				</div>
			</div>
		)
	}

	updateActiveSentence(time) {
		if (parseInt(time,10) < parseInt(this.props.match.params.start,10)){
			this.state.target.seekTo(parseInt(this.props.match.params.start,10));
		}
		if (parseInt(time,10) >= parseInt(this.props.match.params.end)) {
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
				// 		(this.startAcitivty(this.state.activeSentence),
				// 		this._onPause()
				// 		)
				// 	,parseInt(parseInt((this.state.subtitle[i]['end']-this.state.target.getCurrentTime())*1000)+5000));
				// }
				return;
			}
		}
	}

	rewatch(idx) {
		let modalState = this.state.activityModalState.slice();
		modalState[idx] = false;
		console.log(modalState);
		this.setState({
			rewatch:[true,idx],
			activityModalState: modalState
		});
		this.state.target.seekTo(parseInt(this.props.match.params.start,10))
		this.state.target.playVideo();
	}

	startAcitivty() {
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

	// Managed separately into two functions
	// onClose functions for Instruction modals and activity modals
	_onCloseInstructionModal(idx) {
		const modalState = this.state.instructionModalState.slice();
		modalState[idx] = false;
		if (idx+1<this.state.instructionModalState.length)
			modalState[idx+1] = true;
		else this.state.target.seekTo(this.state.target.getCurrentTime()-4);
		this.setState({
			instructionModalState: modalState
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
		this.startAcitivty(this.state.activeSentence);
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

export default MainView;