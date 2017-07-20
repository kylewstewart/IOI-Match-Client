import React from 'react'
import { Container, Table } from 'semantic-ui-react'


function AlgoRankedVotingRound(props){
  const { votes, canidates, winner, loser } = props.round

  return (
    <Container>
      <Table fixed>
        <Table.Body>
          <Table.Row>
            <Table.Cell width='6'> Canidates </Table.Cell>
              {canidates.map(canidate => (
                <Table.Cell key={canidate} textAlign='center'> {canidate} </Table.Cell>
              ))}
          </Table.Row>
          <Table.Row>
            <Table.Cell width='6'> Votes </Table.Cell>
              {Object.entries(votes).map(([agent, votes]) => (
                <Table.Cell key={agent} textAlign='center'>
                  {votes}
                </Table.Cell>
              ))}
          </Table.Row>
          <Table.Row>
            <Table.Cell width='6'> Winner </Table.Cell>
            <Table.Cell textAlign='center' colSpan={canidates.length}>
                {!winner ? '-' : winner}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell width='6'> Loser </Table.Cell>
            <Table.Cell textAlign='center' colSpan={canidates.length}>
                {!loser ? '-' : loser}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Container>
  )

}

export default AlgoRankedVotingRound
