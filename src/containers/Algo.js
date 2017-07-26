import React, { Component } from 'react'
import { Grid, Divider } from 'semantic-ui-react'
import { Adaptors } from '../Adaptors/index'

import AlgoHeader from '../AlgoHeader'
import AlgoMatches from '../AlgoMatches'
import AlgoMatch from '../AlgoMatch'
import AlgoRankedVoting from '../AlgoRankedVoting'
import AlgoMatchCommon from '../AlgoMatchCommon'

class Algo extends Component{
  constructor() {
    super()
    this.state = {
      matchStocks: [],
      match: [],
      common: [],
      rankedVoting: []
    }

    this.getMatchStocks = this.getMatchStocks.bind(this)
    this.getMatch = this.getMatch.bind(this)
  }

  getMatch = (id) => Adaptors.match(id)
      .then(match => {
        this.setState({match: !!match ? match : []})
        this.getCommon(match)
      })


  getMatchStocks = () => (
    Adaptors.matchStocks()
      .then(matchStocks => this.setState({matchStocks: !!matchStocks ? matchStocks : []}))
    )

  getCommon = (match) => Adaptors.common(match).then(common => {
    if (!common[0]){
      this.setState({common: [{id: 1, name: 'No Common Broker'}]})
      this.setState({rankedVoting: []})
    } else {
      this.setState({common})
      this.getRankedVoting(common)
    }
  })

  getRankedVoting = (common) => {
    const { match } = this.state
    Adaptors.rankedVoting(common, match)
      .then(rankedVoting => this.setState({ rankedVoting: !!rankedVoting ? rankedVoting : []}))
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
              match={match}
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
