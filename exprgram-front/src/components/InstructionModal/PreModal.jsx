import React, { Component } from 'react';
import { Modal, Checkbox, Button, Header, Divider } from 'semantic-ui-react';

class PreModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btnActive: false,
        }
        this.onClose = this.onClose.bind(this);
    }

    onClose() {
        this.props._onCloseModal(0);
    }

    render() {
        return(
            <Modal
                open={this.props.open}
                style={this.state.style}>
                <Modal.Header>
                What Am I Supposed to Do?
                </Modal.Header>
                <Modal.Content>
                    <p>In this page, you will be watching a short video to learn the usage of an expression.</p>
                    <p>The <i>target expression</i> of this page is "<b>{this.props.targetSentence}</b>"</p>
                    <p>Focus on how the target expression is used in the video and its context it is used in.</p>
                    <p>After you've watched the video, you will be asked to complete questions regarding the expression.</p>
                    <p>To learn more about other features of Exprgram, please press 'Next'.</p>
                    <Checkbox label='Okay, let me see the instructions.' 
                                onClick={(e,value) => value['checked'] ? this.setState({btnActive: true}) : this.setState({btnActive:false})}/>
                </Modal.Content>
                <Modal.Actions>
                    <Button disabled={!this.state.btnActive} onClick={this.onClose}>Next</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default PreModal;

