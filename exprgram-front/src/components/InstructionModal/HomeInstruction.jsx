import React, { Component } from 'react';
import { Popup, Checkbox, Button } from 'semantic-ui-react';

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
        console.log(dropdown_expressions);
        this.setState({
            style: {
                top: dropdown_expressions.top,
                left: dropdown_expressions.left,
                minWidth: dropdown_expressions.width,
                minHeight: dropdown_expressions.height,
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
                        <p>In Exprgram, you will learn how expressions with similar meanings are used in various context.</p>
                        <div style={{textAlign: 'center'}}>
                        <img 
                            style={{maxWidth: '70%', maxHeight: '70%'}}
                            src="https://github.com/kyungjejo/exprgram/raw/master/backend/static/homeview.png" />
                        </div>
                        <p>1-1. In this page, start from choosing any of the five suggested expressions.</p>
                        <p>1-2. You can get a new list of expressions by clicking 'Click for New Suggestions' on the bottom.</p>
                        <p>2. If you click one of the expression, you will be directed to a video watching page.</p>
                        <p>3. You can check your progress by clicking 'Track My Progress' on the bottom.</p>
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

