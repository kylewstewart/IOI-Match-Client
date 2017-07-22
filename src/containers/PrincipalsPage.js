
import React, { Component } from 'react'
import { Grid, Divider } from 'semantic-ui-react'
import { Adaptors } from '../Adaptors/index'

import IOIList from '../PrincipalComponents/IOIList'
import SponsorsList from '../PrincipalComponents/SponsorsList'
import IOIForm from '../PrincipalComponents/IOIForm'
import PrincipalsNegotiations from '../PrincipalComponents/PrincipalsNegotiations'
import PrincipalsHeader from '../PrincipalComponents/PrincipalsHeader'


class PrincipalsPage extends Component {
  constructor(props){
    super(props)
    this.state = {IOIs: [], sponsors: [], stocks: [], IOI: false, principal_id: '',
      negotiations: [], principals: [], ratings: []}

    this.editIOI = this.editIOI.bind(this)
    this.destroyIOI = this.destroyIOI.bind(this)
    this.updateIOI = this.updateIOI.bind(this)
    this.createIOI = this.createIOI.bind(this)
    this.resetIOIProp = this.resetIOIProp.bind(this)
    this.principalSubmit = this.principalSubmit.bind(this)
    this.updateRating = this.updateRating.bind(this)
    this.getRating = this.getRating.bind(this)
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

  getIOIs = (id) => {
    Adaptors.IOIs(id)
    .then(IOIs =>this.setState({IOIs}))
  }

  getSponsors = (id) => {
    Adaptors.Sponsors(id)
    .then(sponsors => this.setState({sponsors}))
  }

  getStocks = () => {
    Adaptors.Stocks()
      .then(stocks => this.setState({stocks}))
  }

  getPrincipals = () => {
    Adaptors.Principals()
      .then(principals => this.setState({ principals}))
  }

  createIOI = (IOI) => {
    Adaptors.CreateIOI(IOI, this.state.principal_id)
      .then(IOI => this.setState((prevState) => {
        return { IOIs: [...prevState.IOIs, IOI] }
      }))
    this.setState({IOI: false})
  }

  updateIOI = (IOI) =>{
    Adaptors.UpdateIOI(IOI)
      .then(IOI => this.setState((prevState) => {
        return {IOIs: prevState.IOIs.map(prevIOI => prevIOI.id === IOI.id ? IOI : prevIOI)}
      }))
    this.setState({IOI: false})
  }

  editIOI = (IOI_id) => {
    const IOI = this.state.IOIs.find(IOI => IOI.id === IOI_id)
    this.setState({ IOI })
  }

  destroyIOI = (IOI_id) => {
    Adaptors.DestroyIOI(IOI_id)
    .then(IOI => this.setState((prevState) => {
      return {IOIs: prevState.IOIs.filter(prevIOI => prevIOI.id !== IOI_id)}
    }))
  }

  getNegotiations = (id) => {
    Adaptors.PrincipalNegotiations(id)
      .then(negotiations => {
        this.setState({ ratings: [] })
        this.setState({ negotiations })
        negotiations.forEach(neg => this.getRating(neg.id, id))
      })
  }

  getRating = (neg_id, prin_id) =>
    Adaptors.GetRating(neg_id, prin_id)
      .then(rating => this.setState((prevState) => {
        return {ratings: [...prevState.ratings, rating]}
      }))

  updateRating = (neg_id, prin_id, rating) =>
    Adaptors.UpdateNegPrincipalRating(neg_id, prin_id, rating)
    .then(negPrincipal => this.setState((prevState) => {
      return { ratings: prevState.ratings.map(prevRating => {
        if (prevRating.neg_id === negPrincipal.negotiation_id) prevRating.rating = negPrincipal.rating
        return prevRating
      })}
    })).then(this.getSponsors(prin_id))

  resetIOIProp = () => this.setState({IOI: false})

  render() {

    return (
      <Grid container relaxed>
        <Grid.Row>
          <PrincipalsHeader principalSubmit={this.principalSubmit} principals={this.state.principals} />
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column width='8'>
            <IOIForm
              stocks={this.state.stocks}
              sponsors={this.state.sponsors}
              IOI={this.state.IOI}
              resetIOIProp={this.resetIOIProp}
              updateIOI={this.updateIOI}
              createIOI={this.createIOI}
              destroyIOI={this.destroyIOI}
              principal={this.state.principal_id}
            />
            <Divider hidden/>
            <IOIList
              IOIs={this.state.IOIs}
              editIOI={this.editIOI}
              destroyIOI={this.destroyIOI}
              principal={this.state.principal_id}
              />
          </Grid.Column>
          <Grid.Column width='8'>
            <SponsorsList
              sponsors={this.state.sponsors}
            />
            <Divider hidden/>
            <PrincipalsNegotiations
              negotiations={this.state.negotiations}
              principal={this.state.principal_id}
              getNegotiations={this.getNegotiations}
              updateRating={this.updateRating}
              ratings={this.state.ratings}
            />
          </Grid.Column>
        </Grid.Row>
    </Grid>
    )
  }

}

export default PrincipalsPage
