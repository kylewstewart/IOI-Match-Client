import React from 'react'
import { Segment, Table, Header } from 'semantic-ui-react'

function AlgoMatchTable(props){

  const { maxCol, header, iois } = props

  return (
    <Segment basic>
      <Header as='h4'> {header} </Header>
      <Table >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign='center'> Investor </Table.HeaderCell>
            <Table.HeaderCell textAlign='center' colSpan={maxCol}> Ranked Brokers </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {iois.map(ioi => (
            <Table.Row key={ioi.id}>
              <Table.Cell width={5} textAlign='center'> {ioi.name} </Table.Cell>
                {[...Array(maxCol).keys()].map(i => (
                  <Table.Cell key={i} textAlign='center'>
                    {!ioi.ranked_agents[i] ? '-' : ioi.ranked_agents[i]}
                  </Table.Cell>
                ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Segment>
  )
}

export default AlgoMatchTable
