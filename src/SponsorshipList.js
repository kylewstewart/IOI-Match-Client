import React, { Component } from 'react'
import { Segment, Header, Table } from 'semantic-ui-react'

class SponsorshipList extends Component {

  sponsorships = () => {
    const blank = [{
      id: 1,
      principal_name: '-',
      pct_traded: '-'
    }]
    if(!this.props.sponsorships || !this.props.sponsorships.length) return blank
    return this.props.sponsorships.sort((a, b) => a.principal_name.localeCompare(b.principal_name))
  }

  render() {

    return(
      <Segment.Group>
        <Segment>
          <Header textAlign='left'>
            Sponsorships
          </Header>
        </Segment>
        <Segment>
        <Table >
          <Table.Header>
            <Table.Row>

              <Table.HeaderCell textAlign='center'>Conversion</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.sponsorships().map((sponsorship) =>
              <Table.Row key={sponsorship.id}>
                <Table.Cell textAlign='left'>
                  {sponsorship.principal_name}
                </Table.Cell>
                <Table.Cell textAlign='center'>
                  {sponsorship.pct_traded}
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        </Segment>
      </Segment.Group>
    )
  }

}

export default SponsorshipList
