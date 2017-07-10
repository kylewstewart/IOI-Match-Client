import React, { Component } from 'react'
import { Button, Table, Checkbox, Segment, Header } from 'semantic-ui-react'

class AgentNegotiationDetail extends Component {
  constructor(){
    super()
    this.state = {negotiation: '', negPrincipals: []}
  }

  componentWillReceiveProps(nextProps){
    this.setState({ negotiation: nextProps.negotiation })
    this.setState({ negPrincipals: nextProps.negPrincipals })
  }

  handleClick = (e, { value }) => this.setState(prevState => {
      return { negPrincipals: prevState.negPrincipals.map(np => {
          if (np.id === value) !np.traded ? np.traded = true : np.traded = false
          return np
        })
      }
    })


  updateNegotiation = () => {
    this.state.negPrincipals.forEach(np =>
      this.props.updateTraded(np.id, np.traded))

    const traded = this.state.negPrincipals.map(np => np.traded).includes(true)
    this.props.updateNegotiation(this.state.negotiation.id, traded)
  }

  negotiation = () => {
    const blank = { active: '-', exch_code: '-' }
    if (!this.state.negotiation) return blank
    return this.state.negotiation
  }

  principals = (side) => {
    const blank = [{id: 1, name: '-', side: '-', traded: null}]
    if (!this.state.negPrincipals.length) return blank
    return this.state.negPrincipals.filter(np => np.side === side)
  }

  disableUpdate = () => {
    if (!this.state.negPrincipals[0]) return true
    return this.state.negPrincipals.map(np => np.traded === null ? true : false).includes(true)
  }

  render(){

    return(
      <Segment.Group>
        <Segment> <Header> Negotiation </Header> </Segment>
        <Segment>
          <Table fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign='left'> Stock: </Table.HeaderCell>
                <Table.HeaderCell textAlign='left'>
                  <Header>
                    {this.negotiation().exch_code}
                  </Header>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body></Table.Body>
          </Table>
        </Segment>
        <Segment clearing>
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
                  <Checkbox value={principal.id} onClick={this.handleClick}
                    disabled={!this.props.negotiation}
                    checked={principal.traded === null ? false : principal.traded}
                    defaultIndeterminate={principal.traded === null} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        <Header as='h5' > Sellers </Header>
        <Table fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign='left'> Principal </Table.HeaderCell>
              <Table.HeaderCell textAlign='center'> Traded </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.principals('Sell').map(principal => (
              <Table.Row key={principal.id}>
                <Table.Cell textAlign='left'>{principal.name}</Table.Cell>
                <Table.Cell textAlign='center'>
                  <Checkbox value={principal.id} onClick={this.handleClick}
                    disabled={!this.props.negotiation}
                    checked={principal.traded === null ? false : principal.traded}
                    defaultIndeterminate={principal.traded === null} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        <Button
          disabled={this.disableUpdate()}
          floated='right'
          onClick={this.updateNegotiation}
          >
          Complete Negotiation
        </Button>
        </Segment>
    </Segment.Group>
    )
  }
}

export default AgentNegotiationDetail
// principal.traded === undefined ? false : principal.traded
