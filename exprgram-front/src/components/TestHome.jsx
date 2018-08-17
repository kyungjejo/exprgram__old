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
                <Link to={"/test/"+props.videoList[id].main[0]+"/"+parseInt(props.videoList[id].main[1]['start'],10)+
                    "/"+parseInt(props.videoList[id].main[1]['end'],10)+"/"+props.videoList[id].main[2]+"/"+props.videoList[id].main[3]+"/"+props.userid+"/a"} key={i}>
                    <Segment className='segment-item-video' textAlign='center'>
                        {props.videoList[id].main[1].sent}
                    </Segment>
                </Link>
            )
        )
        :
        ''
    )
}

class TestHome extends Component {
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

    render() {
        return(
            <div>
                <Title userid={this.props.match.params.userid}/>
                <Container className="container-videoList">
                    {this.props.match.params.userid==="exprgram123" ?
                        <Header textAlign="center" as="h4">
                            To use full features including customized progress history and avoiding from instruction appearing every time, please go to <a href="https://exprgram.kyungjejo.com">the link</a> and register your own account.
                        </Header>
                        :
                        ''
                    }
                    <Header textAlign="center">
                        Suggested Expressions
                    </Header>
                    <VideoList videoList={this.state.videoList} userid={this.props.match.params.userid}/>
                </Container>
            </div>
        )
    }
}

export default TestHome;