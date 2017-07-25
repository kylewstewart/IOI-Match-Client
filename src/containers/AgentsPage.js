import React, { Component } from 'react'
import { Grid, Divider, Segment, Header } from 'semantic-ui-react'
import { Adaptors } from '../Adaptors/index'

import AgentsHeader from '../AgentComponents/AgentsHeader'
import AgentsNegotiations from '../AgentComponents/AgentsNegotiations'
import AgentNegotiationDetail from '../AgentComponents/AgentNegotiationDetail'
import SortableTable from '../SortableTable'

class AgentsPage extends Component {
  constructor(){
    super()
    this.state = {
      agents: [],
      id: '',
      negotiation: '',
      negotiations: [],
      negPrincipals: [],
      sponsorships: []
    }
  }

  componentDidMount = () => this.getAgents()

  agentSubmit = (id) => {
    this.setState({ id })
    this.getSponsorships(id)
    this.getNegotiations(id)
  }

  getAgents = () => (
    Adaptors.Agents()
      .then(agents => this.setState({ agents }))
    )

  getSponsorships = (id) => (
    Adaptors.Sponsorships(id)
      .then(sponsorships => this.setState({ sponsorships }))
    )

  getNegotiations = (id) => (
    Adaptors.AgentNegotiations(id)
      .then(negotiations => this.setState({ negotiations }))
    )

  getNegotiationDetail = (neg_id) => {
    Adaptors.NegPrincipals(neg_id)
      .then(negPrincipals => this.setState({ negPrincipals }))
    this.setState({ negotiation: this.state.negotiations.find(neg => neg.id === neg_id) })
  }

  updateNegotiationPrincipal = (id, update) => (
    Adaptors.UpdateNegotiationPrincipal(id, update)
      .then(negPrin => this.setState((prevState) => {
        return {negPrincipals: prevState.negPrincipals.map(prevNegPrin => {
          return prevNegPrin.id === negPrin.id ? negPrin : prevNegPrin
        })}
      }))
  )

  updateNegotiation = (id, update) => {
    Adaptors.UpdateNegotiation(id, update)
      .then(neg => this.setState((prevState) => {
        return {negotiations: prevState.negotiations.map(prevNeg => {
          return prevNeg.id === neg.id ? neg : prevNeg
        })}
      }))
    this.setState({negotiation: ''})
}

  render() {
    
    return (
      <Grid container relaxed>
        <Grid.Row>
          <AgentsHeader agentSubmit={this.agentSubmit} agents={this.state.agents} />
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width='8'>
            <AgentsNegotiations
              negotiations={this.state.negotiations}
              agent={this.state.id}
              getNegotiations={this.getNegotiations}
              negotiationDetail={this.getNegotiationDetail}
              />
            <Divider hidden />
            <Segment>
              <Header textAlign='left'> Sponsorships </Header>
              <Divider />
              <Segment basic>
                <SortableTable
                  data={this.state.sponsorships}
                  keys={['principal_name', 'pct_traded']}
                  headers={['Investor', 'Conversion']}
                  />
              </Segment>
            </Segment>
          </Grid.Column>
          <Grid.Column width='8'>
            <AgentNegotiationDetail
              updateTraded={this.updateNegotiationPrincipal}
              updateNegotiation={this.updateNegotiation}
              negotiation={this.state.negotiation}
              negPrincipals={this.state.negPrincipals}
              />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default AgentsPage
