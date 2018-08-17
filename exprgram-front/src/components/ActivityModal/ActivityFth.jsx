import React, { Component } from 'react';
import { Modal, Button, Checkbox } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import {HOST_URL} from '../common';
import './index.css'

class ActivityFth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            similar: {},
            user_similar: {},
            verified: [],
            verfied_user: [],
            redirect: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch(HOST_URL+'/fetchSimilarVideos?index='+this.props.sentNumber+"&activity=1")
            .then(res => res.json())
            .then((response) => this.setState({
                similar: response['sent2vec'],
                user_similar: response['user'],
            }))
    }

    handleSubmit() {
        fetch(HOST_URL+"/activityResponse?number="+3+"&sentNumber="+this.props.sentNumber+"&userid="+this.props.userid, 
                {
                    method: 'POST',
                    'Access-Control-Allow-Origin':'*',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        similar_expressions: this.state.verified,
                        similar_expressions_user: this.state.verfied_user,
                        original_expressions: this.state.similar,
                        original_expressions_user: this.state.user_similar,
                    })
                }
            )
            .then(this.props.type === 'b' ? '' : this.setState({redirect:true}))
            .then(this.props._onClose(3))
    }

    render() {
        if (this.state.redirect && this.props.type !== 'b') {
            if (this.props.next.length>0)
                return <Redirect push to={"/video/"+this.props.next[0]+"/"+parseInt(this.props.next[1]['start'],10)+
                    "/"+parseInt(this.props.next[1]['end'],10)+"/"+this.props.next[2]+"/"+
                    this.props.next[3]+"/"+this.props.userid} />
            else {
                return <Redirect push to={"/home/"+this.props.userid} />
            }
        }
        return(
            <Modal open={this.props.open}
                style={this.props.style}
                dimmer={'inverted'}
                size={"small"}>
                <Modal.Header>Activity #4 - Learn Other Similar Sentences</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <p className="form-instruction">Choose all expressions that are replaceable to <b className="bold-emphasize">"{this.props.targetExpression}"</b> in the context.</p>
                        {this.state.similar && Object.keys(this.state.similar).map((val,idx) => 
                            <Checkbox key={idx} 
                                className="checkbox-expression"
                                label={this.state.similar[val]} 
                                value={val} 
                                onChange={(e,value) => 
                                    value['checked'] ?
                                    this.state.verified.push(value['value'])
                                    :
                                    this.state.verified.splice(this.state.verified.indexOf(value['value']),1)
                                }/>
                        )}
                        {this.state.user_similar && Object.keys(this.state.user_similar).map((val,idx) => 
                            <Checkbox key={idx} 
                                className="checkbox-expression"
                                label={this.state.user_similar[val]} 
                                value={val} 
                                onChange={(e,value) => 
                                    value['checked'] ?
                                    this.state.verfied_user.push(value['value'])
                                    :
                                    this.state.verified_user.splice(this.state.verified.indexOf(value['value']),1)
                                }/>
                        )}
                        {/* <Input fluid placeholder="Write the expression here." onChange={(e,value) => this.setState({suggestion: value['value']})}/> */}
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    {/* <Checkbox label='I have read the instruction and understand what buttons are for.' 
                                onClick={() => this.setState({btnActive: !this.state.btnActive})}/> */}
                    <Button onClick={() => (this.props.rewatch(3))} primary>Rewatch</Button>
                    <Button onClick={this.handleSubmit} positive>
                        { this.props.type==='b' ? 'Next' : 'Submit and Process to Next Video'}
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default ActivityFth;

