import _ from 'lodash'
import React, { Component } from 'react'
import { Segment, Table, Checkbox, Header } from 'semantic-ui-react'

class AgentNegotiationTable extends Component{
  constructor(){
    super()
    this.state = {
      data: [],
      column: null,
      direction: null,
      keys: ['name'],
      headers: ['Investor']
    }
  }

  componentWillReceiveProps = (nextProps) => (
    this.setState({
      data: nextProps.negPrincipals
    })
  )

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
    const { header, negotiation } = this.props

    return (
      <Segment basic>
        <Header as='h5' > {header} </Header>

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
              <Table.HeaderCell textAlign='center'> Traded </Table.HeaderCell>
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
                    <Checkbox
                      value={row}
                      onClick={this.props.handleClick}
                      disabled={!negotiation}
                      checked={row.traded === null ? false : row.traded}
                      defaultIndeterminate={row.traded === null}
                      />
                  </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Segment>
    )

  }
}

export default AgentNegotiationTable

// {negPrincipals.map(negPrin => (
//   <Table.Row key={negPrin.id}>
//     <Table.Cell textAlign='center'>{negPrin.name}</Table.Cell>
//     <Table.Cell textAlign='center'>
//       <Checkbox
//         value={row}
//         onClick={props.handleClick}
//         disabled={!negotiation}
//         checked={row.traded === null ? false : row.traded}
//         defaultIndeterminate={row.traded === null}
//         />
//     </Table.Cell>
//   </Table.Row>
// ))}
