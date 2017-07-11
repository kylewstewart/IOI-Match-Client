
import React, { Component }  from 'react'
import { Dropdown, Container, Grid, Header, Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


class AboutHeader extends Component {

  handleChange = (e, {value}) => this.props.agentSubmit(value)

  agents = () => (
    this.props.agents.map(agent => {
      const obj = {key:`${agent.id}`, value:`${agent.id}`, text:`${agent.name}`}
      return obj
    }).sort((a, b) => a.text.localeCompare(b.text))
  )

  render(){

    return (
      <Grid>
        <Grid.Row columns={3} >
        <Grid.Column textAlign='center'>
          <Menu secondary>
            <Menu.Item name="About" active={true} as={Link} to='/about'/>
            <Menu.Item name="Investor" active={false} as={Link} to='/principal' />
            <Menu.Item name="Broker" active={false} as={Link} to='/agent' />
            <Menu.Item name="Algo" active={false} />
          </Menu>
        </Grid.Column >
        <Grid.Column>
        <Header textAlign='center' as='h1'> IOI Match</Header>
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

export default AboutHeader
