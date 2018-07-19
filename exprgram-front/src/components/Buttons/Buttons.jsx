import React, { Component } from 'react';

import { Button, Icon, Grid } from 'semantic-ui-react';
import ButtonModal from '../InstructionModal/ButtonModal';

class Buttons extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            style: {}
        })
    }

    componentDidMount() {
        const segment_subtitle = document.querySelector('.grid-buttons').getBoundingClientRect();
        this.setState({
            style: {
                top: segment_subtitle.bottom+segment_subtitle.height/4,
                left: segment_subtitle.left+segment_subtitle.width/4,
                position: 'absolute',
                width: 'auto',
            }
        })
    }

    render() {
        return(
            <Grid columns={2}>
                <Grid.Row>
                    <Grid.Column textAlign="center" className="grid-buttons">
                        {
                            (Object.keys(this.state.style).length > 0)
                            &&
                            <ButtonModal _onClose={this.props._onCloseModal}
                                open={this.props._openModal}
                                style={this.state.style}/>
                        }
                        {/* <Button icon labelPosition='left'onClick={() => 
                            this.props.target.seekTo(this.props.target.getCurrentTime()-5)
                        }>
                            <Icon name='step backward' />
                            -5 sec
                        </Button> */}
                        <Button icon labelPosition='left' onClick={
                                () => this.props.playing ? this.props._onPause() : this.props._onPlay()}>
                            <Icon name={this.props.playing? 'pause' : 'play'} />
                            {this.props.playing ? 'Pause' : 'Play'}
                        </Button>
                        {/* <Button icon labelPosition='right' onClick={() => 
                                this.props.target.seekTo(this.props.target.getCurrentTime()+5)
                            }>
                            +5 sec
                            <Icon name='step forward' />
                        </Button> */}
                    </Grid.Column>
                    <Grid.Column textAlign="center">
                            
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default Buttons;