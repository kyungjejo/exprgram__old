import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';

import './Subtitle.css';

class Subtitle extends Component {
    render() {
        return (
            <div>
                <Header textAlign="center" color="orange">Subtitle</Header>
                <Segment.Group className="segment-group-subtitle">
                    <Segment>
                        Subtitle Segment
                    </Segment>
                    <Segment inverted color="orange">
                        Subtitle Segment
                    </Segment>
                    <Segment>
                        Subtitle Segment
                    </Segment>
                    <Segment>
                        Subtitle Segment
                    </Segment>
                    <Segment>
                        Subtitle Segment
                    </Segment>
                    <Segment>
                        Subtitle Segment
                    </Segment>
                    <Segment>
                        Subtitle Segment
                    </Segment>
                    <Segment>
                        Subtitle Segment
                    </Segment>
                    <Segment>
                        Subtitle Segment
                    </Segment>
                    <Segment>
                        Subtitle Segment
                    </Segment>
                </Segment.Group>
            </div>
        )
    }
}

export default Subtitle;