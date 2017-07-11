import React, { Component } from 'react'
import { Segment, Container, Table, Header, Button } from 'semantic-ui-react'

import NegotiationRating from './NegotiationRating'

class PrincipalsNegotiations extends Component {

  handleClick = () => this.props.getNegotiations(this.props.principal)

  negotiations = (status) => {
    const blank = [ {id: 1, exch_code: '-', agent_name: '-', active: '-', rating: null} ]
    if (!this.props.negotiations || !this.props.negotiations.length) return blank
    const negotiations = this.props.negotiations.filter(neg => neg.active === status)
    if (!negotiations.length) return blank
    return negotiations.sort((a, b) => a.exch_code.localeCompare(b.exch_code))
  }

  rating = (negID) => {
    if (!this.props || !this.props.ratings[0]) return 0
    const rating = this.props.ratings.filter(rating => rating.neg_id === negID)
    return !rating[0] ? 0 : rating[0].rating
  }

  render() {

    return (
      <Container>
        <Segment.Group>
          <Segment clearing>
        <Header floated='left'> Negotiations </Header>
        <Button 
          disabled={!this.props.principal}
          floated='right' icon='refresh'
          onClick={this.handleClick} />
        </Segment>
        <Segment>
        <Header textAlign='left' as='h5'>
          Active
        </Header>
        <Table >
          <Table.Header>
            <Table.Row >
              <Table.HeaderCell textAlign='center'> Stock </Table.HeaderCell>
              <Table.HeaderCell textAlign='center'> Agent </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
          {this.negotiations('Active').map(negotiation => (
            <Table.Row key={negotiation.id}>
              <Table.Cell textAlign='center'> {negotiation.exch_code} </Table.Cell>
              <Table.Cell textAlign='center'> {negotiation.agent_name} </Table.Cell>
            </Table.Row>
          ))}
          </Table.Body>
        </Table>
        </Segment>
        <Segment>
        <Header textAlign='left' as='h5'>
          Completed
        </Header>
        <Table >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign='center'> Stock </Table.HeaderCell>
              <Table.HeaderCell textAlign='center'> Agent </Table.HeaderCell>
              <Table.HeaderCell textAlign='center'> Rating </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
          {this.negotiations('Completed').map(negotiation => (
            <Table.Row key={negotiation.id}>
              <Table.Cell textAlign='center'> {negotiation.exch_code} </Table.Cell>
              <Table.Cell textAlign='center'> {negotiation.agent_name} </Table.Cell>
              <Table.Cell textAlign='center'>
                <NegotiationRating
                  updateRating={this.props.updateRating}
                  prinID={this.props.principal}
                  negID={negotiation.id}
                  rating={this.rating(negotiation.id)}
                  />
              </Table.Cell>
            </Table.Row>
          ))}
          </Table.Body>
        </Table>
        </Segment>
        </Segment.Group>
      </Container>
    )
  }
}

export default PrincipalsNegotiations
