import _ from 'lodash'
import React, { Component } from 'react'
import { Segment, Table, Header } from 'semantic-ui-react'

class AlgoMatchTable extends Component{
    state = {
      data: [],
      direction: null
    }


  componentWillReceiveProps = (nextProps) => (
    this.setState({
      data: _.sortBy(nextProps.iois, ['name']),
      direction: null
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
    const { data, direction } = this.state
    const { maxCol, header } = this.props

    return (
      <Segment basic>
        <Header as='h4'> {header} </Header>
        <Table sortable celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                width={4}
                textAlign='center'
                sorted={direction}
                onClick={this.handleSort}
                >
                  Investor
              </Table.HeaderCell>
              <Table.HeaderCell textAlign='center' colSpan={maxCol}> Ranked Brokers </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map(row => (
              <Table.Row key={row.id}>
                <Table.Cell textAlign='center'> {row.name} </Table.Cell>
                {[...Array(maxCol).keys()].map(i => (
                  <Table.Cell key={i} textAlign='center'>
                    {!row.ranked_agents[i] ? '-' : row.ranked_agents[i]}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Segment>
    )
  }
}

export default AlgoMatchTable
