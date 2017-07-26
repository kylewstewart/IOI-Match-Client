import React from 'react'
import { Container, Table } from 'semantic-ui-react'


function AlgoRankedVotingRound(props){
  const { votes, canidates, winner, loser } = props.round

  return (
    <Container>
      <Table fixed definition celled>
        <Table.Body>
          <Table.Row>
            <Table.Cell
              width={5}
              content='Canidates'
              />
              {canidates.map(canidate => (
                <Table.Cell
                  key={canidate}
                  textAlign='center'
                  content={canidate}
                  />
              ))}
          </Table.Row>
          <Table.Row>
            <Table.Cell
              width={5}
              content='Votes'
              />
              {canidates.map(agent => (
                <Table.Cell
                  key={agent}
                  textAlign='center'
                  content={!votes[agent] ? '-' : votes[agent]}
                  />
              ))}
          </Table.Row>
          <Table.Row>
            <Table.Cell
              width={5}
              content='Winner'
              />
            <Table.Cell
              textAlign='center'
              colSpan={canidates.length}
              content=  {!winner ? '-' : winner}
              />
          </Table.Row>
          <Table.Row>
            <Table.Cell
              width={5}
              content='Loser'
              />
            <Table.Cell
              textAlign='center'
              colSpan={canidates.length}
              content=  {!loser ? '-' : loser}
              />
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  )
}

export default AlgoRankedVotingRound
