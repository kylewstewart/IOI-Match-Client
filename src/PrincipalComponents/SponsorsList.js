import _ from 'lodash'
import React, { Component } from 'react'
import { Divider, Segment, Header, Table } from 'semantic-ui-react'

class SponsorsList extends Component {
  state = {
      column: 'agent_name',
      data: [],
      direction: 'ascending'
    }

  componentWillReceiveProps = (nextProps) => {
    this.setState({ data: this.tabledata(nextProps)})
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

  sortData = (clickedColumn) => 'hello world'

  tabledata = (nextProps) => {
    const blank = [{ id: 1, agent_name: '-', pct_traded: '-', rating: '-'}]
    if (!nextProps.sponsors || !nextProps.sponsors.length) return blank
    return nextProps.sponsors
  }

  render(){
    const { column, data, direction } = this.state

    return (
      <Segment>
        <Header textAlign='left'>Sponsors</Header>
        <Divider />

        <Segment basic>
          <Table sortable celled fixed>

            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  textAlign='center'
                  sorted={column === 'agent_name' ? direction : null} onClick={this.handleSort('agent_name')}
                  >
                  Broker
                </Table.HeaderCell>
                <Table.HeaderCell
                  textAlign='center'
                  sorted={column === 'pct_traded' ? direction : null} onClick={this.handleSort('pct_traded')}
                  >
                  Conversion
                </Table.HeaderCell>
                <Table.HeaderCell
                  textAlign='center'
                  sorted={column === 'rating' ? direction : null} onClick={this.handleSort('rating')}
                  >
                  Rating
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {_.map(data, ({ id, agent_name, pct_traded, rating }) =>
                <Table.Row key={id}>
                  <Table.Cell textAlign='center'> {agent_name} </Table.Cell>
                  <Table.Cell textAlign='center'> {pct_traded} </Table.Cell>
                  <Table.Cell textAlign='center'> {rating} </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </Segment>
      </Segment>
    )
  }
}
export default SponsorsList
