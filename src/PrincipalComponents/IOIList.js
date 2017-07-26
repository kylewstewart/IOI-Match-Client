
import React, { Component } from 'react'
import { Header, Divider, Segment, Dropdown } from 'semantic-ui-react'

import IOIListTable from './IOIListTable'

class IOIList extends Component {
  constructor(){
    super()
    this.state = {
      side: 'All',
      filtered_IOIs: []
    }
  }

  componentWillReceiveProps = (nextProps) => this.setState({filtered_IOIs: nextProps.IOIs})

  handleChange = (e, { value }) => (
    this.setState({
      side: value,
      filtered_IOIs: value !== 'All' ? this.props.IOIs.filter(IOI => value === IOI.side) : this.props.IOIs
    })
  )

  handleEdit = (e, {value}) => this.props.editIOI(value)

  filterBySide = (IOIs) => this.state.side !== 'All' ? IOIs.filter(IOI => this.state.side === IOI.side) : IOIs

  render() {
    const { IOIs } = this.props
    const { filtered_IOIs } = this.state

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
              onChange={this.handleChange}
              disabled={!IOIs.length}
              />
            <IOIListTable
              data={filtered_IOIs}
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
