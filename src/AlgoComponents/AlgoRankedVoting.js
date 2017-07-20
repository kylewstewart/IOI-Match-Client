import React, { Component } from 'react'
import { Segment, Header, Divider, Container } from 'semantic-ui-react'
import AlgoRankedVotingRound from './AlgoRankedVotingRound'

class AlgoRankedVoting extends Component{

  empty = () => ({canidates: ['-'], votes: ['-'], winner: '-', loser: '-'})

  rounds = () => !this.props.rankedVoting ? [false] : Object.keys(this.props.rankedVoting).sort((a, b) => a - b)

  lastRound = (round) => {
    if (!round) return true
    return round === this.rounds().slice(-1)[0] ? true : false
  }

  rankedVoting = (round) => !!round ? this.props.rankedVoting[round] : this.empty()

  render(){

    return(
      <Segment>
        <Header> Ranked Voting </Header>
        <Divider />
        { this.rounds().map(round => (
          <div key={round}>
            <Container>
              <Header> Round {round} </Header>
              <AlgoRankedVotingRound round={this.rankedVoting(round)}/>
            </Container>
            {this.lastRound(round) ? <div></div> : <Divider hidden />}
          </div>
        ))}

      </Segment>
    )

  }
}

export default AlgoRankedVoting
