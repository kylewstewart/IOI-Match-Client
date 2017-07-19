import React, { Component } from 'react'
import { Grid, Divider } from 'semantic-ui-react'
import { Adaptors } from '../Adaptors/index'

import AlgoHeader from '../AlgoComponents/AlgoHeader'
import AlgoMatches from '../AlgoComponents/AlgoMatches'
import AlgoMatch from '../AlgoComponents/AlgoMatch'

class Algo extends Component{
  constructor() {
    super()
    this.state = {matchStocks: null, match: null, common: null}
    this.getMatchStocks = this.getMatchStocks.bind(this)
    this.getMatch = this.getMatch.bind(this)
  }

  getMatch = (id) => Adaptors.match(id).then(match => {
    this.setState({ match })
    this.getCommon(match)
  })

  getMatchStocks = () => Adaptors.matchStocks().then(matchStocks => this.setState({ matchStocks }))

  getCommon = (match) => Adaptors.common(match).then(common => this.setState({ common }))

  render() {
    const { match, common, matchStocks } = this.state

    return (
      <Grid container relaxed>
      <Grid.Row>
    <AlgoHeader />
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column width='8'>
            <AlgoMatches matchStocks={matchStocks} onMount={this.getMatchStocks} getMatch={this.getMatch} />
            <Divider hidden />
            <AlgoMatch match={match} common={common} />
        </Grid.Column>
      <Grid.Column width='8'> </Grid.Column>
      </Grid.Row>
      </Grid>
    )
  }

}

export default Algo
