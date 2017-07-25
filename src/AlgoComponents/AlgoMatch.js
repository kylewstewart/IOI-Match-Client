import React, { Component } from 'react'
import { Header, Segment, Divider } from 'semantic-ui-react'

import AlgoMatchTable from './AlgoMatchTable'

class AlgoMatch extends Component{
  constructor(){
    super()
    this.state = {
      buyIOIs: [],
      sellIOIs: [],
      maxCol: 1,
      stock: ''
    }
  }

  componentWillReceiveProps = (nextProps) => (
    this.setState({
      buyIOIs: nextProps.match.filter(ioi => ioi.side === 'Buy'),
      sellIOIs: nextProps.match.filter(ioi => ioi.side === 'Sell'),
      maxCol: !nextProps.match[0] ? 1 : Math.max(...nextProps.match.map(ioi => ioi.ranked_agents.length)),
      stock: !nextProps.match[0] ? '' : nextProps.match[0].exch_code
    })
  )

  render(){
    const { buyIOIs, sellIOIs, maxCol, stock } = this.state

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
