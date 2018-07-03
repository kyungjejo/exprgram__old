import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';

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
            .then((result) => 
                this.setState({
                    videoList: result
                }))
    }

    render() {
        return(
            <div>
                {Object.keys(this.state.videoList).length>0 ? 
                    Object.keys(this.state.videoList).map((id,i) => 
                    (
                        <Segment key={i}>
                            <Link to={"/video/"+id+"/"+this.state.videoList[id][0]+"/"+this.state.videoList[id][1]}>{id}</Link>
                        </Segment>
                    )
                    )
                    :
                    ''
                }
                {console.log(this.state.videoList)}
            </div>
        )
    }
}

export default Home;