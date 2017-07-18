import React from 'react'
import { Table, Header } from 'semantic-ui-react'

const AlgoMatchTable = (props) => (
  <div>
  <Header as='h5'> {props.header} </Header>
  <Table fixed>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell textAlign='left'> Investor </Table.HeaderCell>
        <Table.HeaderCell
          textAlign='center'
          colSpan={props.maxCol}
          >
          Ranked Brokers </Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {props.iois.map(ioi => (
        <Table.Row key={ioi.id}>
          <Table.Cell textAlign='left'> {ioi.name} </Table.Cell>
          {[...Array(props.maxCol).keys()].map(i => (
            <Table.Cell textAlign='center'>
              {!ioi.ranked_agents[i] ? '-' : ioi.ranked_agents[i]}
            </Table.Cell>
          ))}
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
</div>

)

export default AlgoMatchTable


// {ioi.ranked_agents.map(agent => (
//   <Table.Cell textAlign='center'> {agent} </Table.Cell>
// ))}
