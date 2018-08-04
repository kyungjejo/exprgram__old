import React, { Component } from 'react';
import { Modal, Button, Input, Form, Header, Radio, List } from 'semantic-ui-react';
import {HOST_URL} from '../common';
import './index.css';

class ActivitySnd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            relationship: '',
            location: '',
            intention: '',
            emotion: '',
            relationship_lst: [],
            location_lst: [],
            intention_lst: [],
            emotion_lst: [],
            relationship_selected: '',
            location_selected: '',
            emotion_selected: '',
            intention_selected: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
        fetch(HOST_URL+'/labelBandit?target='+this.props.sentNumber, {'Access-Control-Allow-Origin':'*'})
            .then(res => res.json())
            .then((response) => 
                this.setState({
                    relationship_lst: response['relationship'],
                    location_lst: response['location'],
                    intention_lst: response['intention'],
                    emotion_lst: response['emotion'],
                })
            )
    }

    handleSubmit() {
        const {relationship, location, intention, emotion } = this.state;
        if ( this.state.relationship && this.state.location && this.state.intention && this.state.emotion )
        fetch(HOST_URL+"/activityResponse?number="+1+"&sentNumber="+this.props.sentNumber+"&userid="+this.props.userid, 
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
            .then(this.props._onClose(1))
    }

    render() {

        return(
            <Modal open={this.props.open}
                style={this.props.style}
                dimmer={'inverted'}>
                <Modal.Header>Activity #2 - Context Labelling Activity</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                    <Header as="h4">Target expression of the video: {this.props.targetExpression}</Header>
                        <Form>
                        <p className="form-instruction">
                            Based on your understanding of the video, please fill in the blanks or modify them if necessary.<br />
                            <b>Speaker</b> in questions, refer to the character that says the <i>target expression</i> in the video.
                        </p>
                        
                        <Form.Field>
                        <label>
                            {this.state.relationship_lst.length>0 
                                ? 
                                'Choose the best answer (submitted by other users) or add your own word that best describes the relationship between speakers.' 
                                : 
                                "Write a word that best describes the relationship between speakers?"
                            }
                            {/* <br />Note: If you think there are multiple <b>relationships</b>, try to think who the speaker is talking to. */}
                        </label>
                        {this.state.relationship_lst.length>0
                        ?
                            <List className="list-labels" horizontal relaxed>
                                {this.state.relationship_lst.map((id,i) => 
                                    <List.Item key={i}>
                                            <Radio
                                                label={id}
                                                name='relationship_label'
                                                onChange={(e,value) => this.setState({relationship_selected: value['value'],relationship: value['value']})}
                                                value={id}
                                                checked={this.state.relationship_selected === id}/>
                                    </List.Item>
                                    
                                )}
                                <List.Item>
                                    <div style={{display:'flex'}}>
                                            <Radio
                                                label="Other"
                                                name="relationship_label"
                                                value="Other"
                                                onChange={(e,value) => this.setState({
                                                    relationship_selected: value['value'],
                                                    relationship: value['value'],
                                                    })}
                                                checked={this.state.relationship_selected === 'Other'} />
                                            <Input 
                                                disabled={this.state.relationship_selected!=="Other"}
                                                className="input-short-text" 
                                                type="text" 
                                                size="tiny"
                                                onChange={(e,value) => 
                                                    this.setState({relationship: value['value']})
                                                }
                                                placeholder="e.g., friends, colleagues"/>
                                    </div>
                                </List.Item>
                            </List>
                        :
                        <Input 
                            className="input-short-text" 
                            type="text" 
                            size="small" 
                            onChange={(e,value) => this.setState({relationship: value['value']})}
                            placeholder="e.g., friends, colleagues"/>
                        }
                        </Form.Field>
                        <Form.Field>
                        <label>
                            {this.state.location_lst.length>0 
                                ? 
                                'Choose the best answer (submitted by other users) or add your own word that best describes the location of the scene.' 
                                : 
                                "Write a word that best describes the location of the scene?"
                            }
                        </label>
                        {this.state.location_lst.length>0
                        ?
                            <List className="list-labels" horizontal relaxed>
                                {this.state.location_lst.map((id,i) => 
                                    <List.Item key={i}>
                                        <div>
                                            <Radio
                                                label={id}
                                                name='location_label'
                                                onChange={(e,value) => this.setState({location_selected: value['value'],location: value['value']})}
                                                value={id}
                                                checked={this.state.location_selected === id}/>
                                        </div>
                                    </List.Item>
                                    
                                )}
                                <List.Item>
                                    <div style={{display:'flex'}}>
                                            <Radio
                                                label="Other"
                                                name="location_label"
                                                value="Other"
                                                onChange={(e,value) => this.setState({
                                                    location_selected: value['value'],
                                                    location: value['value'],
                                                    })}
                                                checked={this.state.location_selected === 'Other'} />
                                            <Input 
                                                disabled={this.state.location_selected!=="Other"}
                                                className="input-short-text" 
                                                type="text" 
                                                size="tiny"
                                                onChange={(e,value) => 
                                                    this.setState({location: value['value']})
                                                }
                                                placeholder="e.g., room, cafe, home"/>
                                    </div>
                                </List.Item>
                            </List>
                        :
                        <Input 
                            className="input-short-text" 
                            type="text" 
                            size="small" 
                            onChange={(e,value) => this.setState({location: value['value']})}
                            placeholder="e.g., room, cafe, home"/>
                        }
                        </Form.Field>
                        <Form.Field>
                        <label>
                        {this.state.emotion_lst.length>0 
                                ? 
                                'Choose the best answer (submitted by other users) or add your own word that best describes the emotion of the speaker.' 
                                : 
                                "Write a word that best describes the emotion of the speaker?"
                            }
                        </label>
                        {this.state.emotion_lst.length>0
                        ?
                            <List className="list-labels" horizontal relaxed>
                                {this.state.emotion_lst.map((id,i) => 
                                    <List.Item key={i}>
                                            <Radio
                                                label={id}
                                                name='emotion_label'
                                                onChange={(e,value) => this.setState({emotion_selected: value['value'],emotion: value['value']})}
                                                value={id}
                                                checked={this.state.emotion_selected === id}/>
                                    </List.Item>
                                    
                                )}
                                <List.Item>
                                    <div style={{display:'flex'}}>
                                            <Radio
                                                label="Other"
                                                name="emotion_label"
                                                value="Other"
                                                onChange={(e,value) => this.setState({
                                                    emotion_selected: value['value'],
                                                    emotion: value['value'],
                                                    })}
                                                checked={this.state.emotion_selected === 'Other'} />
                                            <Input 
                                                disabled={this.state.emotion_selected!=="Other"}
                                                className="input-short-text" 
                                                type="text" 
                                                size="tiny"
                                                onChange={(e,value) => 
                                                    this.setState({emotion: value['value']})
                                                }
                                                placeholder="e.g., happy, sad, angry"/>
                                    </div>
                                </List.Item>
                            </List>
                        :
                        <Input 
                            className="input-short-text" 
                            type="text" 
                            size="small" 
                            onChange={(e,value) => this.setState({emotion: value['value']})}
                            placeholder="e.g., happy, sad, angry"/>

                        }
                        </Form.Field>
                        <Form.Field>
                        <label>
                        {this.state.intention_lst.length>0 
                                ? 
                                'Choose the best answer (submitted by other users) or explain using your own words the intention of the speaker.' 
                                : 
                                "Explain in words, what is the intention of the speaker."
                            }
                        </label>
                        {this.state.intention_lst.length>0
                        ?
                            <div>
                                <List className="list-labels" horizontal relaxed>
                                    {this.state.intention_lst.map((id,i) => 
                                        <List.Item key={i}>
                                                <Radio
                                                    label={id}
                                                    name='intention_label'
                                                    onChange={(e,value) => this.setState({intention_selected: value['value'],intention: value['value']})}
                                                    value={id}
                                                    checked={this.state.intention === id}/>
                                        </List.Item>
                                        
                                    )}
                                    <List.Item>
                                        <Radio
                                            label="Other"
                                            name="intention_label"
                                            value="Other"
                                            onChange={(e,value) => this.setState({
                                                intention_selected: value['value'],
                                                intention: value['value'],
                                                })}
                                            checked={this.state.intention_selected === 'Other'} />
                                    </List.Item>
                                </List>
                                    <Input 
                                    disabled={this.state.intention_selected!=="Other"}
                                    type="text" 
                                    size="small"
                                    onChange={(e,value) => 
                                        this.setState({intention: value['value']})
                                    }
                                    placeholder="Remember that there is no single right answer for these types of questions."/>
                            </div>
                        :
                        <Input 
                            type="text" 
                            size="small" 
                            value={this.state.intention}
                            onChange={(e,value) => this.setState({intention: value['value']})}
                            placeholder="Remember that there is no single right answer for these types of questions."/>
                        }
                        </Form.Field>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    {/* <Checkbox label='I have read the instruction and understand what buttons are for.' 
                                onClick={() => this.setState({btnActive: !this.state.btnActive})}/> */}
                    <Button onClick={() => (this.props.rewatch(1))}>Rewatch</Button>
                    <Button onClick={this.handleSubmit}>Next</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

export default ActivitySnd;

