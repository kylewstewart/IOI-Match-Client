import React, { Component } from 'react'
import { Table, Header, Container, Segment, Button } from 'semantic-ui-react'

class AlgoMatchDetails extends Component{

  principals = (side) => (
    !this.props.match ? [{name: '-', ranked_agents: '-'}] : this.props.match.filter(ioi => ioi.side === side)
  )

  render(){
    return(
      <Container>
        <Segment.Group>

          <Segment>
            <Header> Match Details </Header>
            <Table fixed>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell textAlign='center'> Stock: </Table.HeaderCell>
                  <Table.HeaderCell> {this.principals("Buy")[0].exch_code} </Table.HeaderCell>
                </Table.Row>
              </Table.Header>
            </Table>
          </Segment>

        <Segment>
          <Header as='h5'> Buyers </Header>
          <Table fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign='center'> Investor </Table.HeaderCell>
                <Table.HeaderCell textAlign='center'> Ranked Brokers </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.principals("Buy").map(principal => (
                <Table.Row key={principal.name}>
                  <Table.Cell textAlign='center'> {principal.name} </Table.Cell>
                  <Table.Cell textAlign='center'> {principal.ranked_agents} </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Segment>

        <Segment>
          <Header as='h5'> Sellers </Header>
          <Table fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign='center'> Investor </Table.HeaderCell>
                <Table.HeaderCell textAlign='center'> Ranked Brokers </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.principals("Sell").map(principal => (
                <Table.Row key={principal.name}>
                  <Table.Cell textAlign='center'> {principal.name} </Table.Cell>
                  <Table.Cell textAlign='center'> {principal.ranked_agents} </Table.Cell>
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

export default AlgoMatchDetails
