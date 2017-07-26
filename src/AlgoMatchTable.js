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
        <Header
          as='h4'
          content={header}
          />
        <Table sortable celled fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                width={4}
                textAlign='center'
                sorted={direction}
                onClick={this.handleSort}
                content='Investor'
                />
              <Table.HeaderCell
                textAlign='center'
                colSpan={maxCol}
                content='Ranked Brokers'
                />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map(row => (
              <Table.Row key={row.id}>
                <Table.Cell
                  textAlign='center'
                  content={row.name}
                  />
                {[...Array(maxCol).keys()].map(i => (
                  <Table.Cell
                    key={i}
                    textAlign='center'
                    content={!row.ranked_agents[i] ? '-' : row.ranked_agents[i]}
                    />
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
