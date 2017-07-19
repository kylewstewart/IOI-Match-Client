import React from 'react'
import { Segment, Container, Table, Header } from 'semantic-ui-react'


function AlgoMatchHeader(props){

  const { stock } = props

  return (


    <Segment>
      <Header> Match Details </Header>
      <Table fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width='1'></Table.HeaderCell>
            <Table.HeaderCell textAlign='left'> Stock: </Table.HeaderCell>
            <Table.HeaderCell textAlign='left'> {stock} </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    </Segment>
  )
}

export default AlgoMatchHeader
