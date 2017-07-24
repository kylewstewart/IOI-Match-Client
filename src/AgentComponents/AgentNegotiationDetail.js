import React, { Component } from 'react'
import { Button, Divider, Segment, Header } from 'semantic-ui-react'

import AgentNegotiationTable from './AgentNegotiationTable'

class AgentNegotiationDetail extends Component {
  constructor(){
    super()
    this.state = {
      negotiation: '',
      negPrinBuyers: [],
      negPrinSellers: []
    }

    this.handleClick = this.handleClick.bind(this)
  }

  componentWillReceiveProps = (nextProps) => (
    this.setState({
      negotiation: nextProps.negotiation,
      negPrinBuyers: nextProps.negPrincipals.filter(np => np.side === 'Buy'),
      negPrinSellers: nextProps.negPrincipals.filter(np => np.side === 'Sell')
    })
  )

  handleClick = (e, { value }) => {
    if (value.side === 'Buy') {
      this.setState((prevState) => ({
        negPrinBuyers: prevState.negPrinBuyers.map(np => {
          if (np.id === value.id) !np.traded ? np.traded = true : np.traded = false
          return np
        })
      }))
    } else {
      this.setState((prevState) => ({
        negPrinSellers: prevState.negPrinSellers.map(np => {
          if (np.id === value.id) !np.traded ? np.traded = true : np.traded = false
          return np
        })
      }))
    }
  }

  updateNegotiation = () => {
    this.state.negPrincipals.forEach(np =>
      this.props.updateTraded(np.id, np.traded))

    const traded = this.state.negPrincipals.map(np => np.traded).includes(true)
    this.props.updateNegotiation(this.state.negotiation.id, traded)
  }

  disableUpdate = () => {
    const { negPrinBuyers, negPrinSellers } = this.state
    const negPrincipals = negPrinBuyers.concat(negPrinSellers)

    return negPrincipals.map(np => np.traded === null ? true : false).includes(true)
  }

  render(){
    const { negPrinBuyers, negPrinSellers, negotiation } = this.state

    return(
      <Segment>
        <Header> Negotiation </Header>
        <Header as='h4'> {negotiation.exch_code} </Header>
        <Divider />
        <AgentNegotiationTable
          negPrincipals={negPrinBuyers}
          header={'Buyers'}
          handleClick={this.handleClick}
          negotiation={negotiation}
          />
        <AgentNegotiationTable
          negPrincipals={negPrinSellers}
          header={'Sellers'}
          handleClick={this.handleClick}
          negotiation={negotiation}
          />
        <Segment basic clearing>
          <Button
            disabled={this.disableUpdate()}
            floated='right'
            onClick={this.updateNegotiation}
            >
            Complete Negotiation
          </Button>
        </Segment>
      </Segment>
    )
  }
}

export default AgentNegotiationDetail
