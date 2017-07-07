import React, { Component } from 'react'
import { Container, Segment, Header, Table } from 'semantic-ui-react'

class SponsorsList extends Component {

  sponsors = () => {
    const blank = [{
      id: 1,
      agent_name: '-',
      pct_traded: '-',
      satisfaction: '-'
    }]
    if (!this.props.sponsors || !this.props.sponsors.length) return blank
    return this.props.sponsors
  }

  render(){
    return (
      <Container>
        <Segment.Group>
          <Segment>
            <Header textAlign='left'>Sponsors</Header>
          </Segment>
          <Segment>
            <Table >
              <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign='center'> Broker </Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>Conversion</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>Satisfaction</Table.HeaderCell>
              </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.sponsors().map((sponsor) =>
                <Table.Row key={sponsor.id}>
                <Table.Cell textAlign='center'>
                  {sponsor.agent_name}
                </Table.Cell>
                <Table.Cell textAlign='center'>
                  {sponsor.pct_traded}
                </Table.Cell>
                <Table.Cell textAlign='center'>
                  {sponsor.satisfaction}
                </Table.Cell>
                </Table.Row>
                )}
              </Table.Body>
            </Table>
          </Segment>
        </Segment.Group>
      </Container>
    )
  }
}
export default SponsorsList
