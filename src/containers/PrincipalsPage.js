
import React, { Component } from 'react'
import { Grid, Divider } from 'semantic-ui-react'
import { Adaptors } from '../Adaptors/index'
import IOIList from '../IOIList'
import SponsorsList from '../SponsorsList'
import IOIForm from '../IOIForm'
import PrincipalsNegotiations from '../PrincipalsNegotiations'
import PrincipalsHeader from '../PrincipalsHeader'


class PrincipalsPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      IOIs: [],
      sponsors: [],
      stocks: [],
      IOI: false,
      principal_id: '',
      negotiations: [],
      principals: []
    }
    this.editIOI = this.editIOI.bind(this)
    this.destroyIOI = this.destroyIOI.bind(this)
    this.updateIOI = this.updateIOI.bind(this)
    this.createIOI = this.createIOI.bind(this)
    this.resetIOIProp = this.resetIOIProp.bind(this)
    this.getExchCode = this.getExchCode.bind(this)
    this.getAgentName = this.getAgentName.bind(this)
    this.principalSubmit = this.principalSubmit.bind(this)
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

  getIOIs(principal_id){
    Adaptors.IOIs(principal_id)
    .then(IOIs =>this.setState({IOIs}))
  }

  getSponsors(principal_id){
    Adaptors.Sponsors(principal_id)
      .then(sponsors => this.setState({sponsors}))
  }

  getStocks(){
    Adaptors.Stocks()
      .then(stocks => this.setState({stocks}))
  }

  getPrincipals(){
    Adaptors.Principals()
      .then(principals => this.setState({ principals}))
  }

  createIOI(IOI){
    Adaptors.CreateIOI(IOI, this.state.principal_id)
      .then(IOI => this.setState((prevState) => {
        return { IOIs: [...prevState.IOIs, IOI] }
      }))
    this.setState({IOI: false})
  }

  updateIOI(IOI){
    Adaptors.UpdateIOI(IOI)
      .then(IOI => this.setState((prevState) => {
        return {IOIs: prevState.IOIs.map(prevIOI => prevIOI.id === IOI.id ? IOI : prevIOI)}
      }))
    this.setState({IOI: false})
  }

  editIOI(IOI_id){
    const IOI = this.state.IOIs.find(IOI => IOI.id === IOI_id)
    this.setState({ IOI })
  }

  destroyIOI(IOI_id){
    Adaptors.DestroyIOI(IOI_id)
    .then(IOI => this.setState((prevState) => {
      return {IOIs: prevState.IOIs.filter(prevIOI => prevIOI.id !== IOI_id)}
    }))
  }

  getNegotiations(principal_id){
    Adaptors.PrincipalNegotiations(principal_id)
      .then(negotiations => this.setState({negotiations}))
  }

  getExchCode = (stock_id) => !this.state.stocks.length ? 'n/a' : this.state.stocks.filter(stock => stock.id === stock_id)[0].exch_code

  getAgentName = (agent_id) => this.state.sponsors.filter(sponsor => sponsor.agent_id === agent_id)[0]




  resetIOIProp = () => this.setState({IOI: false})

  render() {

    return (
      <Grid>
      <PrincipalsHeader principalSubmit={this.principalSubmit} principals={this.state.principals}/>

      <Grid.Row columns={3}>
        <Grid.Column width='5'>
          <IOIList
            IOIs={this.state.IOIs}
            editIOI={this.editIOI}
            destroyIOI={this.destroyIOI}
            />
        </Grid.Column>
        <Grid.Column width='6'>
          <IOIForm
            stocks={this.state.stocks}
            sponsors={this.state.sponsors}
            IOI={this.state.IOI}
            resetIOIProp={this.resetIOIProp}
            updateIOI={this.updateIOI}
            createIOI={this.createIOI}
            destroyIOI={this.destroyIOI}
            />
          <Divider hidden/>
          <SponsorsList
            sponsors={this.state.sponsors}
            />
        </Grid.Column>
        <Grid.Column width='5'>
          <PrincipalsNegotiations
            negotiations={this.state.negotiations}
            getExchCode={this.getExchCode}
            getAgentName={this.getAgentName}
            />
        </Grid.Column>
      </Grid.Row>
    </Grid>
    )
  }

}

export default PrincipalsPage
