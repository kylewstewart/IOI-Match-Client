import _ from 'lodash'
import React, { Component } from 'react'
import { Segment, Grid, Divider, Table, Header, Button } from 'semantic-ui-react'

class AgentsNegotiations extends Component {
  constructor(){
    super()
    this.state = {
      data: [],
      direction: null
    }
  }

  componentWillReceiveProps = (nextProps) => (
    this.setState({
      data: _.sortBy(nextProps.negotiations.filter(neg => !!neg.active), ['exch_code']),
      direction: null
    })
  )

  handleClick = () => this.props.getNegotiations(this.props.agent)

  handleEdit = (e, {value}) => this.props.negotiationDetail(value)

  handleSort = () => {
    const { data, direction } = this.state

    this.setState({
      data: data.reverse(),
      direction: direction === 'descending' ? 'ascending' : 'descending'
    })
  }

  render() {
    const { direction, data } = this.state
    const { agent } = this.props

    return (
      <Segment>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header floated='left'> Negotiations </Header>
            </Grid.Column>
            <Grid.Column>
              <Button
                disabled={!this.props.agent}
                floated='right' icon='refresh'
                onClick={this.handleClick}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider />
        <Segment basic>

          <Table sortable celled fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  textAlign='center'
                  sorted={direction}
                  onClick={this.handleSort}
                  >
                    Stock
                </Table.HeaderCell>
                <Table.HeaderCell textAlign='center'> Details </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map(row => (
                <Table.Row key={row.id}>
                  <Table.Cell textAlign='center'> { row.exch_code } </Table.Cell>
                  <Table.Cell textAlign='center'>
                    <Button
                      icon='external'
                      disabled={!agent}
                      value={row.id}
                      onClick={this.handleEdit}
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

export default AgentsNegotiations
