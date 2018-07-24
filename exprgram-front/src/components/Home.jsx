import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Container, Header, Button, Table, Tab } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
import Title from './Title/Title';
import './index.css';

function VideoList(props) {
    return (
        Object.keys(props.videoList).length>0 ? 
            Object.keys(props.videoList).map((id,i) => 
            (
                <Link to={"/video/"+props.videoList[id][0]+"/"+parseInt(props.videoList[id][1]['start'],10)+
                "/"+parseInt(props.videoList[id][1]['end'],10)+"/"+props.videoList[id][2]+"/"+props.videoList[id][3]+"/"+props.userid} key={i}>
                    <Segment className='segment-item-video' textAlign='center'>
                        {id}
                        {/* <br/>
                        Relationship:{"\t"}
                        Location:
                        Emotion: */}
                    </Segment>
                </Link>
            )
        )
        :
        ''
    )
}

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoList: [],
            progress: false,
            insturction: false,
        };
    }

    componentDidMount() {
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
            { menuItem: 'Expressions', render: () => <Tab.Pane><VideoList videoList={this.state.videoList} userid={this.props.match.params.userid} /></Tab.Pane>},
            { menuItem: 'Relationship'},
            { menuItem: 'Location'},
            { menuItem: 'Emotion'}
        ]
            
        return(
            <div>
                <Title userid={this.props.match.params.userid}/>
                <Container className="container-videoList">
                    <Header as="h3" textAlign="center">
                        <Button className="button-instruction" style={{width: 'auto'}} onClick={() =>this.setState({instruction: true})}>
                            Instructions
                        </Button>
                    </Header>
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