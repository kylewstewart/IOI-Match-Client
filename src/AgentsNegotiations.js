import React, { Component } from 'react'
import { Segment, Table, Header, Button } from 'semantic-ui-react'

class AgentsNegotiations extends Component {

  handleClick = () => this.props.getNegotiations(this.props.agent)

  negotiations = (status) => {
    const blank = [{
      id: 1,
      exch_code: '-',
      active: '-'
      }]

    if (!this.props.negotiations || !this.props.negotiations.length) return blank
    const negotiations = this.props.negotiations.filter(neg => neg.active === status)
    if (!negotiations.length) return blank
    const sorted_negotiations = negotiations.sort((a, b) => a.exch_code.localeCompare(b.exch_code))
    return sorted_negotiations
  }

  render() {

    return (
      <Segment.Group>
        <Segment clearing>
          <Header floated='left'> Negotiations </Header>
          <Button basic
            disabled={!this.props.agent}
            floated='right' icon='refresh'
            onClick={this.handleClick} />
        </Segment>
        <Segment>
          <Header textAlign='left' as='h5'>
            Active
          </Header>
          <Table compact >
            <Table.Header></Table.Header>
            <Table.Body>
            {this.negotiations('Active').map(negotiation => (
              <Table.Row key={negotiation.id}>
                <Table.Cell textAlign='center'> {negotiation.exch_code} </Table.Cell>
                <Table.Cell textAlign='center'> {negotiation.active} </Table.Cell>
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
            <Table.Header></Table.Header>
            <Table.Body>
            {this.negotiations('Completed').map(negotiation => (
              <Table.Row key={negotiation.id}>
                <Table.Cell textAlign='center'> {negotiation.exch_code} </Table.Cell>
                <Table.Cell textAlign='center'> {negotiation.active} </Table.Cell>
              </Table.Row>
            ))}
            </Table.Body>
          </Table>
        </Segment>
      </Segment.Group>
    )
  }

}

export default AgentsNegotiations
