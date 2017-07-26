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
        <Header
          content='Ranked Voting'
          />
        <Divider />
        {this.rounds().map(round => (
          <Container key={round}>
            <Segment basic>
              <Header as='h4'> Round {round} </Header>
              <AlgoRankedVotingRound
                round={this.rankedVoting(round)}
                />
            </Segment>
            {this.lastRound(round) ? null: <Divider hidden />}
          </Container>
        ))}

      </Segment>
    )

  }
}

export default AlgoRankedVoting
