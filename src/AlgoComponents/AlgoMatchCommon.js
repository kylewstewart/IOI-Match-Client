import React, { Component } from 'react'
import { Segment, Container, Header, List } from 'semantic-ui-react'


class AlgoMatchCommon extends Component{

  common = () => !this.props.common ? [{id: 1, name: '-'}] : this.props.common


  render(){
    const common = this.common()

    return (
      <Segment>
          <Header > Most Common Broker(s): </Header>
          <Container textAlign='center'>
            <Segment>
              <List horizontal divided relaxed>
                {common.map(agent => (
                  <List.Item key={agent.id}> {agent.name} </List.Item>
                ))}
              </List>
            </Segment>
        </Container>
      </Segment>
    )
  }
}

export default AlgoMatchCommon
