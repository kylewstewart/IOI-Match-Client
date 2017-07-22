import React, { Component } from 'react'
import { Divider, Container, Grid } from 'semantic-ui-react'
import { Route, Redirect } from 'react-router-dom'
import './App.css'
import PrincipalsPage from './containers/PrincipalsPage'
import AgentsPage from './containers/AgentsPage'
import About from './containers/About'
import Algo from './containers/Algo'


class App extends Component {

  render() {
    return (
    <Container>
      <Grid >
        <Grid.Row></Grid.Row>
      <Grid.Row>
        <Divider />
      </Grid.Row>
      <Redirect from="/" to='/about' />
      <Route path='/principal' component={PrincipalsPage} />
      <Route path='/agent' component={AgentsPage} />
      <Route path='/about' component={About} />
      <Route path='/algo' component={Algo} />

      </Grid>
    </Container>
    )
  }
}

export default App
