import React, { Component } from 'react'
import { Table, Segment, Header, Form, Icon, Grid } from 'semantic-ui-react'

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
    const { byTime, timeAsc, stkAsc } = this.state
    const { negotiations } = this.props

    if (!!byTime) {
      return negotiations.sort((a,b) => (
        !!timeAsc ? new Date('1970/01/01 ' + a.time) - new Date('1970/01/01 ' + b.time) : new Date('1970/01/01 ' + b.time) - new Date('1970/01/01 ' + a.time)
      ))
    } else {
      return negotiations.sort((a,b) => (
        !!stkAsc ? a.exch_code.localeCompare(b.exch_code) : b.exch_code.localeCompare(a.exch_code)
      ))
    }
  }

  handleStockSort = () => {
    if (!!this.state.byStk) this.setState((prevState) => ({stkAsc: !!prevState.stkAsc ? false : true }))
  }

  handleTimeSort = () => {
    if (!!this.state.byTime) this.setState((prevState) => ({timeAsc: !!prevState.timeAsc ? false : true }))
  }

  handleChange = (e, { value }) => {
    if (value === 'byStk') {
      this.setState({byStk: true})
      this.setState({byTime: false})
    } else {
      this.setState({byStk: false})
      this.setState({byTime: true})
    }
  }

  render(){
    const { byTime, timeAsc, byStk, stkAsc } = this.state

    return(
      <Segment basic>
        <Grid>
          <Grid.Row columns={3}>
            <Grid.Column>
              <Header as='h4'> Active </Header>
            </Grid.Column>
            <Grid.Column textAlign='right'>
              Sort by:
            </Grid.Column>
            <Grid.Column>
              <Form>
                <Form.Group>
                  <Form.Radio
                    label='Stock'
                    name='radioGroup'
                    value='byStk'
                    checked={byStk}
                    onChange={this.handleChange}
                  />
                  <Form.Radio
                    label='Time'
                    name='radioGroup'
                    value='byTime'
                    checked={byTime}
                    onChange={this.handleChange}
                  />
                </Form.Group>
              </Form>
            </Grid.Column>
            </Grid.Row>
        </Grid>

        <Table >
          <Table.Header>
            <Table.Row >
              <Table.HeaderCell textAlign='center'>
                Stock
                <Icon
                  name={!stkAsc ? 'sort descending' : 'sort ascending'}
                  disabled={!byStk}
                  onClick={this.handleStockSort}
                />
              </Table.HeaderCell>
              <Table.HeaderCell textAlign='center'> Agent </Table.HeaderCell>
              <Table.HeaderCell textAlign='center'>
                Time
                <Icon
                  name={!timeAsc ? 'sort descending' : 'sort ascending'}
                  disabled={!byTime}
                  onClick={this.handleTimeSort}
                />
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
      </Segment>
    )
  }
}

export default ActiveNegotiations
