import React from 'react'
import { Table } from 'semantic-ui-react'

const SponsorsList = (props) => (
  <Table>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>Sponsor</Table.HeaderCell>
        <Table.HeaderCell>Pct Traded</Table.HeaderCell>
        <Table.HeaderCell>Satisfaction</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
    {props.sponsors.map(sponsor =>
      <Table.Row>
        <Table.Cell>
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
)

export default SponsorsList
