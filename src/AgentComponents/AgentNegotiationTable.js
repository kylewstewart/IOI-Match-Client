import _ from 'lodash'
import React, { Component } from 'react'
import { Segment, Table, Checkbox, Header } from 'semantic-ui-react'

class AgentNegotiationTable extends Component{
  constructor(){
    super()
    this.state = {
      data: [],
      direction: null
    }
  }

  componentWillReceiveProps = (nextProps) => (
    this.setState({
      data: _.sortBy(nextProps.negPrincipals, ['name']),
      direction: 'ascending'
    })
  )

  handleSort = () => {
    const { data, direction } = this.state

    this.setState({
      data: data.reverse(),
      direction: direction === 'descending' ? 'ascending' : 'descending'
    })
  }

  render(){
    const { direction, data } = this.state
    const { header, negotiation } = this.props

    return (
      <Segment basic>
        <Header as='h5' > {header} </Header>
        <Table sortable celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                textAlign='center'
                sorted={direction}
                onClick={this.handleSort}
                >
                  Investor
              </Table.HeaderCell>
              <Table.HeaderCell textAlign='center'> Traded </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map(row => (
              <Table.Row key={row.id}>
                <Table.Cell textAlign='center'> { row.name } </Table.Cell>
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
