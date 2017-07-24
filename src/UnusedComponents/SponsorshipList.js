import React, { Component } from 'react'
import { Segment, Divider, Header, Table } from 'semantic-ui-react'

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
      <Segment>
        <Header textAlign='left'> Sponsorships </Header>
        <Divider />
        <Segment basic>
          <Table >
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell textAlign='center'>Investor</Table.HeaderCell>
                <Table.HeaderCell textAlign='center'>Conversion</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.sponsorships().map((sponsorship) =>
                <Table.Row key={sponsorship.id}>
                  <Table.Cell textAlign='center'>
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
      </Segment>
    )
  }

}

export default SponsorshipList
