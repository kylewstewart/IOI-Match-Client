import React, { Component } from 'react'
import { Segment, Divider, Header, List } from 'semantic-ui-react'


class AlgoMatchCommon extends Component{

  // common = () => !this.props.common[0] ? [{id: 1, name: 'No Common Broker'}] : this.props.common


  render(){
    const { common, match } = this.props
    // const common = this.common()

    return (
      <Segment>
          <Header
            content=' Most Common Brokers'
            />
          <Divider />
          {!match[0] ? null : (
            <Segment basic>
              <Segment textAlign='center'>
                <List
                  horizontal
                  divided
                  relaxed
                  as='h3'
                  >
                  {common.map(agent => (
                    <List.Item
                      key={agent.id}
                      content={agent.name}
                      />
                  ))}
                </List>
              </Segment>
            </Segment>
          )}
      </Segment>
    )
  }
}

export default AlgoMatchCommon
