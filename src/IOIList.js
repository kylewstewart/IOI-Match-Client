
import React, { Component } from 'react'
import { Header, Button, Segment, Dropdown, Table, Flag } from 'semantic-ui-react'

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

  getIOIs = () => this.filterBySide(this.props.IOIs)
    .sort((a, b) => a.stock.localeCompare(b.stock))

  render() {
    const IOIs = this.getIOIs()
    const sideOptions = [
      {key: 'Buy', value: 'Buy', text: 'Buy'},
      {key: 'Sell', value: 'Sell', text: 'Sell'},
      {key: 'All', value: 'All', text: 'All'},
    ]

    const countryOptions = [
      { key: 'US', value: 'US', flag: 'us', text: 'US'}
    ]

    return (
      <Segment.Group>
        <Segment>
          <Header textAlign='left'>
            IOIs
          </Header>
        </Segment>
        <Segment>
          <Button.Group>
            <Dropdown compact labeled button
              className='icon'
              options={countryOptions}
              placeholder={this.state.country}
              name="country"
              onChange={this.handleChange} />
            <Dropdown compact labeled button
              className='icon'
              options={sideOptions}
              placeholder={this.state.side}
              name='side'
              onChange={this.handleChange} />
          </Button.Group>
        </Segment>
        <Segment>
          <Table compact textAlign='center'>
            <Table.Header></Table.Header>
            {IOIs.map(IOI => (
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
          </Table>
        </Segment>
      </Segment.Group>
    )
  }
}

export default IOIList
