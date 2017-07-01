
import React, { Component } from 'react'
import { Grid, Divider } from 'semantic-ui-react'
import { Adaptors } from '../Adaptors/index'
import IOIList from '../IOIList'
import SponsorsList from '../SponsorsList'
import IOIForm from '../IOIForm'

class PrincipalsPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      IOIs: [],
      sponsors: [],
      stocks: [],
      IOI: false,
      principal_id: props.id
    }
    this.editIOI = this.editIOI.bind(this)
    this.destroyIOI = this.destroyIOI.bind(this)
    this.resetIOIProp = this.resetIOIProp.bind(this)
    this.submitIOIForm = this.submitIOIForm.bind(this)
  }

  componentDidMount(){
    this.getIOIs(this.state.principal_id)
    this.getSponsors(this.state.principal_id)
    this.getStocks()
  }

  getIOIs(principal_id) {
    Adaptors.IOIs(principal_id)
    .then(IOIs =>this.setState({IOIs}))
  }

  getSponsors(principal_id) {
    Adaptors.Sponsors(principal_id)
      .then(sponsors => this.setState({sponsors}))
  }

  getStocks() {
    Adaptors.Stocks()
      .then(stocks => this.setState({stocks}))
  }

  submitIOIForm(IOI){
    if(IOI.id){
      Adaptors.UpdateIOI(IOI)
      .then(IOI => this.setState((prevState) => {
        return {
          IOIs: prevState.IOIs.map(prevIOI => prevIOI.id === IOI.id ? IOI : prevIOI)
        }
      }
      ))
    } else {
      Adaptors.CreateIOI(IOI, this.state.principal_id)
        .then(IOI => this.setState((prevState) => {
          return {
            IOIs: [...prevState.IOIs, IOI]
          }
        })
      )
    }
    this.setState({IOI: false})
  }

  editIOI(IOI_id){
    const IOI = this.state.IOIs.find(IOI => IOI.id === IOI_id)
    this.setState({ IOI })
  }

  destroyIOI(IOI_id){
    Adaptors.DestroyIOI(IOI_id)
    .then( console.log )
  }

  resetIOIProp = () => this.setState({IOI: false})

  render() {
    return (
    <Grid.Row columns={3}>
      <Grid.Column>
        <IOIList
          IOIs={this.state.IOIs}
          editIOI={this.editIOI}
          destroyIOI={this.destroyIOI}
          />
      </Grid.Column>
      <Grid.Column>
        <IOIForm
          stocks={this.state.stocks}
          sponsors={this.state.sponsors}
          IOI={this.state.IOI}
          resetIOIProp={this.resetIOIProp}
          submitIOIForm={this.submitIOIForm}
          />
        <Divider hidden/>
        <SponsorsList
          sponsors={this.state.sponsors}
          />
      </Grid.Column>
      <Grid.Column></Grid.Column>
    </Grid.Row>
    )
  }

}
export default PrincipalsPage
