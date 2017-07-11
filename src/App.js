import React, { Component } from 'react'
import { Divider, Container, Grid } from 'semantic-ui-react'
import { Route } from 'react-router-dom'
import './App.css'
import PrincipalsPage from './containers/PrincipalsPage'
import AgentsPage from './containers/AgentsPage'
import About from './containers/About'


class App extends Component {

  render() {
    return (
    <Container>
      <Grid >
      <Grid.Row>
        <Divider />
      </Grid.Row>
      <Route path='/principal' component={PrincipalsPage} />
      <Route path='/agent' component={AgentsPage} />
      <Route path='/about' component={About} />

      </Grid>
    </Container>
    )
  }
}

export default App
