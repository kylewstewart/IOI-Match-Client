import React, { Component } from 'react'
import { Grid, Divider } from 'semantic-ui-react'
import { Adaptors } from '../Adaptors/index'

import AgentsHeader from '../AgentsHeader'

class AgentsPage extends Component {
  constructor(){
    super()
    this.state = {
      agents: [],
      agent_id: '',
    }
  }

  componentDidMount(){
    this.getAgents()
  }

  getAgents(){
    Adaptors.Agents()
      .then(agents => this.setState({ agents }))

  }

  agentSubmit(name){
    const agent_id = this.state.agents.filter(agent => agent.name === name)[0].id
    this.setState({ agent_id })
    this.getSponsorships(agent_id)
    // this.getNegotiations(agent_id)

  }

  getSponships(agent_id){

  }

  render() {
    return (
      <Grid>
        <AgentsHeader agentSubmit={this.agentSubmit} agents={this.state.agents} />

      </Grid>
    )
  }
}

export default AgentsPage
