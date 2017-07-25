import _ from 'lodash'
import React, { Component } from 'react'
import { Table, Header, Segment, Button, Divider, Icon } from 'semantic-ui-react'

class AlgoMatches extends Component {
  constructor(){
    super()
    this.state = {
      data: [],
      column: null,
      direction: null,
      keys: ['exch_code'],
      headers: ['Stock']
    }
  }

  componentDidMount = () => this.props.onMount()

  componentWillReceiveProps = (nextProps) => (
    this.setState({
      data: !!nextProps.matchStocks ? nextProps.matchStocks : []
    })
  )

  handleClick = (e, { value }) => this.props.getMatch(value)

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending'
      })
    } else {
      this.setState({
        data: data.reverse(),
        direction: direction === 'ascending' ? 'descending' : 'ascending'
      })
    }
  }


  render(){
    const { column, direction, data, keys, headers } = this.state
    const { matchStocks } = this.props

    console.log('data', data)

    return (
      <Segment>
        <Header> Matches </Header>
        <Divider />

        <Segment basic>

          <Table sortable celled fixed>
            <Table.Header>
              <Table.Row>
                {keys.map((key, index) => (
                  <Table.HeaderCell
                    key={key}
                    textAlign='center'
                    sorted={column === key ? direction : null}
                    onClick={this.handleSort(key)}
                    >
                      { headers[index] }
                  </Table.HeaderCell>
                ))}
                <Table.HeaderCell textAlign='center'> Details </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>

              {data.map((row, rowIndex) => (
                <Table.Row key={rowIndex}>
                  {keys.map((key, keyIndex) => (
                    <Table.Cell
                      key={rowIndex + keyIndex}
                      textAlign='center'
                      >
                        { row[key] }
                    </Table.Cell>
                  ))}
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
