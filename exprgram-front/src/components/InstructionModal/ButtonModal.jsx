import React, { Component } from 'react';
import { Modal, Checkbox, Button } from 'semantic-ui-react';

class ButtonModal extends Component {
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
                <Modal.Header>Instruction - Button</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>You can use the button above to play or pause video.</p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Checkbox label='I have read the instruction and understand what buttons are for.' 
                                onClick={() => this.setState({btnActive: !this.state.btnActive})}/>
                    <Button disabled={!this.state.btnActive} onClick={this.onClose}>Next</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default ButtonModal;

