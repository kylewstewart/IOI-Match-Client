import React, { Component } from 'react'
import { Segment, Grid, Divider, Table, Header, Button } from 'semantic-ui-react'

class AgentsNegotiations extends Component {

  handleClick = () => this.props.getNegotiations(this.props.agent)

  negotiations = (status) => {
    const blank = [{id: 1, exch_code: '-', active: '-'}]
    if (!this.props.negotiations || !this.props.negotiations.length) return blank
    const negotiations = this.props.negotiations.filter(neg => neg.active === status)
    if (!negotiations.length) return blank
    return negotiations.sort((a, b) => a.exch_code.localeCompare(b.exch_code))
  }

  handleEdit = (e, {value}) => this.props.negotiationDetail(value)

  render() {

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
          <Table fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign='center'> Stock </Table.HeaderCell>
                <Table.HeaderCell textAlign='center'> Details </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.negotiations('Active').map(negotiation => (
                <Table.Row key={negotiation.id}>
                  <Table.Cell textAlign='center'> {negotiation.exch_code} </Table.Cell>
                  <Table.Cell textAlign='center'>
                    <Button
                      icon='external'
                      disabled={!this.props.agent}
                      value={negotiation.id}
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
