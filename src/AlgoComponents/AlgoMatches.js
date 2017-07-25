import _ from 'lodash'
import React, { Component } from 'react'
import { Table, Header, Segment, Button, Divider } from 'semantic-ui-react'

class AlgoMatches extends Component {
    state = {
      data: [],
      direction: null
    }

  componentDidMount = () => this.props.onMount()

  componentWillReceiveProps = (nextProps) => (
    this.setState({
      data: _.sortBy(nextProps.matchStocks, ['exch_code']),
      direction: null
    })
  )

  handleClick = (e, { value }) => this.props.getMatch(value)

  handleSort = () => {
    const { data, direction } = this.state

    this.setState({
      data: data.reverse(),
      direction: direction === 'descending' ? 'ascending' : 'descending'
    })
  }

  render(){
    const { direction, data } = this.state
    const { matchStocks } = this.props

    return (
      <Segment>
        <Header> Matches </Header>
        <Divider />
        <Segment basic>
          <Table sortable celled fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  textAlign='center'
                  sorted={direction}
                  onClick={this.handleSort}
                  >
                  Stock
                </Table.HeaderCell>
                <Table.HeaderCell textAlign='center'> Details </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map(row => (
                <Table.Row key={row.id}>
                  <Table.Cell textAlign='center'> { row.exch_code } </Table.Cell>
                  <Table.Cell textAlign='center'>
                    <Button
                      icon='external'
                      disabled={!matchStocks}
                      value={row.id}
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
