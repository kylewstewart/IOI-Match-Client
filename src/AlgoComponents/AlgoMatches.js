import React, { Component } from 'react'
import { Table, Header, Segment, Button, Divider, Icon } from 'semantic-ui-react'

class AlgoMatches extends Component {
  constructor(){
    super()
    this.state ={
      asc: true
    }
  }

  componentDidMount = () => this.props.onMount()

  stocks = () => {
    const { matchStocks } = this.props
    const { asc } = this.state

    if (!matchStocks) return [{id: 1, exch_code: '-'}]
    return matchStocks.sort((a, b) => (
      !!asc ? a.exch_code.localeCompare(b.exch_code) : b.exch_code.localeCompare(a.exch_code)
    ))
  }

  handleClick = (e, { value }) => this.props.getMatch(value)

  render(){
    const { asc } = this.state
    const { matchStocks } = this.props
    const stocks = this.stocks()

    return (
      <Segment>
        <Header> Matches </Header>
        <Divider />
        <Segment basic>
          <Table fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign='center'>
                  Stock
                  <Icon
                    name={!asc ? 'sort descending' : 'sort ascending'}
                    onClick={this.handleSort}
                  />
                </Table.HeaderCell>
                <Table.HeaderCell textAlign='center'> Details </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {stocks.map(stock => (
                <Table.Row key={stock.id}>
                  <Table.Cell textAlign='center'> {stock.exch_code}</Table.Cell>
                  <Table.Cell textAlign='center'>
                    <Button
                      icon='external'
                      disabled={!matchStocks}
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
    )
  }

}

export default AlgoMatches
