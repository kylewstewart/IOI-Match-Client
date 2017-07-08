import React, { Component } from 'react'
import { Grid, Divider } from 'semantic-ui-react'
import { Adaptors } from '../Adaptors/index'

import AgentsHeader from '../AgentsHeader'
import SponsorshipList from '../SponsorshipList'
import AgentsNegotiations from '../AgentsNegotiations'
import AgentNegotiationDetail from '../AgentNegotiationDetail'

class AgentsPage extends Component {
  constructor(){
    super()
    this.state = {
      agents: [],
      agent_id: '',
    }
  }

  componentDidMount = () => {
    this.getAgents()
  }

  getAgents = () => {
    Adaptors.Agents()
      .then(agents => this.setState({ agents }))
  }

  agentSubmit = (name) => {
    const agent_id = this.state.agents.filter(agent => agent.name === name)[0].id
    this.setState({ agent_id })
    this.getSponsorships(agent_id)
    this.getNegotiations(agent_id)
  }

  getSponsorships = (agent_id) => {
    Adaptors.Sponsorships(agent_id)
      .then(sponsorships => this.setState({ sponsorships }))
  }

  getNegotiations = (agent_id) => {
    Adaptors.AgentNegotiations(agent_id)
      .then(negotiations => this.setState({negotiations}))
  }

  updateNegotiationPrincipals = (id, key, value) => {
    Adaptors.updateNegotiationPrincipals(id, key, value)
      .then(negPrin => console.log(negPrin))
  }

  negotiationDetail = (neg_id) => {
    const negotiation = this.state.negotiations.find(neg => neg.id === neg_id)
    Adaptors.NegotiationPrincipals(neg_id)
      .then(negotiationPrincipals => this.setState({ negotiationPrincipals }))
    this.setState({ negotiation })
  }


  render() {
    return (
    <Grid>
      <AgentsHeader
        agentSubmit={this.agentSubmit}
        agents={this.state.agents}
        />
      <Grid.Row columns={2}>
        <Grid.Column width='8'>
          <AgentNegotiationDetail
            negotiation={this.state.negotiation}
            negotiationPrincipals={this.state.negotiationPrincipals}
            />
          <Divider hidden />
          <AgentsNegotiations
            negotiations={this.state.negotiations}
            agent={this.state.agent_id}
            getNegotiations={this.getNegotiations}
            negotiationDetail={this.negotiationDetail}
            />
        </Grid.Column>
        <Grid.Column width='8'>
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
