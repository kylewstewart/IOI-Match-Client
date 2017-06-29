import React, { Component } from 'react'
import { Adaptors } from '../Adaptors/index'
import IOIList from '../IOIList'
import SponsorsList from '../SponsorsList'

class PrincipalsPage extends Component {
  constructor(){
    super()
    this.state = {
      IOIs: [],
      sponsors: [],
      principal_id: 1
    }
  }

  componentDidMount(){
    this.getIOIs(this.state.principal_id)
    this.getSponsors(this.state.principal_id)
  }

  getIOIs(principal_id) {
    Adaptors.IOIs(principal_id)
    .then(IOIs =>this.setState({IOIs}))
  }

  getSponsors(principal_id) {
    Adaptors.Sponsors(principal_id)
      .then(sponsors => this.setState({sponsors}))
  }

  render() {
    return (
      <div>
       <IOIList IOIs={this.state.IOIs} />
       <SponsorsList sponsors={this.state.sponsors} />

      </div>
    )
  }

}
export default PrincipalsPage
