import React, { Component } from 'react'
import { Header, Segment, Divider } from 'semantic-ui-react'

import AlgoMatchTable from './AlgoMatchTable'

class AlgoMatch extends Component{

  iois = (side) => (
    !this.props.match ? [{id: 1, name: '-', exch_code: '-', ranked_agents: ['-']}] : this.props.match.filter(ioi => ioi.side === side)
  )

  maxLength = () => (
    !this.props.match ? 1 : Math.max(...this.props.match.map(ioi => ioi.ranked_agents.length))
  )

  render(){
    const buyIOIs = this.iois("Buy")
    const sellIOIs = this.iois("Sell")
    const stock = buyIOIs[0].exch_code
    const maxCol = this.maxLength()

    return(
      <Segment>
        <Header> Match Details </Header>
        <Header as='h4'> {stock} </Header>
        <Divider/>
        <AlgoMatchTable
          header={"Buyers"}
          maxCol={maxCol}
          iois={buyIOIs}
        />
        <Divider/>
        <AlgoMatchTable
          header={"Sellers"}
          maxCol={maxCol}
          iois={sellIOIs}
        />
      </Segment>
    )
  }

}

export default AlgoMatch
