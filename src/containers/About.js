import React, { Component } from 'react'
import { Grid } from 'semantic-ui-react'

import AboutText from '../AboutComponents/AboutText'
import AboutHeader from '../AboutComponents/AboutHeader'

class About extends Component {

  render(){

    return (
      <Grid container relaxed>
        <Grid.Row>
          <AboutHeader />
        </Grid.Row>
        <Grid.Row>
          <AboutText />
        </Grid.Row>

      </Grid>
    )
  }

}

export default About
