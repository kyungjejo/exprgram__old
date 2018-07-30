import React, { Component } from 'react';
import { Popup, Checkbox, Button, Image, Header } from 'semantic-ui-react';

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

    componentDidMount() {
        const dropdown_expressions = document.querySelector('.container-videoList').getBoundingClientRect();
        this.setState({
            style: {
                top: dropdown_expressions.top,
                left: dropdown_expressions.left-parseInt(dropdown_expressions.left/4*1,10),
                minWidth: dropdown_expressions.width,
                minHeight: dropdown_expressions.height,
                maxWidth: dropdown_expressions.width+(dropdown_expressions.left-parseInt(dropdown_expressions.left/4*3,10))*2,
                position: 'absolute',
            }
        })
    }

    onClose() {
        this.setState({open: false})
    }

    render() {
        return(
            <Popup 
                className={"home-instruction"}
                open={this.props.open && this.state.open}
                style={this.state.style}
                wide="very"
                content={ 
                    <div>
                        <Header as="h3" textAlign="center">How to use Exprgram</Header>
                        <p>In Exprgram, you will watch YouTube videos to learn how similar expressions are used in different contexts.</p>
                        <div style={{textAlign: 'center'}}>
                            <Image 
                                style={{maxWidth: '70%', maxHeight: '70%'}}
                                centered
                                src="http://drive.google.com/uc?export=view&id=1OWUoDK8_nE4ZySB4AWyuMUzxsbMvIqcg" />
                        </div>
                        <Header as="h3" textAlign="center">Instruction</Header>
                        <p>1. In this page, you can start with any of five expressions.</p>
                        <p>1-1. By hovering an expression, you can see a list of expressions you will learn.</p>
                        <p>2. You can get a new list of expressions by clicking 'Click for New Suggestions' on the bottom.</p>
                        <p>3. You can check your progress by clicking 'Track My Progress' on the bottom.</p>
                        <p>4. At each end of a video, you will be asked to complete activities.</p>
                        <p>4-1. Your responses will allow us to provide expressions by context (e.g., relationship, location, and emotion).</p>
                        <Button  floated="right" onClick={this.onClose}>Close</Button>
                    </div>
                }
                dimmer={'inverted'}>
                {/* <Popup.Header>Instruction</Popup.Header>
                <Popup.Actions>
                    
                </Popup.Actions> */}
            </Popup>
        )
    }
}

export default HomeInstruction;

