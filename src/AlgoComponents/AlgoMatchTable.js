import React from 'react'
import { Container, Table, Header } from 'semantic-ui-react'


function AlgoMatchTable(props){

  const { maxCol, header, iois } = props

  return (
    <Container>
      <Header as='h5'> {header} </Header>
      <Table fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width='1'></Table.HeaderCell>
            <Table.HeaderCell textAlign='left'> Investor </Table.HeaderCell>
            <Table.HeaderCell textAlign='center' colSpan={maxCol}> Ranked Brokers </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {iois.map(ioi => (
            <Table.Row key={ioi.id}>
              <Table.Cell width='1'></Table.Cell>
              <Table.Cell textAlign='left'> {ioi.name} </Table.Cell>
                {[...Array(maxCol).keys()].map(i => (
                  <Table.Cell key={i} textAlign='center'>
                    {!ioi.ranked_agents[i] ? '-' : ioi.ranked_agents[i]}
                  </Table.Cell>
                ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Container>
  )
}

export default AlgoMatchTable
