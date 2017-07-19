import React, { Component } from 'react'
import { Container, Table, Header } from 'semantic-ui-react'


class AlgoMatchCommon extends Component{

  common = () => !this.props.common ? [{id: 1, name: '-'}] : this.props.common


  render(){
    const common = this.common()

    return (
      <Container>
        <Header as='h5'> Most Common Broker(s) </Header>
        <Table fixed>
          <Table.Body>
            <Table.Row>
              {common.map(agent => (
                <Table.Cell key={agent.id} textAlign='center'> {agent.name} </Table.Cell>
              ))}
            </Table.Row>
          </Table.Body>
        </Table>


      </Container>
    )
  }
}

export default AlgoMatchCommon
