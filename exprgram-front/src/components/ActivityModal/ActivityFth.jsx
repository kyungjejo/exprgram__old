import React, { Component } from 'react';
import { Modal, Button, Input, Checkbox } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import './index.css'

class ActivityFth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            similar: {},
            verified: [],
            redirect: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        fetch('/fetchSimilarVideos?index='+this.props.sentNumber+"&activity=1")
            .then(res => res.json())
            .then((response) => this.setState({similar: response}))
    }

    handleSubmit() {
        fetch("/activityResponse?number="+3+"&sentNumber="+this.props.sentNumber+"&userid="+this.props.userid, 
                {
                    method: 'POST',
                    'Access-Control-Allow-Origin':'*',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        similar_expressions: this.state.verified,
                    })
                }
            )
            .then(this.setState({redirect:true}))
            .then(this.props._onClose(3))
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
                dimmer={'inverted'}
                size={"small"}>
                <Modal.Header>Activity #4 - Sentence Activity </Modal.Header>
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
                        {/* <Input fluid placeholder="Write the expression here." onChange={(e,value) => this.setState({suggestion: value['value']})}/> */}
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    {/* <Checkbox label='I have read the instruction and understand what buttons are for.' 
                                onClick={() => this.setState({btnActive: !this.state.btnActive})}/> */}
                    <Button onClick={() => (this.props.rewatch(3))}>Rewatch</Button>
                    <Button onClick={this.handleSubmit}>Submit and Process to Next Video</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default ActivityFth;

