
import React, { Component } from 'react'
import { Grid, Divider, Segment, Header } from 'semantic-ui-react'
import { Adaptors } from '../Adaptors/index'

import IOIList from '../IOIList'
import IOIForm from '../IOIForm'
import PrincipalsNegotiations from '../PrincipalsNegotiations'
import PrincipalsHeader from '../PrincipalsHeader'
import SortableTable from '../SortableTable'


class PrincipalsPage extends Component {
  state = {
      IOIs: [],
      sponsors: [],
      stocks: [],
      IOI: false,
      principal_id: '',
      negotiations: [],
      principals: []
    }

  componentDidMount(){
    this.getStocks()
    this.getPrincipals()
  }

  principalSubmit = (name) => {
    const principal_id = this.state.principals.filter(principal => principal.name === name)[0].id
    this.setState({principal_id: principal_id })
    this.getIOIs(principal_id)
    this.getSponsors(principal_id)
    this.getNegotiations(principal_id)
  }

  getStocks = () => Adaptors.Stocks().then(stocks => this.setState({ stocks }))

  getPrincipals = () => Adaptors.Principals().then(principals => this.setState({principals}))


  getIOIs = (id) => Adaptors.IOIs(id).then(IOIs => this.setState({ IOIs }))

  getSponsors = (id) => Adaptors.Sponsors(id).then(sponsors => this.setState({ sponsors }))

  getNegotiations = (id) => Adaptors.PrincipalNegotiations(id).then(negotiations => this.setState({ negotiations }))


  createIOI = (IOI) => {
    Adaptors.CreateIOI(IOI, this.state.principal_id)
      .then(IOI => this.refreshPage(IOI.principal_id))
      // .then(IOI => this.setState((prevState) => {
      //   return { IOIs: [...prevState.IOIs, IOI] }
      // }))
    this.setState({IOI: false})
  }

  updateIOI = (IOI) => {
    Adaptors.UpdateIOI(IOI)
    .then(IOI => this.refreshPage(IOI.principal_id))
      // .then(IOI => this.setState((prevState) => {
      //   return {IOIs: prevState.IOIs.map(prevIOI => prevIOI.id === IOI.id ? IOI : prevIOI)}
      // }))
    this.setState({IOI: false})
  }

  editIOI = (IOI_id) => {
    const IOI = this.state.IOIs.find(IOI => IOI.id === IOI_id)
    this.setState({ IOI })
  }

  destroyIOI = (IOI_id) => {
    Adaptors.DestroyIOI(IOI_id)
    .then(IOI => this.refreshPage(IOI.principal_id))
    // .then(IOI => this.setState((prevState) => {
    //   return {IOIs: prevState.IOIs.filter(prevIOI => prevIOI.id !== IOI_id)}
    // }))
  }

  refreshPage = (principal_id) => {
    this.getIOIs(principal_id)
    this.getNegotiations(principal_id)
  }

  updateRating = (negPricID, update) => (
    Adaptors.UpdateNegotiationPrincipal(negPricID, update)
    .then(negPrincipal => this.setState((prevState) => {
      return {negotiations: prevState.negotiations.map(prevNeg => {
        if (prevNeg.neg_prin_id === negPrincipal.id) prevNeg.rating = negPrincipal.rating
        return prevNeg
      })}
    }))
  )

  resetIOIProp = () => this.setState({IOI: false})

  render() {
    const { stocks, sponsors, IOI, IOIs, principal_id, negotiations } = this.state

    return (
      <Grid container relaxed>
        <Grid.Row>
          <PrincipalsHeader principalSubmit={this.principalSubmit} principals={this.state.principals} />
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width='8'>
            <IOIForm
              stocks={stocks}
              sponsors={sponsors}
              IOI={IOI}
              resetIOIProp={this.resetIOIProp}
              updateIOI={this.updateIOI}
              createIOI={this.createIOI}
              destroyIOI={this.destroyIOI}
              principal={principal_id}
              />
            <Divider hidden/>
            <IOIList
              IOIs={IOIs}
              editIOI={this.editIOI}
              principal={principal_id}
              />
          </Grid.Column>
          <Grid.Column width='8'>
            <Segment>
              <Header> Sponsors </Header>
              <Divider />
              <Segment basic>
                <SortableTable
                  data={sponsors}
                  keys={['agent_name', 'pct_traded', 'rating']}
                  headers={['Broker', 'Conversion', 'Rating']}
                  />
              </Segment>
            </Segment>
            <Divider hidden/>
            <PrincipalsNegotiations
              negotiations={negotiations}
              principal={principal_id}
              getNegotiations={this.getNegotiations}
              updateRating={this.updateRating}
              />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }

}

export default PrincipalsPage
