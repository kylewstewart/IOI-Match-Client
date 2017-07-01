
import React, { Component } from 'react'
import { Adaptors } from '../Adaptors/index'
import IOIList from '../IOIList'
import SponsorsList from '../SponsorsList'
import IOIForm from '../IOIForm'

class PrincipalsPage extends Component {
  constructor(){
    super()
    this.state = {
      IOIs: [],
      sponsors: [],
      stocks: [],
      IOI: '',
      principal_id: 3
    }
    this.editIOI = this.editIOI.bind(this)
  }

  componentDidMount(){
    this.getIOIs(this.state.principal_id)
    this.getSponsors(this.state.principal_id)
    this.getStocks()
  }

  // componentWillUpdate()

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

  editIOI(IOI_id){
    const IOI = this.state.IOIs.find(IOI => IOI.id === IOI_id)
    this.setState({ IOI })
  }

  render() {
    return (
      <div>
        <IOIForm stocks={this.state.stocks} sponsors={this.state.sponsors}
          IOI={this.state.IOI}/>
        <IOIList IOIs={this.state.IOIs} editIOI={this.editIOI}/>
        <SponsorsList sponsors={this.state.sponsors} />

      </div>
    )
  }

}
export default PrincipalsPage
