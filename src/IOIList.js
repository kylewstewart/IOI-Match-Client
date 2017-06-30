
import React, { Component } from 'react'
import { Header, Button, Segment, List, Dropdown, Table, Flag } from 'semantic-ui-react'

class IOIList extends Component {
  constructor(){
    super()
    this.state = {
      side: 'All',
      status: 'All',
      country: 'All'
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e, {name, value}){
    this.setState({[name]: value})
  }

  handleEdit(e, {value}){
    debugger
    this.props.editIOI(value)
  }

  filterBySide(IOIs){
    if(this.state.side !== 'All') {
      return IOIs.filter(IOI => this.state.side === IOI.side)
    } else {
      return IOIs
    }
  }

  filterByStatus(IOIs){
    if(this.state.status !=='All'){
      return IOIs.filter(IOI => this.state.status === IOI.active)
    } else {
      return IOIs
    }
  }

  getIOIs(){
    return this.filterByStatus(this.filterBySide(this.props.IOIs))
  }

  getIOINames(){
    const IOIs = this.getIOIs()
    return IOIs.map(IOI => IOI.stock.name).sort()
  }

  render() {
    const side = this.state.side
    const status = this.state.status
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
    <Segment.Group compact>
      <Segment>
        <Header textAlign='centered'>
          IOIs
        </Header>
      </Segment>
      <Segment>
        <Dropdown icon='filter' compact labeled floating button className='icon'
          options={countryOptions} placeholder='Dom' name="country"  onChange={this.handleChange} />
        <Dropdown icon='filter' compact labeled floating button className='icon'
          options={sideOptions} placeholder='Side' name='side' onChange={this.handleChange} />
        <Dropdown icon='filter' compact labeled floating button className='icon'
          options={statusOptions} placeholder='Status' name='status' onChange={this.handleChange} />
      </Segment>
      <Segment>
        <Table compact textAlign='center'>
          {IOIs.map(IOI => (
            <Table.Row>
              <Table.Cell > <Flag name='us'/>  </Table.Cell>
              <Table.Cell> {IOI.side} </Table.Cell>
              <Table.Cell> {IOI.stock.name} </Table.Cell>
              <Table.Cell> {IOI.active} </Table.Cell>
              <Table.Cell>
                <Button icon='edit' attached='left' value={IOI.id} onClick={this.handleEdit}/>
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
