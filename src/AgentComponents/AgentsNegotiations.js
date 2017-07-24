import _ from 'lodash'
import React, { Component } from 'react'
import { Segment, Grid, Divider, Table, Header, Button } from 'semantic-ui-react'

class AgentsNegotiations extends Component {
  constructor(){
    super()
    this.state = {
      data: [],
      column: null,
      direction: null,
      keys: ['exch_code'],
      headers: ['Stock']
    }
  }

  componentWillReceiveProps = (nextProps) => (
    this.setState({
      data: nextProps.negotiations.filter(neg => !!neg.active)
    })
  )

  handleClick = () => this.props.getNegotiations(this.props.agent)

  handleEdit = (e, {value}) => this.props.negotiationDetail(value)

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending'
      })
    } else {
      this.setState({
        data: data.reverse(),
        direction: direction === 'ascending' ? 'descending' : 'ascending'
      })
    }
  }

  render() {
    const { column, direction, data, keys, headers } = this.state

    return (
      <Segment>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Header floated='left'> Negotiations </Header>
            </Grid.Column>
            <Grid.Column>
              <Button
                disabled={!this.props.agent}
                floated='right' icon='refresh'
                onClick={this.handleClick}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider />
        <Segment basic>

          <Table sortable celled fixed>
            <Table.Header>
              <Table.Row>
                {keys.map((key, index) => (
                  <Table.HeaderCell
                    key={key}
                    textAlign='center'
                    sorted={column === key ? direction : null}
                    onClick={this.handleSort(key)}
                    >
                      { headers[index] }
                  </Table.HeaderCell>
                ))}
                <Table.HeaderCell textAlign='center'> Details </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map((row, rowIndex) => (
                <Table.Row key={rowIndex}>
                  {keys.map((key, keyIndex) => (
                    <Table.Cell
                      key={rowIndex + keyIndex}
                      textAlign='center'
                      >
                        { row[key] }
                    </Table.Cell>
                  ))}
                    <Table.Cell textAlign='center'>
                      <Button
                        icon='external'
                        disabled={!this.props.agent}
                        value={row.id}
                        onClick={this.handleEdit}
                      />
                    </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

        </Segment>
      </Segment>
    )
  }

}

export default AgentsNegotiations
