
import React, { Component } from 'react'
import { List, Form, Radio } from 'semantic-ui-react'

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

  handleSideChange(e,{side}){
    this.setState({side})
  }

  handleActiveChange(e,{active}){
    this.setState({active})
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

    return (
    <div>
      <Form>
        <Form.Group inline>
          <Form.Field control={Radio} label='Buy' side='Buy' checked={side === 'Buy'} onChange={this.handleSideChange} />
          <Form.Field control={Radio} label='Sell' side='Sell' checked={side === 'Sell'} onChange={this.handleSideChange} />
          <Form.Field control={Radio} label='All' side='All' checked={side === 'All'} onChange={this.handleSideChange} />
        </Form.Group>
      </Form>

      <Form>
        <Form.Group inline>
          <Form.Field control={Radio} label='Active' active='Active' checked={active === 'Active'} onChange={this.handleActiveChange} />
          <Form.Field control={Radio} label='Expired' active='Expired' checked={active === 'Expired'} onChange={this.handleActiveChange} />
          <Form.Field control={Radio} label='All' active='All' checked={active === 'All'} onChange={this.handleActiveChange} />
        </Form.Group>
      </Form>

      <List items={IOIs} textAlign='left' />
    </div>


    )
  }
}

export default IOIList
