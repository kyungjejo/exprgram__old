import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Container, Header, Button, Table, Tab, Popup } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import ReactGA from 'react-ga';
import Title from './Title/Title';
import HomeInstruction from './InstructionModal/HomeInstruction';
import './index.css';

function VideoList(props) {
    console.log(props.videoList);
    return (
        Object.keys(props.videoList).length>0 ? 
            Object.keys(props.videoList).map((id,i) => 
            (   
                <Popup
                    key={i}
                    trigger={
                        <Link to={"/video/"+props.videoList[id].main[0]+"/"+parseInt(props.videoList[id].main[1]['start'],10)+
                            "/"+parseInt(props.videoList[id].main[1]['end'],10)+"/"+props.videoList[id].main[2]+"/"+props.videoList[id].main[3]+"/"+props.userid} key={i}>
                            <Segment className='segment-item-video' textAlign='center'>
                                {props.videoList[id].topic}
                                {/* <br/>
                                Relationship:{"\t"}
                                Location:
                                Emotion: */}
                            </Segment>
                        </Link>
                    }
                    basic="false"
                    position={id>1 ? "right top" : "right bottom"}
                    wide="very"
                    content={
                        <div>
                            <Header as="h4" textAlign="center">Related Expressions</Header>
                            {
                                <p>{props.videoList[id].main[1].sent}</p>
                            }
                            {
                                props.videoList[id].related.map((idx, j) =>
                                    j<8
                                    ?
                                    <p key={i}>{props.videoList[id].related[j][1]['sent']}</p>
                                    :
                                    ''
                                )
                            }
                        </div>
                    }
                />
            )
        )
        :
        ''
    )
}

function ContextTab(props) {
    return (
        <Segment>
            Sorry, currently not available.
        </Segment>
    )
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoList: [],
            progress: false,
            insturction: false,
            instructionModalState: false,
        };
    }

    componentDidMount() { 
        // ReactGA.set({ userId: this.props.match.params.userid });
        fetch('/progressCheck?userid='+this.props.match.params.userid, {'Access-Control-Allow-Origin':'*'})
        .then(res => res.json())
        .then((result) =>
            this.setState({
                instructionModalState: result['userid'] ? false : true
            })
        )
        fetch('/fetchVideoList?userid='+this.props.match.params.userid, {'Access-Control-Allow-Origin':'*'})
            // .then(res => console.log(res))
            .then(res => res.json())
            // .then((response) =>console.log(response))
            .then((result) => 
                this.setState({
                    videoList: result
                }))
    }

    render() {
        if (this.state.progress) {
            return <Redirect push to={"/progress/"+this.props.match.params.userid} />;
        }

        if (this.state.instruction) {
            return <Redirect push to={"/instruction/"+this.props.match.params.userid} />;
        }
        
        const panes = [
            { menuItem: 'By Expressions', render: () => <Tab.Pane><VideoList videoList={this.state.videoList} userid={this.props.match.params.userid} /></Tab.Pane>},
            { menuItem: 'By Relationship', render: () => <Tab.Pane><ContextTab /></Tab.Pane>},
            { menuItem: 'By Location', render: () => <Tab.Pane><ContextTab /></Tab.Pane>},
            { menuItem: 'By Emotion', render: () => <Tab.Pane><ContextTab /></Tab.Pane>}
        ]
            
        return(
            <div>
                <HomeInstruction open={this.state.instructionModalState}/>
                <Title userid={this.props.match.params.userid}/>
                <Container className="container-videoList">
                    {/* <Header as="h3" textAlign="center">
                        <Button className="button-instruction" style={{width: 'auto'}} onClick={() =>this.setState({instruction: true})}>
                            Instructions
                        </Button>
                    </Header> */}
                    <Header textAlign="center">
                        Suggested Expressions
                    </Header>
                    <Tab panes={panes}>
                    </Tab>
                    {/* <Segment.Group attached="top">
                    {<VideoList videoList={this.state.videoList} userid={this.props.match.params.userid} />
                    }
                    </Segment.Group> */}
                    <Header textAlign="center">
                        <Button className="choice-button" onClick={() => window.location.reload()}>
                            Click for New Suggestions
                        </Button>   
                        <Button className="choice-button" onClick={() => this.setState({progress: true})}>
                            Track My Progress
                        </Button> 
                    </Header>
                </Container>
            </div>
        )
    }
}

export default Home;