import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';

import './Subtitle.css';
import SubtitleModal from '../InstructionModal/SubtitleModal';

class Subtitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activity_fst: false,
            activity_two: false,
            activity_thr: false,
            style: {}
        }
    }
    
    componentDidMount() {
        const segment_subtitle = document.querySelector('.segment-group-subtitle').getBoundingClientRect();
        this.setState({
            style: {
                top: segment_subtitle.top+30,
                left: segment_subtitle.left+30,
                position: 'absolute',
                width: 'auto',
            }
        })
    }

    render() {
        return (
            <div>
                <Header textAlign="center" className="header-subtitle">Subtitle</Header>
                <Segment.Group className="segment-group-subtitle">
                    {
                        (Object.keys(this.state.style).length > 0)
                        &&
                        <SubtitleModal _onClose={this.props._onCloseModal}
                            open={this.props._openModal}
                            style={this.state.style}/>
                    }
                    {Object.keys(this.props.subtitle).length > 0
                    ?
                    Object.keys(this.props.subtitle).map((id,i) =>
                        this.props.activeSentence>=4 && this.props.activeSentence>i-4 && this.props.activeSentence<i+4
                        ?
                            <Segment key={id} 
                                className="segment-sentence"
                                id={this.props.activeSentence===i && this.props.targetSentence===i.toString() ? "activeTarget"
                                        :this.props.activeSentence===i ? 'active'
                                        :this.props.targetSentence===i.toString() ? "target" : ''}
                                start={this.props.subtitle[id].start} 
                                end={this.props.subtitle[id].end}
                                onClick={() => this.props._onClickSent(this.props.subtitle[id].start,i)}
                                >
                                {this.props.subtitle[id].sent}
                            </Segment>
                        :
                        (
                            this.props.activeSentence<4 && i<7 
                            ?
                                <Segment key={id} 
                                    className="segment-sentence"
                                    id={this.props.activeSentence===i && this.props.targetSentence===i.toString() ? "activeTarget"
                                        :this.props.activeSentence===i ? 'active'
                                        :this.props.targetSentence===i.toString() ? "target" : ''}
                                    start={this.props.subtitle[id].start} 
                                    end={this.props.subtitle[id].end}
                                    onClick={() => this.props._onClickSent(this.props.subtitle[id].start,i)}
                                    >
                                {this.props.subtitle[id].sent}
                                </Segment>
                            :
                            ''
                        )
                        )
                    :
                    ''
                    } 
                    {/* {this.props.activeSentence === 2 && !this.state.activity_fst && !this.state.fst_open ? this.setState({activity_fst: true}) : ''} */}
                </Segment.Group>
            </div>
        )
    }

    onClose(idx) {

    }

}

export default Subtitle;