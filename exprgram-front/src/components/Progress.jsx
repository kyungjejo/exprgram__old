import React, { Component } from 'react';

import Title from './Title/Title';
import { Link } from 'react-router-dom';
import {HOST_URL} from './common';
import 'react-circular-progressbar/dist/styles.css';
import './index.css'

import { Container, Header, Table, Grid, Segment } from 'semantic-ui-react';

class Progress extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myProgress: [],
            leaderboard: [],
            progressGroups: [],
            count: 0,
            stat: [],
        }
        this.statGroup = this.statGroup.bind(this);
    }

    componentDidMount() {
        // ReactGA.set({ userId: this.props.match.params.userid });
        fetch(HOST_URL+'/progressCheck?userid='+this.props.match.params.userid, {'Access-Control-Allow-Origin':'*'})
            .then(res => res.json())
            .then((response) => 
                this.setState({
                    myProgress: response['userid'],
                    leaderboard: response['leaderboard'],
                    count: response['count'],
                    progressGroups: response['progressGroups'],
                    stat: this.statGroup(response['progressGroups'])
                })
            )

    }

    statGroup(progressGroups) {
        if (progressGroups && Object.keys(progressGroups).length>0){
            let arr = []
            for (let i=0; i<Object.keys(progressGroups).length; i++) {
                let key = Object.keys(progressGroups)[i]
                for (let j=0; j<progressGroups[key].length; j++) {
                    (progressGroups[key][j].watched === 1) ? 
                    arr.push({
                        'videoID': progressGroups[key][j].videoID,
                        'start': progressGroups[key][j].start,
                        'end': progressGroups[key][j].end,
                        'index': progressGroups[key][j].index,
                        'sent': progressGroups[key][j].sent,
                        'sentNum': progressGroups[key][j].sentNum,
                    }) 
                    : 
                    '';
                }
            }
            return arr;
        }
        // let count = 0;
        // for (let i=0; i<this.state.progressGroups[v].length; i++) {
        //     this.state.progressGroups[v][i].watched === 1 ? count+=1 : null
        // }
        // return (count+" "+this.state.progressGroups[v].length)
    }

    render() {
        return(
            <div>
                <Title userid={this.props.match.params.userid}/>
                <Container>
                    <Header as='h2' textAlign="center">
                        Check Your Progress
                    </Header>
                    <Grid columns={2} divided>
                        <Grid.Row>
                            <Grid.Column>
                                <Header as="h4" textAlign="center">
                                    Expressions that you've learned
                                </Header>
                                <Segment.Group style={{overflowY: 'scroll', height:520}}>
                                    {this.state.stat && Object.keys(this.state.stat).map((sent,i) =>
                                        <Segment key={i}>
                                            <Link to={"/video/"+this.state.stat[sent].videoID+"/"+parseInt(this.state.stat[sent].start,10)+
                                            "/"+parseInt(this.state.stat[sent].end,10)+"/"+this.state.stat[sent].sentNum+"/"+this.state.stat[sent].index+"/"+this.props.match.params.userid}>
                                                {this.state.stat[i].sent}
                                            </Link>
                                        </Segment>
                                    )}
                                </Segment.Group>
                            </Grid.Column>
                            <Grid.Column>
                                <Header as="h4" textAlign="center">
                                    Leaderboard
                                </Header>
                                <Table padded>
                                    <Table.Header>
                                        <Table.Row textAlign="center">
                                            <Table.HeaderCell>
                                                Ranking
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                User ID
                                            </Table.HeaderCell>
                                            <Table.HeaderCell>
                                                Number of Expressions
                                            </Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        {this.state.leaderboard && this.state.leaderboard.map((v,i) => 
                                            <Table.Row key={i} textAlign="center" className={v['userid']===this.props.match.params.userid ?  'row-active' : ''}>
                                                <Table.Cell>
                                                    {v['rank']}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {v['userid']}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {v['total']}
                                                </Table.Cell>                                
                                            </Table.Row>
                                        )}
                                        
                                    </Table.Body>

                                </Table>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </div>
        )
    }
}

export default Progress;