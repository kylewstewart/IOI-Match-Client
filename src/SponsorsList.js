import React from 'react'
import { Segment, Header, Table } from 'semantic-ui-react'

const SponsorsList = (props) => (
  <Segment.Group>
    <Segment>
      <Header textAlign='left'>
        Sponsors
      </Header>
    </Segment>
    <Segment>
    <Table textAlign='center'>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>Conversion</Table.HeaderCell>
          <Table.HeaderCell>Satisfaction</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {props.sponsors.map((sponsor, index) =>
          <Table.Row key={index}>
            <Table.Cell >
              {sponsor.name}
            </Table.Cell>
            <Table.Cell>
              {sponsor.pct_traded ? sponsor.pct_traded: "N/A" }
            </Table.Cell>
            <Table.Cell>
              {sponsor.satisfaction ? sponsor.satisfaction: "N/A" }
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
    </Segment>
  </Segment.Group>
)

export default SponsorsList
