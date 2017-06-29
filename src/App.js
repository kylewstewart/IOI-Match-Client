import React, { Component } from 'react'
import { Container, Grid } from 'semantic-ui-react'

import './App.css'
import PrincipalsPage from './containers/PrincipalsPage'
import Logo from './Logo'


class App extends Component {
  render() {
    return (
      <Container>
        <Grid >
          <Grid.Row></Grid.Row>
          <Grid.Row>
            <Logo />
          </Grid.Row>
          <Grid.Row>
            <PrincipalsPage />
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

export default App
