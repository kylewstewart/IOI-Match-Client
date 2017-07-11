import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'

import Text from '../Text'
import AboutHeader from '../AboutHeader'

class About extends Component {

  render(){

    return (
      <Grid container relaxed>
        <Grid.Row>
          <AboutHeader />
        </Grid.Row>
        <Grid.Row>
          <Text />
        </Grid.Row>

      </Grid>
    )
  }

}

export default About
