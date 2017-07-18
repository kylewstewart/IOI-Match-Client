import React, { Component } from 'react'
import { Table, Header, Container, Segment, Button, Divider } from 'semantic-ui-react'

class AlgoMatches extends Component {

  componentDidMount = () => this.props.onMount()

  stocks = () => !this.props.matchStocks ? [{id: 1, exch_code: '-'}] : this.props.matchStocks

  handleClick = (e, { value }) => this.props.getMatch(value)

  render(){

    return (
      <Container>
        <Segment>
          <Header> Matches </Header>
          <Divider />
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign='center'> Stock </Table.HeaderCell>
                <Table.HeaderCell textAlign='center'> Details </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.stocks().map(stock => (
                <Table.Row key={stock.id}>
                  <Table.Cell textAlign='center'> {stock.exch_code}</Table.Cell>
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
      </Container>
    )

  }
}

export default AlgoMatches
