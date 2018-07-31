import React, { Component } from 'react';
import { Modal, Button, Image, Header } from 'semantic-ui-react';

class HomeInstruction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btnActive: false,
            style: {},
            open: true,
        }
        this.onClose = this.onClose.bind(this);
    }

    componentDidMount() {
        const dropdown_expressions = document.querySelector('.container-videoList').getBoundingClientRect();
        // this.setState({
        //     style: {
        //         top: dropdown_expressions.top,
        //         left: dropdown_expressions.left-parseInt(dropdown_expressions.left/4*1,10),
        //         // minWidth: dropdown_expressions.width,
        //         // minHeight: dropdown_expressions.height,
        //         maxWidth: dropdown_expressions.width+(dropdown_expressions.left-parseInt(dropdown_expressions.left/4*3,10))*2,
        //         // position: 'absolute',
        //     }
        // })
    }

    onClose() {
        sessionStorage.setItem('modal', true);
        this.setState({open: false})
    }

    render() {
        return(
            <Modal 
                // className={"home-instruction"}
                open={this.props.open && this.state.open}
                style={this.state.style}
                dimmer={'inverted'}>
                <Modal.Header>
                    How to use Exprgram
                </Modal.Header>
                <Modal.Content>
                    <div>
                        <p>In Exprgram, you will watch YouTube videos to learn how similar expressions are used in different contexts.</p>
                        <p>This page will look similar to the screencapture below.</p>
                        <div style={{textAlign: 'center'}}>
                            <Image 
                                bordered
                                style={{maxWidth: '70%', maxHeight: '70%'}}
                                centered
                                src="http://drive.google.com/uc?export=view&id=1OWUoDK8_nE4ZySB4AWyuMUzxsbMvIqcg" />
                        </div>
                        <Header as="h3" textAlign="center">Instruction</Header>
                        <p>1. You can start by clicking any of five expressions that show on this page.</p>
                        <p>&nbsp;&nbsp;&nbsp;&nbsp;1-1. By hovering an expression, you can see the list of related expressions you will learn.</p>
                        <p>2. You can get a new list of expressions by clicking '<b>Click for New Suggestions</b>' on the bottom.</p>
                        <p>3. You can check your progress by clicking '<b>Track My Progress</b>' on the bottom.</p>
                        <p>4. At each end of the video, you will be asked to complete activities.</p>
                    </div>
                </Modal.Content>
                <Modal.Actions>
                    <Button  onClick={this.onClose}>Close</Button>
                </Modal.Actions>
                {/* <Popup.Header>Instruction</Popup.Header>
                <Popup.Actions>
                    
                </Popup.Actions> */}
            </Modal>
        )
    }
}

export default HomeInstruction;

