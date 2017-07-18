import React, { Component } from 'react'
import { Table, Header, Container, Segment, Button } from 'semantic-ui-react'

class AlgoMatches extends Component {

  componentDidMount = () => this.props.onMount()

  stocks = () => !this.props.matchStocks ? [{id: 1, exch_code: '-'}] : this.props.matchStocks


  handleClick = (e, { value }) => this.props.getMatch(value)

  render(){

    return (
      <Container>
        <Segment.Group>
          <Segment>
            <Header> Matches </Header>
            <Segment>
              <Table>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell width='8' textAlign='center'> Stock </Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'> Details </Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {this.stocks().map(stock => (
                      <Table.Row key={stock.id}>
                      <Table.Cell width='8' textAlign='center'> {stock.exch_code}</Table.Cell>
                      <Table.Cell textAlign='center'>
                        <Button
                          icon='external'
                          disabled={!this.props.matchStocks}
                          value={stock.id}
                          onClick={this.handleClick}
                          />

                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </Segment>
          </Segment>
        </Segment.Group>
      </Container>
    )

  }
}

export default AlgoMatches
