import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Container, Header, Button, Tab, Popup } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import {HOST_URL} from './common';
import Title from './Title/Title';
import HomeInstruction from './InstructionModal/HomeInstruction';
import './index.css';

function VideoList(props) {
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
                    position={id>1 ? "top right" : "bottom right"}
                    wide="very"
                    content={
                        <div>
                            <Header as="h4" textAlign="center">Related Expressions</Header>
                            {
                                <p>{props.videoList[id].main[1].sent}</p>
                            }
                            {
                                props.videoList[id].related.map((idx, j) =>
                                    j<6
                                    ?
                                    <p key={idx}>{props.videoList[id].related[j][1]['sent']}</p>
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
            Sorry, currently not available.<br />
            Help us! We need more responses from the activities to enable this feature.
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
        this.handleClose=this.handleClose.bind(this);
    }

    componentDidMount() { 
        if (this.props.match.params.userid==="exprgram123")
            this.setState({instructionModalState: true})
        // ReactGA.set({ userId: this.props.match.params.userid });
        fetch(HOST_URL+'/progressCheck?userid='+this.props.match.params.userid, {'Access-Control-Allow-Origin':'*'})
            .then(res => res.json())
            .then((result) =>
                sessionStorage.getItem('modal') === "true"
                ?
                this.setState({
                    instructionModalState: false
                })
                :
                this.setState({
                    instructionModalState: result['userid'] ? false : true
                })
            )
        fetch(HOST_URL+'/fetchVideoList?userid='+this.props.match.params.userid, {'Access-Control-Allow-Origin':'*'})
            .then(res => res.json())
            .then((result) => 
                this.setState({
                    videoList: result['videoList']
                }))
    }

    handleClose() {
        this.setState({instructionModalState: false});
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
                <HomeInstruction open={this.state.instructionModalState} close={this.handleClose}/>
                <Title userid={this.props.match.params.userid} onClick={() => this.setState({instructionModalState: true})}/>
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