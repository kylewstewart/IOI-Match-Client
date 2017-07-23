import React, { Component } from 'react'
import { Grid, Divider, Segment, Header, Button } from 'semantic-ui-react'

import CompletedNegotiations from './CompletedNegotiations'
import ActiveNegotiations from './ActiveNegotiations'

class PrincipalsNegotiations extends Component {

  handleClick = () => this.props.getNegotiations(this.props.principal)

  negotiations = (status) => {
    const blank = [ {id: 1, exch_code: '-', agent_name: '-', active: '-', rating: null} ]
    if (!this.props.negotiations || !this.props.negotiations.length) return blank
    const negotiations = this.props.negotiations.filter(neg => neg.active === status)
    if (!negotiations.length) return blank
    return negotiations
  }

  render() {

    return (
      <Segment clearing>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header floated='left'> Negotiations </Header>
            </Grid.Column>
            <Grid.Column>
              <Button
                disabled={!this.props.principal}
                floated='right'
                icon='refresh'
                onClick={this.handleClick}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider />
        <ActiveNegotiations
          negotiations={this.negotiations('Active')}
        />
        <CompletedNegotiations
          negotiations={this.negotiations('Completed')}
          updateRating={this.props.updateRating}
          principal={this.props.principal}
          ratings={this.props.ratings}
        />
      </Segment>
    )
  }
}

export default PrincipalsNegotiations
