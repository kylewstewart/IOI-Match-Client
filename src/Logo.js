
import React from 'react'
import { Container, Grid, Header } from 'semantic-ui-react'

const Logo = () => (
  <Container>
  <Grid>
    <Grid.Row columns={1}>
      <Grid.Column width={16}>
        <Header textAlign='centered' as='H2'>
          IOI Match
        </Header>
      </Grid.Column>
    </Grid.Row>
  </Grid>
  </Container>
)

export default Logo
