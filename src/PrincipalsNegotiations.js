import React, { Component } from 'react'
import { Segment, Table, Header } from 'semantic-ui-react'


class PrincipalsNegotiations extends Component {



  render() {

    const { negotiations } = this.props

    return (
      <Segment.Group>
        <Segment>
          <Header textAlign='left'>
            Negotiations
          </Header>
        </Segment>
        <Segment>
          <Table compact textAlign='center'>
            <Table.Header></Table.Header>
            <Table.Body>
            {negotiations.map(negotiation => (
              <Table.Row key={negotiation.id}>
                <Table.Cell> {this.props.getExchCode(negotiation.stock_id)} </Table.Cell>
                <Table.Cell> {this.props.getAgentName(negotiation.agent_id)} </Table.Cell>
                <Table.Cell> {!!negotiation.active ? "Active" : "Completed"} </Table.Cell>
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
