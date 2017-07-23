import React, { Component } from 'react'
import { Button, Table, Divider, Checkbox, Segment, Header } from 'semantic-ui-react'

import AgentNegotiationTable from './AgentNegotiationTable'

class AgentNegotiationDetail extends Component {
  constructor(){
    super()
    this.state = {
      negotiation: '',
      negPrincipals: []
    }

    this.handleClick = this.handleClick.bind(this)
  }

  componentWillReceiveProps(nextProps){
    this.setState({ negotiation: nextProps.negotiation })
    this.setState({ negPrincipals: nextProps.negPrincipals })
  }

  handleClick = (e, { value }) => this.setState(prevState => {
      return { negPrincipals: prevState.negPrincipals.map(np => {
          if (np.id === value) !np.traded ? np.traded = true : np.traded = false
          return np
        })
      }
    })


  updateNegotiation = () => {
    this.state.negPrincipals.forEach(np =>
      this.props.updateTraded(np.id, np.traded))

    const traded = this.state.negPrincipals.map(np => np.traded).includes(true)
    this.props.updateNegotiation(this.state.negotiation.id, traded)
  }

  negotiation = () => {
    const blank = { active: '-', exch_code: '-' }
    if (!this.state.negotiation) return blank
    return this.state.negotiation
  }

  principals = (side) => {
    const blank = [{id: 1, name: '-', side: '-', traded: null}]
    if (!this.state.negPrincipals.length) return blank
    return this.state.negPrincipals.filter(np => np.side === side)
  }

  disableUpdate = () => {
    if (!this.state.negPrincipals[0]) return true
    return this.state.negPrincipals.map(np => np.traded === null ? true : false).includes(true)
  }

  render(){

    return(
      <Segment>
        <Header> Negotiation </Header>
        <Header as='h4'> {this.negotiation().exch_code} </Header>
        <Divider />
        <AgentNegotiationTable
          principals={this.principals('Buy')}
          header={'Buyers'}
          handleClick={this.handleClick}
          negotiation={this.props.negotiation}
          />
        <AgentNegotiationTable
          principals={this.principals('Sell')}
          header={'Sellers'}
          handleClick={this.handleClick}
          negotiation={this.props.negotiation}
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
// principal.traded === undefined ? false : principal.traded
