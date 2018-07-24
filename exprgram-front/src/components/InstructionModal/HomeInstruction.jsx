import React, { Component } from 'react';
import { Modal, Checkbox, Button } from 'semantic-ui-react';

class MainModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btnActive: false,
            style: {},
            open: true,
        }
        this.onClose = this.onClose.bind(this);
    }

    // componentDidMount() {
    //     const dropdown_expressions = document.querySelector('.dropdown-expressions').getBoundingClientRect();
    //     this.setState({
    //         style: {
    //             top: dropdown_expressions.top+40,
    //             left: dropdown_expressions.left+30,
    //             position: 'absolute',
    //             width: 'auto',
    //         }
    //     })
    // }

    onClose() {
        this.setState({open: false})
    }

    render() {
        return(
            <Modal 
                open={this.props.open && this.state.open}
                dimmer={'inverted'}>
                <Modal.Header>Instruction</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Checkbox label='I have read the instruction and know how to use the dropdown bar above.' 
                                onClick={() => this.setState({btnActive: !this.state.btnActive})}/>
                    <Button onClick={this.onClose}>Next</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default MainModal;

