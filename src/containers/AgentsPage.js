import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'
import { Adaptors } from '../Adaptors/index'

import AgentsHeader from '../AgentsHeader'
import SponsorshipList from '../SponsorshipList'
import AgentsNegotiations from '../AgentsNegotiations'
import AgentNegotiationDetail from '../AgentNegotiationDetail'

class AgentsPage extends Component {
  constructor(){
    super()
    this.state = { agents: [], id: '', negotiation: '', negotiations: [], negPrincipals: [] }
    this.UpdateNegPrincipalTraded = this.UpdateNegPrincipalTraded.bind(this)
    this.updateNegotiation = this.updateNegotiation.bind(this)
  }

  componentDidMount = () => this.getAgents()

  agentSubmit = (id) => {
    this.setState({ id })
    this.getSponsorships(id)
    this.getNegotiations(id)
  }

  getAgents = () => Adaptors.Agents().then(agents => this.setState({ agents }))

  getSponsorships = (id) => Adaptors.Sponsorships(id)
    .then(sponsorships => this.setState({ sponsorships }))

  getNegotiations = (id) => Adaptors.AgentNegotiations(id)
    .then(negotiations => this.setState({ negotiations }))

  UpdateNegPrincipalTraded = (id, traded) => Adaptors.UpdateNegPrincipalTraded(id, traded)
    .then(negPrin => this.setState((prevState) => {
        return { negPrincipals: prevState.negPrincipals.map(np => np.id === negPrin ? negPrin : np) }
      })
    )

  updateNegotiation = (id, traded) => Adaptors.UpdateNegotiation(id, traded)
    .then(negotiation => {
      this.setState({ negotiation })
      this.setState((prevState) => {
        return { negotiations: prevState.negotiations.map(neg => neg.id === negotiation.id ? negotiation : neg) }
      })
    })
    // .then(delete Match IOIs)

  negotiationDetail = (neg_id) => {
    Adaptors.NegPrincipals(neg_id)
      .then(negPrincipals => this.setState({ negPrincipals }))
    this.setState({ negotiation: this.state.negotiations.find(neg => neg.id === neg_id) })
  }


  render() {
    return (
      <Grid>
        <Grid.Row>
          <AgentsHeader agentSubmit={this.agentSubmit} agents={this.state.agents} />
        </Grid.Row>
        <Grid.Row columns={3}>
          <Grid.Column width='4'>
            <AgentsNegotiations
              negotiations={this.state.negotiations}
              agent={this.state.id}
              getNegotiations={this.getNegotiations}
              negotiationDetail={this.negotiationDetail}
              />
          </Grid.Column>
          <Grid.Column width='6'>
            <AgentNegotiationDetail
              updateTraded={this.UpdateNegPrincipalTraded}
              updateNegotiation={this.updateNegotiation}
              negotiation={this.state.negotiation}
              negPrincipals={this.state.negPrincipals}
              />
          </Grid.Column>
          <Grid.Column width='6'>
            <SponsorshipList
              sponsorships={this.state.sponsorships}
              />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default AgentsPage
