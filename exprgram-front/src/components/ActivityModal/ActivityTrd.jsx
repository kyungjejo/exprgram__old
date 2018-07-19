import React, { Component } from 'react';
import { Modal, Button, Header, Input, Form } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import './index.css';

class ActivityTrd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            relationship: '',
            location: '',
            intention: '',
            emotion: '',
            redirect: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit() {
        const {relationship, location, intention, emotion } = this.state;
        if ( this.state.relationship && this.state.location && this.state.intention && this.state.emotion )
        fetch("/activityResponse?number="+2+"&sentNumber="+this.props.sentNumber+"&userid="+this.props.userid, 
                {
                    method: 'POST',
                    'Access-Control-Allow-Origin':'*',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        relationship: relationship,
                        location: location,
                        intention: intention,
                        emotion: emotion,
                    })
                }
            )
            .then(this.setState({redirect:true}))
            .then(this.props._onClose(2))
    }

    render() {
        if (this.state.redirect) {
            this.setState({redirect: false})
            return <Redirect push to={"/video/"+this.props.next[0]+"/"+parseInt(this.props.next[1]['start'],10)+
                                    "/"+parseInt(this.props.next[1]['end'],10)+"/"+this.props.next[2]+"/"+
                                    this.props.next[3]+"/"+this.props.userid} />;
        }
        return(
            <Modal open={this.props.open}
                style={this.props.style}
                dimmer={'inverted'}>
                <Modal.Header>Activity #3 - Context Labelling Activity</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form>
                        <p className="form-instruction">
                            Based on your understanding, please fill in the blanks or modify them if necessary.<br />
                            <b>Speaker</b> in questions, refer to the character that says the <i>target expression</i> in the video.
                        </p>
                        
                        <Form.Field>
                            <label>Write or edit the word that best describes the relationship between speakers.</label>
                            <Input 
                                className="input-short-text" 
                                type="text" 
                                size="small" 
                                onChange={(e,value) => this.setState({relationship: value['value']})}
                                placeholder="e.g., friends, colleagues"/>
                        </Form.Field>
                        <Form.Field>
                            <label>Write or edit the location of the scene.</label>
                            <Input 
                                className="input-short-text" 
                                type="text" 
                                size="small" 
                                onChange={(e,value) => this.setState({location: value['value']})}
                                placeholder="e.g., living room, cafe, home"/>
                        </Form.Field>
                        <Form.Field>
                            <label>Write or edit the word that best represents the emotion of the speaker.</label>
                            <Input 
                                className="input-short-text" 
                                type="text" 
                                size="small" 
                                onChange={(e,value) => this.setState({emotion: value['value']})}
                                placeholder="e.g., happy, sad, angry"/>
                        </Form.Field>
                        <Form.Field>
                            <label>Try to explain the intention of the speaker.</label>
                            <Input 
                                type="text" 
                                size="small" 
                                onChange={(e,value) => this.setState({intention: value['value']})}
                                placeholder="Remember that there is no single right answer for these types of questions."/>
                        </Form.Field>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    {/* <Checkbox label='I have read the instruction and understand what buttons are for.' 
                                onClick={() => this.setState({btnActive: !this.state.btnActive})}/> */}
                    <Button onClick={() => (this.props.rewatch(2))}>Rewatch</Button>
                    <Button onClick={this.handleSubmit}>Submit and Process to Next Video</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default ActivityTrd;

