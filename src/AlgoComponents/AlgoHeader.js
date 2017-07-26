
import React, { Component }  from 'react'
import { Container, Grid, Header, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


class AlgoHeader extends Component {

  render(){

    return (
      <Grid>
        <Grid.Row columns={3} >
          <Grid.Column textAlign='center'>
            <Menu secondary>
              <Menu.Item name="About" active={false} as={Link} to='/about'/>
              <Menu.Item name="Investor" active={false} as={Link} to='/principal' />
              <Menu.Item name="Broker" active={false} as={Link} to='/agent' />
              <Menu.Item name="Algo" active={true} as={Link} to='/algo' />
            </Menu>
          </Grid.Column >
          <Grid.Column>
            <Header
              textAlign='center'
              as='h1'
              content='IOI Match'
              />
          </Grid.Column>
          <Grid.Column textAlign='center'>
            <Container>
              <Header />
            </Container>
          </Grid.Column>
        </Grid.Row>
    </Grid>
    )
  }
}

export default AlgoHeader
