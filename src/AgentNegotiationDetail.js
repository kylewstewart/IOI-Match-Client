import React, { Component } from 'react'
import { Table, Checkbox, Segment, Header } from 'semantic-ui-react'

class AgentNegotiationDetail extends Component {
  constructor(){
    super()
    this.state = {
      negotiation: '',
      negotiationPrincipals: []
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({ negotiation: nextProps.negotiation })
    this.setState({ negotiationPrincipals: nextProps.negotiationPrincipals })
  }

  negotiation = () => {
    const blank = { active: '-', exch_code: '-', traded: '-' }
    if (!this.state.negotiation) return blank
    return this.state.negotiation
  }

  principals = (side) => {
    const blank = [{id: 1, name: '-', side: '-', traded: false}]
    if (!this.state.negotiationPrincipals) return blank
    return this.state.negotiationPrincipals.filter(np => np.side === side)
  }

  render(){
    const negotiation = this.negotiation()
    return(
      <Segment.Group>
        <Segment>
          <Header> Negotiation </Header>
        </Segment>
        <Segment>
          <Table fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign='center'> Stock: </Table.HeaderCell>
                <Table.HeaderCell textAlign='left'>
                  <Header>
                    {negotiation.exch_code}
                  </Header>
                </Table.HeaderCell>
                <Table.HeaderCell textAlign='center'> Status: </Table.HeaderCell>
                <Table.HeaderCell textAlign='left'>
                  <Header as='h3'>
                    {negotiation.active}
                  </Header>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body></Table.Body>
          </Table>
        </Segment>
        <Segment>
          <Header as='h5' > Buyers </Header>
        <Table fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign='left'> Principal </Table.HeaderCell>
              <Table.HeaderCell textAlign='center'> Traded </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.principals('Buy').map(principal => (
              <Table.Row key={principal.id}>
                <Table.Cell textAlign='left'>{principal.name}</Table.Cell>
                <Table.Cell textAlign='center'>
                  <Checkbox onClick checked={principal.traded} />
                </Table.Cell>

              </Table.Row>
            ))}

          </Table.Body>
        </Table>

        </Segment>
      </Segment.Group>
    )
  }
}

export default AgentNegotiationDetail
