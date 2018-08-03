import React from 'react';
import { Table, Header, Divider, Button, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import "./Title.css";

const Title = (props) => (
  <div className='title-wrap'>
    <Table columns={3} style={{margin: '0'}}>
      <Table.Body>
        <Table.Row>
          <Table.Cell className="title-background">
            <Link to={"/home/"+props.userid} className="title-text">
              <Button style={{background:"#005874"}}>
                <Icon name="home" size="large" style={{color:"#feff89"}} fitted/>
              </Button>
            </Link>
          </Table.Cell>
          <Table.Cell className="title-background">
            <Header textAlign="center" size='huge'>
              <Link to={"/home/"+props.userid} className="title-text">Exprgram</Link>
            </Header>
          </Table.Cell>
          <Table.Cell textAlign="right" className="title-background">
            {
              props.onClick
              ?
              <Button primary onClick={props.onClick}>
                Instructions  
              </Button>
              :
              ''
            }
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  </div>
)

export default Title