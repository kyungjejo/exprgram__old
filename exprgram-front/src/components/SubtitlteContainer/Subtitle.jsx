import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';

import './Subtitle.css';

class Subtitle extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Header textAlign="center" color="orange">Subtitle</Header>
                <Segment.Group className="segment-group-subtitle">
                    {Object.keys(this.props.subtitle).length > 0
                    ?
                    Object.keys(this.props.subtitle).map((id,i) =>
                    this.props.activeSentence>=4 && this.props.activeSentence>i-4 && this.props.activeSentence<i+4
                    ?
                        <Segment key={id} 
                                start={this.props.subtitle[id].start} 
                                end={this.props.subtitle[id].end}
                                color={this.props.activeSentence===i ? 'orange' : 'grey'}
                                inverted={this.props.activeSentence===i ? true : false}
                                >
                            {this.props.subtitle[id].sent}
                        </Segment>
                    :
                    (
                        this.props.activeSentence<4 && i<7 ?
                            <Segment key={id} 
                                start={this.props.subtitle[id].start} 
                                end={this.props.subtitle[id].end}
                                color={this.props.activeSentence===i ? 'orange' : 'grey'}
                                inverted={this.props.activeSentence===i ? true : false}
                                >
                            {this.props.subtitle[id].sent}
                             </Segment>
                        :
                        ''
                    )
                    )
                    :
                    ''
                    }                    
                </Segment.Group>
            </div>
        )
    }
}

export default Subtitle;