import React from 'react';
import { Header, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import "./Title.css";

const Title = (props) => (
  <div className='title-wrap'>
    <div className="header">
      <Link to={"/home/"+props.userid}><Header textAlign="center" className="title-text" size='huge'>Exprgram</Header></Link>
    </div>
    <Divider />
  </div>
)

export default Title