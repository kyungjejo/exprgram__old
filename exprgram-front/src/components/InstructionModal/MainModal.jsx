import React, { Component } from 'react';
import { Popup, Checkbox, Button, Header, Divider } from 'semantic-ui-react';

class MainModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btnActive: false,
            style: {},
        }
        this.onClose = this.onClose.bind(this);
    }

    componentDidMount() {
        const dropdown_expressions = document.querySelector('.dropdown-expressions').getBoundingClientRect();
        this.setState({
            style: {
                top: dropdown_expressions.top+50,
                right: dropdown_expressions.width<550 ? dropdown_expressions.left-50 : dropdown_expressions.left,
                minWidth: dropdown_expressions.width<550 ? dropdown_expressions.width+100 : dropdown_expressions.width,
                position: 'absolute',
            }
        })
    }

    onClose() {
        this.props._onCloseModal(1);
    }

    render() {
        return(
            <Popup
                className="bottom center"
                open={this.props.open}
                style={this.state.style}
                content={
                    <div>
                        <Header as="h3" textAlign="center">Instruction - Similar Expressions</Header>
                        <Divider/>
                        <p>Above dropdown-bar provides you the followings:</p>
                        <p>1. The current <b>target expression</b> you are expected to learn.</p>
                        <p>2. Other expressions that are similar to <b>target expression</b>.</p>
                        <p>3. By clicking, you can jump to other videos.</p>
                        <Checkbox label='I have read the instruction and know how to use the dropdown bar above.' 
                                   onClick={(e,value) => value['checked'] ? this.setState({btnActive: true}) : this.setState({btnActive:false})}/>
                        <Divider />
                        <Button floated={'right'} disabled={!this.state.btnActive} onClick={this.onClose}>Next</Button>
                    </div>
                }
                />
            // <Modal 
            //     style={this.state.style}
            //     open={this.props.open}
            //     dimmer={'inverted'}>
            //     <Modal.Header>Instruction - Similar Expressions</Modal.Header>
            //     <Modal.Content>
            //         <Modal.Description>
            //             <p>Above dropdown-bar provides you the followings:</p>
            //             <p>1. The current <b>target expression</b> you are expected to learn.</p>
            //             <p>2. Other expressions that are similar to <b>target expression</b>.</p>
            //             <p>3. By clicking, you can jump to other videos.</p>
            //         </Modal.Description>
            //     </Modal.Content>
            //     <Modal.Actions>
            //         <Checkbox label='I have read the instruction and know how to use the dropdown bar above.' 
            //                     onClick={() => this.setState({btnActive: !this.state.btnActive})}/>
            //         <Button disabled={!this.state.btnActive} onClick={this.onClose}>Next</Button>
            //     </Modal.Actions>
            // </Modal>
        )
    }
}

export default MainModal;

