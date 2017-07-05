import React, { Component } from 'react'
import { Divider, Container, Grid } from 'semantic-ui-react'

import './App.css'
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
      <Grid.Row>
        <Divider />
      </Grid.Row>

      { this.state.principal ? <PrincipalsPage id={this.state.id}/> : <AgentsPage id={this.state.id} /> }

      </Grid>
    </Container>
    )
  }
}

export default App
