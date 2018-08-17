import React from 'react';
import { Redirect } from 'react-router-dom';
import { Modal, Input, Button, Icon, Label } from '../../../node_modules/semantic-ui-react';
import './index.css';

class NestedModal extends React.Component {
    state = {redirect: false}
    close = () => {
        this.setState({ open: false })
        this.setState({ redirect: true })
        this.props.onClose(this.props.rewatchIdx);
    }
  
    render() {
        if ( this.state.redirect)
            return <Redirect push to={"/test/"+this.props.videoId+"/"+parseInt(this.props.start,10)+
                "/"+parseInt(this.props.end,10)+"/"+this.props.number+"/"+
                this.props.sentNumber+"/"+this.props.userid+"/b"} />
        return (
            <Modal
            open={this.props.open}
            size='small'
            >
            <Modal.Content>
                <p>Now you will watch the same video again.</p>
                <p>But this time, you will be asked to complete more activities.</p>
            </Modal.Content>
            <Modal.Actions>
                <Button content='Proceed' onClick={this.close}/>
            </Modal.Actions>
            </Modal>
        )
    }
  }

export default class TestActivityA extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: [0,1,2],
            rewatchIdx: 0,
            expressions: ['','',''],
            subModal: false,
            redirect: false
        }
        this.onClick = this.onClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.setState({
            rewatchIdx: this.props.type==='a' ? 0 : 4
        })
    }

    handleSubmit = () => {
        if (this.props.type === 'a')
            this.setState({subModal: true});
        else {
            this.setState({redirect: true});
        }
    //     fetch(HOST_URL+"/activityResponse?number="+3+"&sentNumber="+this.props.sentNumber+"&userid="+this.props.userid, 
    //     {
    //         method: 'POST',
    //         'Access-Control-Allow-Origin':'*',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             similar_expressions: this.state.verified,
    //             similar_expressions_user: this.state.verfied_user,
    //             original_expressions: this.state.similar,
    //             original_expressions_user: this.state.user_similar,
    //         })
    //     }
    // )
    // .then(this.props.type === 'b' ? '' : this.setState({redirect:true}))
    // .then(this.props._onClose(3))
    }

    onChange = (e,idx) => {
        let _expr = this.state.expressions.slice();
        _expr[idx] = e.target.value;
        this.setState({
            expressions: _expr
        }, () => console.log(this.state.expressions));
    }

    onClick = () => {
        let _inputs = this.state.inputs.slice();
        _inputs.push(_inputs.length);
        let _exprs = this.state.expressions.slice();
        _exprs.push('');
        this.setState({
            inputs: _inputs,
            expressions: _exprs
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect push to={"/test/"+this.props.videoId+"/"+parseInt(this.props.start,10)+
                "/"+parseInt(this.props.end,10)+"/"+this.props.number+"/"+
                this.props.sentNumber+"/"+this.props.userid+"/b"} />
        }
        return (
            <Modal open={this.props.open}
                style={this.props.style}
                dimmer={'inverted'}>
                <Modal.Header>Quiz - Write Replaceable Expressions</Modal.Header>
                <Modal.Content>
                    <p>Write as many expressions as possible that are similar to "<b>{this.props.targetExpression}</b>"</p>
                    {
                        this.state.inputs.map((val, idx) =>
                            <Input className="margin-small" 
                                labelPosition='left'
                                name="expressions" 
                                key={idx} 
                                type="text" 
                                placeholder="Press + button to write more expressions"
                                fluid>
                                <Label basic>{idx+1}</Label>
                                    <input onChange={((e) => this.onChange(e,idx))}/>
                            </Input>
                        )
                    }
                    <Button onClick={this.onClick}>Click here to add more expressions</Button>
                </Modal.Content>
                <Modal.Actions>
                    <NestedModal {...this.props} open={this.state.subModal} onClose={this.props._onCloseModal} rewatchIdx={this.state.rewatchIdx}/>
                    <Button onClick={() => (this.props.rewatch(this.state.rewatchIdx))} primary>Rewatch</Button>
                    <Button onClick={this.handleSubmit} positive>Submit</Button>
                </Modal.Actions>
            </Modal>
        )
    }
}