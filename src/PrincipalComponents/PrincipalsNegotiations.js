import React, { Component } from 'react'
import { Segment, Container, Header, Button } from 'semantic-ui-react'

import CompletedNegotiations from './CompletedNegotiations'
import ActiveNegotiations from './ActiveNegotiations'

class PrincipalsNegotiations extends Component {

  handleClick = () => this.props.getNegotiations(this.props.principal)

  negotiations = (status) => {
    const blank = [ {id: 1, exch_code: '-', agent_name: '-', active: '-', rating: null} ]
    if (!this.props.negotiations || !this.props.negotiations.length) return blank
    const negotiations = this.props.negotiations.filter(neg => neg.active === status)
    if (!negotiations.length) return blank
    return negotiations
  }

  render() {

    return (
      <Container>
        <Segment.Group>
          <Segment clearing>
            <Header floated='left'> Negotiations </Header>
            <Button disabled={!this.props.principal} floated='right' icon='refresh' onClick={this.handleClick} />
          </Segment>
          <Segment>
            <Header textAlign='left' as='h5'> Active </Header>
            <ActiveNegotiations negotiations={this.negotiations('Active')} />
          </Segment>
          <Segment>
            <Header textAlign='left' as='h5'> Completed </Header>
            <CompletedNegotiations negotiations={this.negotiations('Completed')} updateRating={this.props.updateRating}
              principal={this.props.principal} ratings={this.props.ratings} />
        </Segment>
        </Segment.Group>
      </Container>
    )
  }
}

export default PrincipalsNegotiations
