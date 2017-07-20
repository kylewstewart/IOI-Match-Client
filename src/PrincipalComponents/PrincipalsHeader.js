
import React, { Component }  from 'react'
import { Dropdown, Container, Grid, Header, Menu } from 'semantic-ui-react'
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
        <Grid.Column width='5' textAlign='center'>
          <Menu secondary>
            <Menu.Item name="About" active={false} as={Link} to='/about'/>
            <Menu.Item name="Investor" active={true} as={Link} to='/principal' />
            <Menu.Item name="Broker" active={false} as={Link} to='/agent' />
            <Menu.Item name="Algo" active={false} as={Link} to='/algo' />
          </Menu>
        </Grid.Column >
        <Grid.Column width='6'>
        <Header textAlign='center' as='H1'> IOI Match </Header>
        </Grid.Column>

        <Grid.Column width='5' textAlign='center'>
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
