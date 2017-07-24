import React, { Component } from 'react'
import { Table, Grid, Header, Form, Segment, Icon } from 'semantic-ui-react'

import NegotiationRating from './NegotiationRating'

class CompletedNegotiations extends Component{

  negotiations = () => {
    const { negotiations } = this.props
    return negotiations
  }

  rating = (negID) => {
    if (!this.props || !this.props.ratings[0]) return 0
    const rating = this.props.ratings.filter(rating => rating.neg_id === negID)
    return !rating[0] ? 0 : rating[0].rating
  }

  traded = (negID) => {
    if (!this.props || !this.props.ratings[0]) return '-'
    const rating = this.props.ratings.filter(rating => rating.neg_id === negID)
    if (!rating[0]) return '-'
    return !!rating[0].traded ? 'Traded' : 'No Trade'
  }

  render(){
    const { principal } = this.props

    return(
      <Segment basic>
        <Header as='h4'> Completed </Header>
        <Table fixed>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign='center'> Stock </Table.HeaderCell>
              <Table.HeaderCell textAlign='center'> Agent </Table.HeaderCell>
              <Table.HeaderCell textAlign='center'> Traded </Table.HeaderCell>
              <Table.HeaderCell textAlign='center'> Time </Table.HeaderCell>
              <Table.HeaderCell textAlign='center'> Rating </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
          {this.negotiations().map(negotiation => (
            <Table.Row key={principal + negotiation.id}>
              <Table.Cell textAlign='center'> {negotiation.exch_code} </Table.Cell>
              <Table.Cell textAlign='center'> {negotiation.agent_name} </Table.Cell>
              <Table.Cell textAlign='center'> {this.traded(negotiation.id)} </Table.Cell>
              <Table.Cell textAlign='center'> {negotiation.time} </Table.Cell>
              <Table.Cell textAlign='center'>
                <NegotiationRating
                  updateRating={this.props.updateRating}
                  prinID={this.props.principal}
                  negID={negotiation.id}
                  rating={this.rating(negotiation.id)}
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

export default CompletedNegotiations
