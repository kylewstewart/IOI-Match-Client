import React, { Component } from 'react'
import { Container, Grid } from 'semantic-ui-react'

import './App.css'
import Logo from './Logo'
import PrincipalsPage from './containers/PrincipalsPage'
import AgentsPage from './containers/AgentsPage'


class App extends Component {
  constructor() {
    super()
    this.state = {
      principal: true,
      id: 3
    }
  }
  render() {
    return (
    <Container>
    <Grid >
    <Grid.Row></Grid.Row>
    <Grid.Row>

    <Logo />

    </Grid.Row>

    { this.state.principal ? <PrincipalsPage id={this.state.id}/> : <AgentsPage id={this.state.id} /> }

    </Grid>
    </Container>
    )
  }
}

export default App
