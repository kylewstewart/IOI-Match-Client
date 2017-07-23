import _ from 'lodash'
import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

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
    const { data, keys, headers } = nextProps
    this.setState({
      data: data,
      keys: keys,
      headers: headers
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
    )
  }
}

export default SortableTable
