
import React, { Component }  from 'react'
import { Dropdown, Container, Grid, Header, Button } from 'semantic-ui-react'



class PrincipalsHeader extends Component {
  constructor(){
    super()
    this.state = {
      principal: ""
    }
  }

  handleChange = (e, {value}) => this.setState({ principal: value })

  handleClick = () => this.props.principalSubmit(this.state.principal)

  principals = () => (
    this.props.principals.map(principal => {
      const obj = {key:`${principal.id}`, value:`${principal.name}`, text:`${principal.name}`}
      return obj
    }).sort((a, b) => a.text.localeCompare(b.text))
  )

  render(){

    return(
      <Container>
        <Grid>
          <Grid.Row columns={3} >
            <Grid.Column textAlign='left'>
              <Button basic as='H4'>
                Investor Page: Demo Mode
              </Button>
            </Grid.Column >

            <Grid.Column>
              <Header textAlign='center' as='H2'>
                IOI Match
              </Header>
            </Grid.Column>
            <Grid.Column textAlign='right'>
              <Dropdown search selection
                value={this.state.stock}
                placeholder='Investor'
                name='principal'
                options={this.principals()}
                onChange={this.handleChange}
                />
              <Button compact
                content="submit"
                onClick={this.handleClick}
                />


            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

export default PrincipalsHeader
