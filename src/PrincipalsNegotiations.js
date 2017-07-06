import React, { Component } from 'react'
import { Segment, Table, Header } from 'semantic-ui-react'


class PrincipalsNegotiations extends Component {

  negotiations = (status) => {
    const blank = [{
      id: 1,
      exch_code: '-',
      agent_name: '-',
      active: '-'
    }]

    if (!this.props.negotiations || !this.props.negotiations.length) return blank
    const negotiations = this.props.negotiations.filter(neg => neg.active === status)
    if (!negotiations.length) return blank
    const sorted_negotiations = negotiations.sort((a, b) => a.exch_code.localeCompare(b.exch_code))
    return sorted_negotiations
  }

  sortAlpha = (array) => array.sort((a, b) => a.exch_code.localeCompare(b.exch_code))

  render() {

    return (
      <Segment.Group>
        <Segment>
          <Header textAlign='left'>
            Negotiations
          </Header>
        </Segment>
        <Segment>
          <Header textAlign='left' as='h5'>
            Active
          </Header>
          <Table compact >
            <Table.Header></Table.Header>
            <Table.Body>
            {this.negotiations('Active').map(negotiation => (
              <Table.Row key={negotiation.id}>
                <Table.Cell textAlign='center'> {negotiation.exch_code} </Table.Cell>
                <Table.Cell textAlign='center'> {negotiation.agent_name} </Table.Cell>
                <Table.Cell textAlign='center'> {negotiation.active} </Table.Cell>
              </Table.Row>
            ))}
            </Table.Body>
          </Table>
        </Segment>
        <Segment>
          <Header textAlign='left' as='h5'>
            Completed
          </Header>
          <Table compact textAlign='center'>
            <Table.Header></Table.Header>
            <Table.Body>
            {this.negotiations('Completed').map(negotiation => (
              <Table.Row key={negotiation.id}>
                <Table.Cell textAlign='center'> {negotiation.exch_code} </Table.Cell>
                <Table.Cell textAlign='center'> {negotiation.agent_name} </Table.Cell>
                <Table.Cell textAlign='center'> {negotiation.active} </Table.Cell>
              </Table.Row>
            ))}
            </Table.Body>
          </Table>
        </Segment>
      </Segment.Group>
    )
  }
}

export default PrincipalsNegotiations



// <Button.Group>
//   <Dropdown compact labeled button
//     className='icon'
//     options={countryOptions}
//     placeholder={this.state.country}
//     name="country"
//     onChange={this.handleChange} />
// </Button.Group>

// <Table.Cell>
//   <Button
//     icon='edit'
//     attached='left'
//     value={IOI.id}
//     onClick={this.handleEdit}
//     />
//   <Button
//     icon='delete'
//     attached='right'
//     value={IOI.id}
//     onClick={this.handleDestroy}
//     />
// </Table.Cell>
