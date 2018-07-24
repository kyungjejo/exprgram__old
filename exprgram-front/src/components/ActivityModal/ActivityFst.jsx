import React, { Component } from 'react';
import { Modal, Button, List, Form, Radio, Header } from 'semantic-ui-react';
import './index.css';

class ActivityFst extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expression_value: 0,
            context_value: 0
        }
        // this.onClose = this.onClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        if (!(this.state.expression_value===0 || this.state.context_value===0))
            fetch("/activityResponse?number="+0+"&sentNumber="+this.props.sentNumber+"&userid="+this.props.userid, 
                    {
                        method: 'POST',
                        'Access-Control-Allow-Origin':'*',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            expression_value: this.state.expression_value,
                            context_value: this.state.context_value
                        })
                    }
                )
                .then(this.props._onClose(0))
                .catch((error) => console.log(error));
    }

    // onClose() {
        
    // }

    render() {
        // alert(this.props.userid);
        return(
            <Modal open={this.props.open}
                style={this.props.style}
                dimmer={'inverted'}>
                <Modal.Header>Activity #1 - Assessment of Understanding</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p className="form-instruction">Target expression of the video: <b>{this.props.targetExpression}</b></p>
                        {/* <p className="form-instruction">Try to select the most appropriate answers for the following questions.</p> */}
                        <div>
                                <List className="list-likert"   horizontal relaxed>
                                    <p className="form-question">
                                        1. Choose the score that best explains your understand of the <b className="bold-emphasize">expression</b>?
                                    </p>
                                    <List.Item>
                                        <List.Content>
                                            Not at all
                                        </List.Content>
                                    </List.Item>
                                    {[1,2,3,4,5,6,7].map((id,i) => 
                                        <List.Item key={i}>
                                            <Form.Field>
                                                <Radio
                                                    label={id}
                                                    name="expression_understanding"
                                                    onChange={(e,value) => this.setState({expression_value: value['value']})}
                                                    value={id}
                                                />
                                            </Form.Field>
                                        </List.Item>
                                    )}
                                    <List.Item>
                                        <List.Content>
                                            Completely
                                        </List.Content>
                                    </List.Item>
                                </List>
                                <List className="list-likert" horizontal relaxed>
                                    <p className="form-question">
                                        2. Choose the score that best explains your understanding of the <b className="bold-emphasize">situation</b>?
                                    </p>
                                    <List.Item>
                                        <List.Content>
                                            Not at all
                                        </List.Content>
                                    </List.Item>
                                    {[1,2,3,4,5,6,7].map((id,i) => 
                                        <List.Item key={i}>
                                            <Form.Field>
                                                <Radio
                                                    label={id}
                                                    name="context_understanding"
                                                    onChange={(e,value) => this.setState({context_value: value['value']})}
                                                    value={id}
                                                />
                                            </Form.Field>
                                        </List.Item>
                                    )}
                                    <List.Item>
                                        <List.Content>
                                            Completely
                                        </List.Content>
                                    </List.Item>
                                </List>
                        </div>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => (this.props.rewatch(0))}>Rewatch</Button>
                    <Button onClick={this.handleSubmit}>Next</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default ActivityFst;

