import React, { Component } from 'react'
import { Adaptors } from '../Adaptors/index'
import IOIList from '../IOIList'

class PrincipalsPage extends Component {
  constructor(){
    super()
    this.state = {
      IOIs: [],
      principal_id: 1
    }
  }

  componentDidMount(){
    this.getIOIs(this.state.principal_id)
  }

  getIOIs(id) {
    Adaptors.IOIs(id).then( IOIs =>
      this.setState({ IOIs: IOIs}))

  }

  render() {
    const IOIs = this.state.IOIs

    return (
      <div>
        <IOIList IOIs={IOIs} />
      </div>

    )
  }


}

export default PrincipalsPage
