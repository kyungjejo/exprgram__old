import React, { Component } from 'react';
import { Modal, Checkbox, Button } from 'semantic-ui-react';

import './index.css'

class SubtitleModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btnActive: false
        }
        this.onClose = this.onClose.bind(this);
    }

    onClose() {
        this.props._onClose(1);
    }

    render() {
        return(
            <Modal open={this.props.open}
                style={this.props.style}
                dimmer={'inverted'}>
                <Modal.Header>Instruction - Subtitle</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>1. <span id="active">Each line of utterance is highlighted in yellow</span> dynamically as the video plays.</p>
                        <p>2. You can navigate video by clicking on a sentence.</p>
                        <p>3. Few seconds after <span id="target">blue sentence</span> is played, you will be asked to complete activities.</p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Checkbox label='I have read the instruction and know when the activities will appear.' 
                                onClick={() => this.setState({btnActive: !this.state.btnActive})}/>
                    <Button disabled={!this.state.btnActive} onClick={this.onClose}>Next</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default SubtitleModal;

