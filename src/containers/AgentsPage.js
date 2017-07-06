import React, { Component } from 'react'
import { Grid, Divider } from 'semantic-ui-react'
import { Adaptors } from '../Adaptors/index'

import AgentsHeader from '../AgentsHeader'
import SponsorshipList from '../SponsorshipList'
import AgentsNegotiations from '../AgentsNegotiations'

class AgentsPage extends Component {
  constructor(){
    super()
    this.state = {
      agents: [],
      agent_id: '',
      sponsorships: []
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

  getNegotiations(agent_id){
    Adaptors.AgentNegotiations(agent_id)
      .then(negotiations => this.setState({negotiations}))
  }

  render() {
    return (
      <Grid>
        <AgentsHeader agentSubmit={this.agentSubmit} agents={this.state.agents} />
        <SponsorshipList sponsorships={this.state.sponsorships} />
        <AgentsNegotiations negotiations={this.state.negotiations} agent={this.state.agent_id}
          getNegotiations={this.getNegotiations} />
      </Grid>
    )
  }
}

export default AgentsPage
