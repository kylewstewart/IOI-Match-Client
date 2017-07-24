
import React, { Component } from 'react'
import { Header, Divider, Segment, Dropdown } from 'semantic-ui-react'

import IOIListTable from './IOIListTable'

class IOIList extends Component {
  constructor(){
    super()
    this.state = {
      side: 'All'
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  handleChange = (e, {name, value}) => this.setState({[name]: value})

  handleEdit = (e, {value}) => this.props.editIOI(value)

  filterBySide = (IOIs) => this.state.side !== 'All' ? IOIs.filter(IOI => this.state.side === IOI.side) : IOIs

  IOIs = () => {
    const { IOIs } = this.props
    return this.filterBySide(IOIs)
  }

  render() {

    const sideOptions = [
      {key: 'Buy', value: 'Buy', text: 'Buy'},
      {key: 'Sell', value: 'Sell', text: 'Sell'},
      {key: 'All', value: 'All', text: 'All'},
    ]

    return(
      <Segment>
        <Header textAlign='left'> IOIs </Header>
        <Divider />
        <Segment basic>
          <Dropdown compact labeled button
            className='icon'
            options={sideOptions}
            placeholder={this.state.side}
            name='side'
            onChange={this.handleChange}
            disabled={!this.props.IOIs.length}
            />
          <IOIListTable
            data={this.IOIs()}
            keys={['stock', 'side', 'time']}
            headers={['Stock', 'Side', 'Time']}
            handleEdit={this.handleEdit}
            />
        </Segment>
      </Segment>
    )
  }
}

export default IOIList
