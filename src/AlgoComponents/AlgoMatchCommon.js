import React, { Component } from 'react'
import { Segment, Container, Header, List } from 'semantic-ui-react'


class AlgoMatchCommon extends Component{

  common = () => !this.props.common ? [{id: 1, name: '-'}] : this.props.common


  render(){
    const common = this.common()

    return (
      <Segment secondary>
          <Header as='h3' floated='left'> Most Common Broker(s): </Header>
          <Container textAlign='center'>
            <List horizontal divided relaxed>
              {common.map(agent => (
                <List.Item key={agent.id} > {agent.name} </List.Item>
              ))}
            </List>
        </Container>
      </Segment>
    )
  }
}

export default AlgoMatchCommon
