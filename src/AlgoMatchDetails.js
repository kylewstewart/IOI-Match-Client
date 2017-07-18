import React, { Component } from 'react'
import { Table, Header, Container, Segment, Divider } from 'semantic-ui-react'
import AlgoMatchTable from './AlgoMatchTable'

class AlgoMatchDetails extends Component{

  iois = (side) => (
    !this.props.match ? [{id: 1, name: '-', ranked_agents: ['-']}] : this.props.match.filter(ioi => ioi.side === side)
  )

  maxLength = () => (
    !this.props.match ? 1 : Math.max(...this.props.match.map(ioi => ioi.ranked_agents.length))
  )

  render(){
    return(
      <Container>
        <Segment>
          <Header> Match Details </Header>
          <Table fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign='center'> Stock: </Table.HeaderCell>
                <Table.HeaderCell> {this.iois("Buy")[0].exch_code} </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
          </Table>
          <Divider/>
          <AlgoMatchTable
            header={"Buyers"}
            maxCol={this.maxLength()}
            iois={this.iois("Buy")}
          />
          <Divider/>
          <AlgoMatchTable
            header={"Sellers"}
            maxCol={this.maxLength()}
            iois={this.iois("Sell")}
          />
        <Divider/>

        </Segment>
      </Container>
    )
  }


}

export default AlgoMatchDetails
