import React from 'react'
import { Segment, Table, Checkbox, Header } from 'semantic-ui-react'

function AgentNegotiationTable(props){

  const { principals, header, negotiation } = props

  return (
    <Segment basic>
      <Header as='h5' > {header} </Header>
      <Table fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign='center'> Principal </Table.HeaderCell>
            <Table.HeaderCell textAlign='center'> Traded </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {principals.map(principal => (
            <Table.Row key={principal.id}>
              <Table.Cell textAlign='center'>{principal.name}</Table.Cell>
              <Table.Cell textAlign='center'>
                <Checkbox value={principal.id} onClick={props.handleClick}
                  disabled={!negotiation}
                  checked={principal.traded === null ? false : principal.traded}
                  defaultIndeterminate={principal.traded === null} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Segment>
  )
}

export default AgentNegotiationTable
