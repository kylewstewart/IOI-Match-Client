
import React, { Component } from 'react'
import { Header, Button, Segment, List, Dropdown, Table, Flag } from 'semantic-ui-react'

class IOIList extends Component {
  constructor(){
    super()
    this.state = {side: 'All', status: 'All', country: 'All'}
    this.handleChange = this.handleChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  handleChange = (e, {name, value}) => this.setState({[name]: value})

  handleEdit = (e, {value}) => this.props.editIOI(value)

  filterBySide = (IOIs) => this.state.side !== 'All' ?
    IOIs.filter(IOI => this.state.side === IOI.side) : IOIs

  filterByStatus = (IOIs) => this.state.status !=='All' ?
    IOIs.filter(IOI => this.state.status === IOI.active) : IOIs

  getIOIs = () => this.filterByStatus(this.filterBySide(this.props.IOIs))
    .sort((a, b) => a.stock.name.localeCompare(b.stock.name))

  render() {
    const IOIs = this.getIOIs()
    const sideOptions = [
      {key: 'Buy', value: 'Buy', text: 'Buy'},
      {key: 'Sell', value: 'Sell', text: 'Sell'},
      {key: 'All', value: 'All', text: 'All'},
    ]
    const statusOptions = [
      {key: 'Active', value: 'Active', text: 'Active'},
      {key: 'Expired', value: 'Expired', text: 'Expired'},
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
            <Dropdown compact labeled button
              className='icon'
              options={statusOptions}
              placeholder={this.state.status}
              name='status'
              onChange={this.handleChange} />
          </Button.Group>
        </Segment>
        <Segment>
          <Table compact textAlign='center'>
            <Table.Header></Table.Header>
            {IOIs.map(IOI => (
              <Table.Row>
                <Table.Cell > <Flag name='us'/>  </Table.Cell>
                <Table.Cell> {IOI.stock.name} </Table.Cell>
                <Table.Cell> {IOI.side} </Table.Cell>
                <Table.Cell> {IOI.active} </Table.Cell>
                <Table.Cell>
                  <Button icon='edit' attached='left' value={IOI.id}
                    onClick={this.handleEdit}/>
                  <Button icon='delete' attached='right'/>
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

// <List items={IOIs} textAlign />

// <Form>
// </Form>
// <Form.Field control={Radio} label='Active' active='Active' checked={active === 'Active'} onChange={this.handleActiveChange} />
// <Form.Field control={Radio} label='Expired' active='Expired' checked={active === 'Expired'} onChange={this.handleActiveChange} />
// <Form.Field control={Radio} label='All' active='All' checked={active === 'All'} onChange={this.handleActiveChange} />
// <Form.Group inline>
//   <Form.Field control={Radio} label='Buy' side='Buy' checked={side === 'Buy'} onChange={this.handleSideChange} />
//   <Form.Field control={Radio} label='Sell' side='Sell' checked={side === 'Sell'} onChange={this.handleSideChange} />
//   <Form.Field control={Radio} label='All' side='All' checked={side === 'All'} onChange={this.handleSideChange} />
// </Form.Group>
