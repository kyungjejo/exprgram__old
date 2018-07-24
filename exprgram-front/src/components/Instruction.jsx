import React, { Component } from 'react';

import Title from './Title/Title';

import { Container, Header, Icon, Step, Segment } from 'semantic-ui-react';
import { steps } from './common';

class Progress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectSegment: true,
            videoSegment: false,
            editSegment: false,
            infoSegment: false,
        }
        this.onClickActive = this.onClickActive.bind(this);
    }

    onClickActive(e) {
        let steps = document.getElementsByClassName('step');
        while (e.target.tagName !== 'A') {
            e.target = e.target.parentNode;
        }
        if (e.target.className.includes('active')) {
            for (let i=0; i<steps.length; i++) {
                steps[i].classList.remove('active');
            }
        }
        else {
            for (let j=0; j<steps.length; j++) {
                steps[j].classList.remove('active');
            }
            e.target.className += ' active';
            if (e.target.className.includes('select')) {
                this.setState({
                    selectSegment: true,
                    videoSegment: false,
                    editSegment: false,
                    infoSegment: false,
                })
            }
            else if (e.target.className.includes('video')) {
                this.setState({
                    selectSegment: false,
                    videoSegment: true,
                    editSegment: false,
                    infoSegment: false,
                })
            }
            else if (e.target.className.includes('edit')) {
                this.setState({
                    selectSegment: false,
                    videoSegment: false,
                    editSegment: true,
                    infoSegment: false,
                })
            }
            else if (e.target.className.includes('info')) {
                this.setState({
                    selectSegment: false,
                    videoSegment: false,
                    editSegment: false,
                    infoSegment: true,
                })
            }
        }

        // e.target.className.includes('active') ? e.target.classList.remove('active') : e.target.className+= ' active'}
    }

    render() {
        return(
            <div>
                <Title userid={this.props.match.params.userid}/>
                <Container>
                    <Header as='h2' textAlign="center">
                        Instruction
                    </Header>
                    <Step.Group attached='top'>
                        <Step className="active select" onClick={(e) => this.onClickActive(e)}>
                            <Icon name='mouse pointer' />
                            <Step.Content>
                                <Step.Title>Select Expression</Step.Title>
                                <Step.Description>Choose your expression and learn</Step.Description>
                            </Step.Content>
                        </Step>

                        <Step className="video" onClick={(e) => this.onClickActive(e)}>
                            <Icon name='youtube play' />
                            <Step.Content>
                                <Step.Title>Watch Video</Step.Title>
                                <Step.Description>Choose your expression and learn</Step.Description>
                            </Step.Content>
                        </Step>

                        <Step className="edit" onClick={(e) => this.onClickActive(e)}>
                            <Icon name='edit' />
                            <Step.Content>
                                <Step.Title>Do activities</Step.Title>
                                <Step.Description>Enter billing information</Step.Description>
                            </Step.Content>
                        </Step>

                        <Step className="info" onClick={(e) => this.onClickActive(e)}>
                            <Icon name='info' />
                            <Step.Content>
                                <Step.Title>Learn related expressions</Step.Title>
                            </Step.Content>
                        </Step>
                    </Step.Group>
                    <Segment attached style={{display: this.state.selectSegment ? 'block' : 'none'}}>
                        <Header>Select</Header>
                    </Segment>
                    <Segment attached style={{display: this.state.videoSegment ? 'block' : 'none'}}>
                        <Header>Video</Header>
                    </Segment>
                    <Segment attached style={{display: this.state.editSegment ? 'block' : 'none'}}>
                        <Header>Edit</Header>
                    </Segment>
                    <Segment attached style={{display: this.state.infoSegment ? 'block' : 'none'}}>
                        <Header>Info</Header>
                    </Segment>
                </Container>
            </div>
        )
    }
}

export default Progress;