import React from 'react'
import { Container, Table, Header } from 'semantic-ui-react'


function AlgoMatchHeader(props){

  const { stock } = props

  return (
    <Container>
      <Header> Match Details </Header>
      <Table fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign='center'> Stock: </Table.HeaderCell>
            <Table.HeaderCell> {stock} </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>

    </Container>
  )
}

export default AlgoMatchHeader
