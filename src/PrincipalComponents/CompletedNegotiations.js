import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

import NegotiationRating from './NegotiationRating'

class CompletedNegotiations extends Component{
  constructor(){
    super()
    this.state = {

    }
  }

  negotiations = () => {
    return this.props.negotiations
  }

  rating = (negID) => {
    if (!this.props || !this.props.ratings[0]) return 0
    const rating = this.props.ratings.filter(rating => rating.neg_id === negID)
    return !rating[0] ? 0 : rating[0].rating
  }


  render(){

    return(
      <Table >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign='center'> Stock </Table.HeaderCell>
            <Table.HeaderCell textAlign='center'> Agent </Table.HeaderCell>
            <Table.HeaderCell textAlign='center'> Traded </Table.HeaderCell>
            <Table.HeaderCell textAlign='center'> Rating </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        {this.negotiations('Completed').map(negotiation => (
          <Table.Row key={negotiation.id}>
            <Table.Cell textAlign='center'> {negotiation.exch_code} </Table.Cell>
            <Table.Cell textAlign='center'> {negotiation.agent_name} </Table.Cell>
            <Table.Cell textAlign='center'> {negotiation.traded} </Table.Cell>
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


    )
  }
}

export default CompletedNegotiations
