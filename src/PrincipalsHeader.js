
import React, { Component }  from 'react'
import { Dropdown, Container, Grid, Header, Button } from 'semantic-ui-react'
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

    return(
      <Grid>
        <Grid.Row columns={3} >
        <Grid.Column textAlign='left'>
          <Button basic>
          <Link to='/agent'> Swith to Broker's Page </Link>
          </Button>
        </Grid.Column >
        <Grid.Column>
        <Header textAlign='center'> IOI Match - Investor's Page Demo </Header>
        </Grid.Column>

        <Grid.Column textAlign='right'>
        <Container>
        <Dropdown selection
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
