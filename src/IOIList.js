
import React, { Component } from 'react'
import { Container, Header, Button, Segment, Dropdown, Table, Flag } from 'semantic-ui-react'

class IOIList extends Component {
  constructor(){
    super()
    this.state = {
      side: 'All',
      country: 'All'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  handleChange = (e, {name, value}) => this.setState({[name]: value})

  handleEdit = (e, {value}) => this.props.editIOI(value)

  handleDestroy = (e, {value}) => this.props.destroyIOI(value)

  filterBySide = (IOIs) => this.state.side !== 'All' ?
    IOIs.filter(IOI => this.state.side === IOI.side) : IOIs

  IOIs = () => {
    const blank = [
      { id: 1, stock: '-', flag: 'flag outline', side: '-' }
    ]

    if (!this.props.IOIs || !this.props.IOIs.length) return blank
    return this.filterBySide(this.props.IOIs).sort((a, b) => a.stock.localeCompare(b.stock))
  }

  render() {
    const sideOptions = [
      {key: 'Buy', value: 'Buy', text: 'Buy'},
      {key: 'Sell', value: 'Sell', text: 'Sell'},
      {key: 'All', value: 'All', text: 'All'},
    ]

    const countryOptions = [
      { key: 'US', value: 'US', flag: 'us', text: 'US'}
    ]

    return (
      <Container>
        <Segment.Group>
          <Segment>
            <Header textAlign='left'> IOIs </Header>
          </Segment>
          <Segment>
            <Dropdown compact labeled button
              className='icon'
              options={countryOptions}
              placeholder={this.state.country}
              name="country"
              onChange={this.handleChange}
            />
            <Dropdown compact labeled button
              className='icon'
              options={sideOptions}
              placeholder={this.state.side}
              name='side'
              onChange={this.handleChange}
            />
        <Table compact textAlign='center'>
          <Table.Header>
            <Table.HeaderCell textAlign='center'> Country </Table.HeaderCell>
            <Table.HeaderCell textAlign='center'> Stock </Table.HeaderCell>
            <Table.HeaderCell textAlign='center'> Side </Table.HeaderCell>
            <Table.HeaderCell textAlign='center'> Edit/Del </Table.HeaderCell>

          </Table.Header>
          <Table.Body>
          {this.IOIs().map(IOI => (
          <Table.Row key={IOI.id}>
            <Table.Cell > <Flag name='us'/>  </Table.Cell>
            <Table.Cell> {IOI.stock} </Table.Cell>
            <Table.Cell> {IOI.side} </Table.Cell>
            <Table.Cell>
              <Button
                icon='edit'
                attached='left'
                value={IOI.id}
                onClick={this.handleEdit}
              />
              <Button
                icon='delete'
                attached='right'
                value={IOI.id}
                onClick={this.handleDestroy}
              />
            </Table.Cell>
          </Table.Row>
          ))}
          </Table.Body>
        </Table>
        </Segment>
        </Segment.Group>
      </Container>
    )
  }
}

export default IOIList
