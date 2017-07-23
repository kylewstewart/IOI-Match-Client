import React, { Component } from 'react'
import { Segment, Divider, Header, List } from 'semantic-ui-react'


class AlgoMatchCommon extends Component{

  common = () => !this.props.common ? [{id: 1, name: '-'}] : this.props.common


  render(){
    const common = this.common()

    return (
      <Segment>
          <Header > Most Common Brokers </Header>
          <Divider />
          <Segment basic>
            <Segment textAlign='center'>
              <List horizontal divided relaxed>
                {common.map(agent => (
                  <List.Item key={agent.id}> {agent.name} </List.Item>
                ))}
              </List>
            </Segment>
        </Segment>
      </Segment>
    )
  }
}

export default AlgoMatchCommon
