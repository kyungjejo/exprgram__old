import React, { Component } from 'react';
import { Modal, Button, Input } from 'semantic-ui-react';
import {HOST_URL} from '../common';
import './index.css'

class ActivityTrd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestion: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        if (this.state.suggestion)
            fetch(HOST_URL+"/activityResponse?number="+2+"&sentNumber="+this.props.sentNumber+"&userid="+this.props.userid, 
                    {
                        method: 'POST',
                        'Access-Control-Allow-Origin':'*',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            similar_expression: this.state.suggestion,
                        })
                    }
                )
                .then(this.props._onClose(2))
    }

    render() {
        return(
            <Modal open={this.props.open}
                style={this.props.style}
                dimmer={'inverted'}>
                <Modal.Header>Activity #3 - Sentence Building Activity </Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p className="form-instruction">Suggest an expression that you think can replace <b className="bold-emphasize">"{this.props.targetExpression}"</b>.</p>
                        <Input fluid placeholder="Write the expression here." onChange={(e,value) => this.setState({suggestion: value['value']})}/>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    {/* <Checkbox label='I have read the instruction and understand what buttons are for.' 
                                onClick={() => this.setState({btnActive: !this.state.btnActive})}/> */}
                    <Button onClick={() => (this.props.rewatch(2))} primary>Rewatch</Button>
                    <Button onClick={this.handleSubmit} positive>Next</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default ActivityTrd;

