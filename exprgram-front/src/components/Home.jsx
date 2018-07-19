import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Segment, Container, Header, Button } from 'semantic-ui-react';
import Title from './Title/Title';
import './index.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videoList: []
        };
    }

    componentDidMount() {
        fetch('/fetchVideoList', {'Access-Control-Allow-Origin':'*'})
            // .then(res => console.log(res))
            .then(res => res.json())
            // .then((response) =>console.log(response))
            .then((result) => 
                this.setState({
                    videoList: result
                }))
    }

    render() {
        return(
            <div>
                <Title/>
                <Container className="container-videoList">
                    <Header as="h3" textAlign="center">
                        Hi, {this.props.match.params.userid}
                    </Header>
                    <Header textAlign="center">
                        Suggested Expressions
                    </Header>
                    <Header textAlign="center">
                        <Button className="choice-button" onClick={() => window.location.reload()}>
                            Click for New Suggestions
                        </Button>   
                        <Button className="choice-button">
                            Track My Progress
                        </Button> 
                    </Header>
                    {Object.keys(this.state.videoList).length>0 ? 
                        Object.keys(this.state.videoList).map((id,i) => 
                        (
                            <Link to={"/video/"+this.state.videoList[id][0]+"/"+parseInt(this.state.videoList[id][1]['start'],10)+
                            "/"+parseInt(this.state.videoList[id][1]['end'],10)+"/"+this.state.videoList[id][2]+"/"+this.state.videoList[id][3]+"/"+this.props.match.params.userid} key={i}>
                                <Segment className='segment-item-video' textAlign='center'>
                                    {id}
                                </Segment>
                            </Link>
                        )
                        )
                        :
                        ''
                    }
                </Container>
            </div>
        )
    }
}

export default Home;