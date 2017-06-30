
import React, { Component } from 'react'
import { Header, Segment, List, Dropdown, Table } from 'semantic-ui-react'

class IOIList extends Component {
  constructor(){
    super()
    this.state = {
      side: 'All',
      active: 'All'
    }
    this.handleSideChange = this.handleSideChange.bind(this)
    this.handleActiveChange = this.handleActiveChange.bind(this)
  }

  handleSideChange(e, obj){
    this.setState({side: obj.value})
    console.log(obj)
  }

  handleActiveChange(e, obj){
    this.setState({active: obj.value})
  }

  filterBySide(IOIs){
    if(this.state.side !== 'All') {
      return IOIs.filter(IOI => this.state.side === IOI.side)
    } else {
      return IOIs
    }
  }

  filterByActive(IOIs){
    if(this.state.active !=='All'){
      return IOIs.filter(IOI => this.state.active === IOI.active)
    } else {
      return IOIs
    }
  }

  getIOIs(){
    return this.filterByActive(this.filterBySide(this.props.IOIs))
  }

  getIOINames(){
    const IOIs = this.getIOIs()
    return IOIs.map(IOI => IOI.stock.name).sort()
  }

  render() {
    const side = this.state.side
    const active = this.state.active
    const IOIs = this.getIOINames()
    const sideOptions = [
      {key: 'Buy', value: 'Buy', text: 'Buy'},
      {key: 'Sell', value: 'Sell', text: 'Sell'},
      {key: 'All', value: 'All', text: 'All'},
    ]
    const activeOptions = [
      {key: 'Active', value: 'Active', text: 'Active'},
      {key: 'Expired', value: 'Expired', text: 'Expired'},
      {key: 'All', value: 'All', text: 'All'},
    ]

    return (
    <Segment.Group>
      <Segment>
        <Header textAlign='centered'>
          Your IOIs
        </Header>
      </Segment>
      <Segment textAlign='centered'>
        <Dropdown icon='filter' labeled floating button className='icon'
          options={sideOptions} placeholder='Side' onChange={this.handleSideChange} />
        <Dropdown icon='filter' labeled floating button className='icon'
          options={activeOptions} placeholder='Status' onChange={this.handleActiveChange} />
      </Segment>
      <Segment>
        <List items={IOIs} textAlign='left' as='h3' />
      </Segment>


    </Segment.Group>


    )
  }
}

export default IOIList

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
