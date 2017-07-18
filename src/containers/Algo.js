import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import { Adaptors } from '../Adaptors/index'

import AlgoHeader from '../AlgoHeader'
import AlgoMatches from '../AlgoMatches'

class Algo extends Component{
  constructor() {
    super()
    this.state = {
      matchStocks: null
    }
    this.getMatchStocks = this.getMatchStocks.bind(this)
    this.getMatch = this.getMatch.bind(this)
  }

  getMatch = (id) => Adaptors.match(id).then(match => console.log())

  getMatchStocks = () => Adaptors.matchStocks().then(matchStocks => this.setState({ matchStocks }))

  render() {
    return (
      <Grid container relaxed>
        <Grid.Row>
          <AlgoHeader />
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width='8'>
            <AlgoMatches
              matchStocks={this.state.matchStocks}
              onMount={this.getMatchStocks}
              getMatch={this.getMatch}
            />
          </Grid.Column>
          <Grid.Column width='8'> </Grid.Column>
        </Grid.Row>
        <div> Negotations: </div>
      </Grid>
    )
  }

}

export default Algo
