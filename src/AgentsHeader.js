
import React, { Component }  from 'react'
import { Segment, Dropdown, Container, Grid, Header, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


class AgentsHeader extends Component {

  handleChange = (e, {value}) => this.props.agentSubmit(value)


  agents = () => (
    this.props.agents.map(agent => {
      const obj = {key:`${agent.id}`, value:`${agent.name}`, text:`${agent.name}`}
      return obj
    }).sort((a, b) => a.text.localeCompare(b.text))
  )

  render(){

    return (
      <Grid>
        <Grid.Row columns={3} >
        <Grid.Column textAlign='left'>
          <Button basic
            floated="left"
            content="Swith to Broker's Page">
          <Link to='/principal'> Swith to Investor's Page </Link>
          </Button>
        </Grid.Column >
        <Grid.Column>
        <Header textAlign='center'> IOI Match - Brokers's Page Demo</Header>
        </Grid.Column>

        <Grid.Column textAlign='right'>
        <Container>
        <Dropdown selection
          floated='left'
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

// this.setState({ principal: value })

// handleClick = () => this.props.principalSubmit(this.state.principal)
//
// constructor(){
//   super()
//   this.state = {
//     principal: ""
//   }
// }
// value={this.state.stock}

// <Button compact
//   floated='right'
//   content="submit"
//   onClick={this.handleClick}
//   />
