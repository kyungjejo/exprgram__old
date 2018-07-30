import React, { Component } from 'react';
import { Checkbox, Button, Popup, Header } from 'semantic-ui-react';

import './index.css'

class SubtitleModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btnActive: false,
            style: {},
        }
        this.onClose = this.onClose.bind(this);
    }

    componentDidMount() {
        const subtitle_segment = document.querySelector('.segment-group-subtitle').getBoundingClientRect();
        console.log(subtitle_segment);
        this.setState({
            style: {
                top: subtitle_segment.width<550 ? subtitle_segment.top+40 : subtitle_segment.top+50,
                right: subtitle_segment.width<550 ? subtitle_segment.left-20 : subtitle_segment.left-15,
                minWidth: subtitle_segment.width<550 ? subtitle_segment.width+100 : subtitle_segment.width,
                position: 'absolute',
            }
        })
    }

    onClose() {
        this.props._onClose(1);
    }

    render() {
        return(
            <Popup
                open={this.props.open}
                style={this.state.style}
                className={"left center"}
                content={
                    <div>
                        <Header as="h4" textAlign="center">Instruction - Subtitle</Header>
                        <p>1. <span id="active">Each line of utterance is highlighted in yellow</span> dynamically as the video plays.</p>
                        <p>2. You can navigate video by clicking on a sentence.</p>
                        <p>3. Few seconds after <span id="target">blue sentence</span> is played, you will be asked to complete activities.</p>
                        <Checkbox label='I have read the instruction and know when the activities will appear.' 
                                    onClick={() => this.setState({btnActive: !this.state.btnActive})}/>
                        <Button floated="right" disabled={!this.state.btnActive} onClick={this.onClose}>Next</Button>
                    </div>
                }
                />
        )
    }
}

export default SubtitleModal;

