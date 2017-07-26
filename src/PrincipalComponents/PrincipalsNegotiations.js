import React, { Component } from 'react'
import { Grid, Divider, Segment, Header, Button } from 'semantic-ui-react'

import CompletedNegotiationsTable from './CompletedNegotiationsTable'
import SortableTable from '../SortableTable'

class PrincipalsNegotiations extends Component {
  constructor(){
    super()
    this.state = {
      active: [],
      completed: []
    }
  }

  componentWillReceiveProps = (nextProps) => (
    this.setState({
      active: nextProps.negotiations.filter(neg => !!neg.active),
      completed: nextProps.negotiations.filter(neg => !neg.active)
    })
  )

  handleClick = () => this.props.getNegotiations(this.props.principal)

  render() {
    const { active, completed} = this.state
    const { updateRating, principal } = this.props

    return (
      <Segment clearing>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header
                floated='left'
                content='Negotiations'
                />
            </Grid.Column>
            <Grid.Column>
              <Button
                disabled={!principal}
                floated='right'
                icon='refresh'
                onClick={this.handleClick}
                />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider />
          <Segment basic>
            <Header
              as='h4'
              content='Active'
              />
            <SortableTable
              data={active}
              keys={['exch_code', 'agent_name', 'time']}
              headers={['Stock', 'Broker', 'Time']}
              />
          </Segment>
          <Segment basic>
            <Header
              as='h4'
              content='Completed'
              />
            <CompletedNegotiationsTable
              data={completed}
              keys={['exch_code', 'agent_name', 'traded', 'time']}
              headers={['Stock', 'Broker', 'Traded', 'Time']}
              updateRating={updateRating}
              />
          </Segment>
      </Segment>
    )
  }
}

export default PrincipalsNegotiations
