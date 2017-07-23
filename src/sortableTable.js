import _ from 'lodash'
import React, { Component } from 'react'
import { Divider, Segment, Header, Table } from 'semantic-ui-react'

class SortableTable extends Component {
  constructor(){
    super()
    this.state = {
      column: null,
      data: [],
      direction: null,
      keys: [],
      headers: []
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const { tableData, dataKeys, tableHeaders } = nextProps
    this.setState({
      data: tableData,
      keys: dataKeys,
      headers: tableHeaders
    })
  }

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
    const { column, data, direction, keys, headers } = this.state

    return (
      <Segment>
        <Header textAlign='left'> { this.props.header } </Header>
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
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Segment>
      </Segment>
    )
  }
}
export default SortableTable

// <Table.Cell textAlign='center'> {pct_traded} </Table.Cell>
// <Table.Cell textAlign='center'> {rating} </Table.Cell>
// {_.map(data, ({ id, agent_name, pct_traded, rating }) =>
// )}


// <Table.HeaderCell
//   textAlign='center'
//   sorted={column === 'agent_name' ? direction : null} onClick={this.handleSort('agent_name')}
//   >
//   Broker
// </Table.HeaderCell>
// <Table.HeaderCell
//   textAlign='center'
//   sorted={column === 'pct_traded' ? direction : null} onClick={this.handleSort('pct_traded')}
//   >
//   Conversion
// </Table.HeaderCell>
// <Table.HeaderCell
//   textAlign='center'
//   sorted={column === 'rating' ? direction : null} onClick={this.handleSort('rating')}
//   >
//   Rating
// </Table.HeaderCell>
