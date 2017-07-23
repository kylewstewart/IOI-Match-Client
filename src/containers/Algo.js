import React, { Component } from 'react'
import { Grid, Divider } from 'semantic-ui-react'
import { Adaptors } from '../Adaptors/index'

import AlgoHeader from '../AlgoComponents/AlgoHeader'
import AlgoMatches from '../AlgoComponents/AlgoMatches'
import AlgoMatch from '../AlgoComponents/AlgoMatch'
import AlgoRankedVoting from '../AlgoComponents/AlgoRankedVoting'
import AlgoMatchCommon from '../AlgoComponents/AlgoMatchCommon'

class Algo extends Component{
  constructor() {
    super()
    this.state = {
      matchStocks: null,
      match: null,
      common: null,
      rankedVoting: null
    }

    this.getMatchStocks = this.getMatchStocks.bind(this)
    this.getMatch = this.getMatch.bind(this)
  }

  getMatch = (id) => Adaptors.match(id).then(match => {
    this.setState({ match })
    this.getCommon(match)
  })

  getMatchStocks = () => Adaptors.matchStocks().then(matchStocks => this.setState({ matchStocks }))

  getCommon = (match) => Adaptors.common(match).then(common => {
    this.setState({ common })
    this.getRankedVoting(common)
  })


  getRankedVoting = (common) => {
    const { match } = this.state
    Adaptors.rankedVoting(common, match).then(rankedVoting => this.setState({ rankedVoting }))
  }

  render() {
    const { match, common, matchStocks, rankedVoting } = this.state

    return (
      <Grid container relaxed>
        <Grid.Row>
          <AlgoHeader />
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width='8'>
            <AlgoMatches
              matchStocks={matchStocks}
              onMount={this.getMatchStocks}
              getMatch={this.getMatch}
            />
            <Divider hidden />
            <AlgoMatch
              match={match}
            />
          </Grid.Column>
          <Grid.Column width='8'>
            <AlgoMatchCommon
              common={common}
            />
            <Divider hidden />
            <AlgoRankedVoting
              rankedVoting={rankedVoting}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

}

export default Algo
