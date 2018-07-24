import React, { Component } from 'react';
import { Modal, Checkbox, Button } from 'semantic-ui-react';

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
                open={this.state.open}
                dimmer={'inverted'}>
                <Modal.Header>Instruction</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p>In Exprgram, you will learn how expressions with similar meanings are used in various context</p>
                        <div style={{textAlign: 'center'}}>
                        <img 
                            style={{maxWidth: '50%', maxHeight: '50%'}}
                            src="https://github.com/kyungjejo/exprgram/raw/master/backend/static/homeview.png" />
                        </div>
                        <p>1-1. In this page, start from choosing any of the five suggested expressions.</p>
                        <p>1-2. You can get a new list of expressions by clicking 'Click for New Suggestions' on the bottom.</p>
                        <p>2. If you click one of the expression, you will be directed to a video watching page.</p>
                        <p>3. You can check your progress by clicking 'Track My Progress' on the bottom.</p>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.onClose}>Close</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default HomeInstruction;

