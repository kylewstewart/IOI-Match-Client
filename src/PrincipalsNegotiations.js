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

  render() {

    return (
      <Container>
        <Segment.Group>
          <Segment clearing>
        <Header floated='left'> Negotiations </Header>
        <Button basic
          disabled={!this.props.principal}
          floated='right' icon='refresh'
          onClick={this.handleClick} />
        </Segment>
        <Segment>
        <Header textAlign='left' as='h5'>
          Active
        </Header>
        <Table compact >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign='center'> Stock </Table.HeaderCell>
              <Table.HeaderCell textAlign='center'> Agent </Table.HeaderCell>
              <Table.HeaderCell textAlign='center'> Status </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
          {this.negotiations('Active').map(negotiation => (
            <Table.Row key={negotiation.id}>
              <Table.Cell textAlign='center'> {negotiation.exch_code} </Table.Cell>
              <Table.Cell textAlign='center'> {negotiation.agent_name} </Table.Cell>
              <Table.Cell textAlign='center'> {negotiation.active} </Table.Cell>
              <Table.Cell textAlign='center'> </Table.Cell>
            </Table.Row>
          ))}
          </Table.Body>
        </Table>
        </Segment>
        <Segment>
        <Header textAlign='left' as='h5'>
          Completed
        </Header>
        <Table compact textAlign='center'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign='center'> Stock </Table.HeaderCell>
              <Table.HeaderCell textAlign='center'> Agent </Table.HeaderCell>
              <Table.HeaderCell textAlign='center'> Status </Table.HeaderCell>
              <Table.HeaderCell textAlign='center'> Rating </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
          {this.negotiations('Completed').map(negotiation => (
            <Table.Row key={negotiation.id}>
              <Table.Cell textAlign='center'> {negotiation.exch_code} </Table.Cell>
              <Table.Cell textAlign='center'> {negotiation.agent_name} </Table.Cell>
              <Table.Cell textAlign='center'> {negotiation.active} </Table.Cell>
              <Table.Cell textAlign='center'>
                <NegotiationRating
                  rating={negotiation.rating}
                  updateRating={this.props.updateRating}
                  id={this.props.principal}
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
