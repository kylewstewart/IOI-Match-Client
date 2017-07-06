
import React, { Component }  from 'react'
import { Segment, Dropdown, Container, Grid, Header, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


class PrincipalsHeader extends Component {

  handleChange = (e, {value}) => this.props.principalSubmit(value)


  principals = () => (
    this.props.principals.map(principal => {
      const obj = {key:`${principal.id}`, value:`${principal.name}`, text:`${principal.name}`}
      return obj
    }).sort((a, b) => a.text.localeCompare(b.text))
  )

  render(){

    const pages = [
      {key: 1, value: 'principal', text: 'Investor Page'},
      {key: 2, value: 'agent', text: 'Broker Page'}
    ]

    return(
      <Grid>
        <Grid.Row columns={3} >
        <Grid.Column textAlign='left'>
          <Button basic
            floated="left"
            content="Swith to Broker's Page">
          <Link to='/agent'> Swith to Broker's Page </Link>
          </Button>
        </Grid.Column >
        <Grid.Column>
        <Header textAlign='center'> IOI Match - Investor's Page Demo </Header>
        </Grid.Column>

        <Grid.Column textAlign='right'>
        <Container>
        <Dropdown selection
          floated='left'
          placeholder='Investor'
          name='principal'
          options={this.principals()}
          onChange={this.handleChange}
          />
        </Container>

        </Grid.Column>
        </Grid.Row>
    </Grid>
    )
  }
}

export default PrincipalsHeader

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
