
import React, { Component }  from 'react'
import { Dropdown, Container, Grid, Header, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


class AgentsHeader extends Component {

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
        <Grid.Column textAlign='left'>
          <Button basic
            floated="left" >
          <Link to='/principal'> Swith to Investor's Page </Link>
          </Button>
        </Grid.Column >
        <Grid.Column>
        <Header textAlign='center'> IOI Match - Brokers's Page Demo</Header>
        </Grid.Column>

        <Grid.Column textAlign='right'>
        <Container>
        <Dropdown selection
          placeholder='Broker'
          name='agent'
          options={this.agents()}
          onChange={this.handleChange}
          />
        </Container>

        </Grid.Column>
        </Grid.Row>
    </Grid>
    )
  }
}

export default AgentsHeader
