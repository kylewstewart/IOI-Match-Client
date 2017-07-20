import React, { Component } from 'react'
import { Table, Icon } from 'semantic-ui-react'

class ActiveNegotiations extends Component{
  constructor(){
    super()
    this.state = {
      byTime: true,
      timeAsc: false,
      byStk: false,
      stkAsc: true
    }
  }

  negotiations = () => {
    return this.props.negotiations
  }

  handleStockSort = () => this.setState((prevState) => ({stkAsc: !!prevState.stkAsc ? false : true }))

  handleTimeSort = () => this.setState((prevState) => ({timeAsc: !!prevState.timeAsc ? false : true }))




  render(){
    const { timeAsc, stkAsc } = this.state

    return(
      <Table >
        <Table.Header>
          <Table.Row >
            <Table.HeaderCell textAlign='center'>
              Stock
            <Icon name={!stkAsc ? 'sort descending' : 'sort ascending'} onClick={this.handleStockSort}/>
            </Table.HeaderCell>
            <Table.HeaderCell textAlign='center'> Agent </Table.HeaderCell>
            <Table.HeaderCell textAlign='center'>
              Time
              <Icon name={!timeAsc ? 'sort descending' : 'sort ascending'} onClick={this.handleTimeSort}/>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {this.negotiations().map(negotiation => (
          <Table.Row key={negotiation.id}>
            <Table.Cell textAlign='center'> {negotiation.exch_code} </Table.Cell>
            <Table.Cell textAlign='center'> {negotiation.agent_name} </Table.Cell>
            <Table.Cell textAlign='center'> {negotiation.time} </Table.Cell>
          </Table.Row>
        ))}
        </Table.Body>
      </Table>


    )
  }
}

export default ActiveNegotiations
