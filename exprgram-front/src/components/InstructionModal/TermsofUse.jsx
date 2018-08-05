import React, { Component } from 'react';
import { Modal, Button, Image, Header, Loader, Segment, List, Checkbox } from 'semantic-ui-react';

class NestedModal extends Component {
    close = () => {
        this.setState({ open: false }),
        this.props.onClose('kyungjejo','kyungjejo@kaist.ac.kr')
    }
  
    render() {
      return (
        <Modal
          open={this.props.open}
          size='small'
        >
          <Modal.Content>
            <p>Thank you, feel free to use the site without participating.</p>
          </Modal.Content>
          <Modal.Actions>
              <Button content='Back' onClick={this.props.onSubClose}/>
              <Button content='Okay' onClick={this.close}/>
          </Modal.Actions>
        </Modal>
      )
    }
  }

class TermsofUse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            btnActive: false,
            agree: false,
            open: false,
        }
        this.onSubClose = this.onSubClose.bind(this);
        this.onBack = this.onBack.bind(this);
    }

    onSubClose() {
        this.setState({open: false});
    }

    onBack() {
        this.setState({open: true});
    }

    render() {
        return(
            <Modal 
                // className={"home-instruction"}
                open={this.props.open}
                style={this.state.style}
                dimmer={'inverted'}>
                <Modal.Header>
                    Terms of Use
                </Modal.Header>
                <Modal.Content>
                    <div>
                    <Header as="h4">This is a KAIST research experiment.</Header>
                    <p>This website consists of a video player that stops periodically to ask questions about the video being watched.</p>
                    <Header as="h5">Featured features:</Header>
                    <List bulleted> 
                    <List.Item>Watch videos that have been annotated and have an interactive timeline</List.Item>
                    <List.Item>Answer questions and vote on what other users have answered as you watch videos</List.Item>
                    </List>
                    <Header as="h5">User Study</Header>
                    The purpose of this study is to test how well our system can help learners to learn the usage of expressions in different situation. 
                    As you watch videos, we will record actions such as the answers you submit and videos you've watched. 
                    We also record your id to map data to your sessions. We may ask you for an interview later regarding your experience which you may choose not to participate.
                    You may revisit or remain on the site for as long as you’d like.
                    <Header as="h5">Requirements:</Header>
                    <List bulleted> 
                    <List.Item>You must be at least 18 years old.</List.Item>
                    <List.Item>You understand that you use this website at your own risk.</List.Item>
                    </List>
                    <Header as="h5">Guarantees:</Header>
                    <List bulleted> 
                    <List.Item>Your participation is voluntary. You may abandon this study at any time.</List.Item>
                    <List.Item>Your personal information will never be sent to researchers.</List.Item>
                    <List.Item>All your information submitted on registration will not be used for any non-research purpose.</List.Item>
                    <List.Item>Please email kyungjejo@kaist.ac.kr with any concerns or questions.</List.Item>
                    </List>
                    <Checkbox label="I agree with terms and conditions." onChange={(e,value) => value['checked'] ? this.setState({agree: true}) : this.setState({agree:false})}></Checkbox>
                    </div>
                </Modal.Content>
                <Modal.Actions>
                    <NestedModal open={this.state.open} onClose={this.onSubClose} onClose={this.props.onClose}/>
                    <Button onClick={this.onBack}>Close</Button>
                    <Button onClick={() => this.props.onClose()} disabled={!this.state.agree}>Agree</Button>
                </Modal.Actions>
                {/* <Popup.Header>Instruction</Popup.Header>
                <Popup.Actions>
                    
                </Popup.Actions> */}
            </Modal>
        )
    }
}

export default TermsofUse;

