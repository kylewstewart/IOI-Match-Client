
import React, { Component } from 'react'
import { Header, Divider, Grid, Icon, Form, Button, Segment, Dropdown, Table } from 'semantic-ui-react'

class IOIList extends Component {
  constructor(){
    super()
    this.state = {
      side: 'All',
      country: 'All',
      byTime: true,
      timeAsc: false,
      byStk: false,
      stkAsc: true
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  handleChange = (e, {name, value}) => this.setState({[name]: value})

  handleEdit = (e, {value}) => this.props.editIOI(value)

  handleDestroy = (e, {value}) => this.props.destroyIOI(value)

  filterBySide = (IOIs) => this.state.side !== 'All' ? IOIs.filter(IOI => this.state.side === IOI.side) : IOIs

  IOIs = () => {
    const { byTime, timeAsc, stkAsc, byStk } = this.state
    const { IOIs } = this.props
    const blank = [{ id: 1, stock: '-', side: '-', time: '-' }]

    if (!IOIs || !IOIs.length){
      return blank
    } else if (!!byTime) {
      return this.filterBySide(IOIs).sort((a, b) => (
        !!timeAsc ? new Date('1970/01/01 ' + a.time) - new Date('1970/01/01 ' + b.time) : new Date('1970/01/01 ' + b.time) - new Date('1970/01/01 ' + a.time)
      ))
    } else if (!!byStk) {
      return this.filterBySide(IOIs).sort((a, b) => (
        !!stkAsc ? a.exch_code.localeCompare(b.exch_code) : b.exch_code.localeCompare(a.exch_code)
      ))
    }
  }

  handleChange = (e, { value }) => {
    if (value === 'byStk') {
      this.setState({byStk: true})
      this.setState({byTime: false})
    } else {
      this.setState({byStk: false})
      this.setState({byTime: true})
    }
  }

  handleStockSort = () => {
    if (!!this.state.byStk) this.setState((prevState) => ({stkAsc: !!prevState.stkAsc ? false : true }))
  }

  handleTimeSort = () => {
    if (!!this.state.byTime) this.setState((prevState) => ({timeAsc: !!prevState.timeAsc ? false : true }))
  }

  render() {
    const { byTime, timeAsc, byStk, stkAsc } = this.state

    const sideOptions = [
      {key: 'Buy', value: 'Buy', text: 'Buy'},
      {key: 'Sell', value: 'Sell', text: 'Sell'},
      {key: 'All', value: 'All', text: 'All'},
    ]


    return (
      <Segment>
        <Header textAlign='left'> IOIs </Header>
        <Divider />
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Dropdown compact labeled button
                className='icon'
                options={sideOptions}
                placeholder={this.state.side}
                name='side'
                onChange={this.handleChange}
                disabled={!this.props.IOIs.length}
                />
            </Grid.Column>
            <Grid.Column>
              <Form>
                <Form.Group>
                  <label>Sort by</label>
                  <Form.Radio label='Stock' name='radioGroup' value='byStk' checked={byStk} onChange={this.handleChange} />
                  <Form.Radio label='Time' name='radioGroup' value='byTime' checked={byTime} onChange={this.handleChange} />
                </Form.Group>
              </Form>
            </Grid.Column>

          </Grid.Row>

        </Grid>
        <Table compact textAlign='center'>
        <Table.Header>
        <Table.Row>
        <Table.HeaderCell textAlign='center'>
           Stock
           <Icon name={!stkAsc ? 'sort descending' : 'sort ascending'} disabled={!byStk} onClick={this.handleStockSort}/>
         </Table.HeaderCell>
        <Table.HeaderCell textAlign='center'> Side </Table.HeaderCell>
        <Table.HeaderCell textAlign='center'>
          Time
          <Icon name={!timeAsc ? 'sort descending' : 'sort ascending'} disabled={!byTime} onClick={this.handleTimeSort}/>
        </Table.HeaderCell>
        <Table.HeaderCell textAlign='center'> Edit </Table.HeaderCell>
        </Table.Row>
        </Table.Header>
        <Table.Body>
        {this.IOIs().map(IOI => (
        <Table.Row key={IOI.id}>
        <Table.Cell> {IOI.stock} </Table.Cell>
        <Table.Cell> {IOI.side} </Table.Cell>
        <Table.Cell> {IOI.time} </Table.Cell>
        <Table.Cell>
        <Button
        icon='edit'
        value={IOI.id}
        disabled={!this.props.principal}
        onClick={this.handleEdit}
        />
        </Table.Cell>
        </Table.Row>
        ))}
        </Table.Body>
        </Table>
      </Segment>
    )
  }
}

export default IOIList


// <Dropdown compact labeled button
//   className='icon'
//   options={countryOptions}
//   placeholder={this.state.country}
//   name="country"
//   onChange={this.handleChange}
//   disabled={!this.props.IOIs.length}
//   />
// <Table.HeaderCell textAlign='center'> Country </Table.HeaderCell>
// <Table.Cell > <Flag name='us'/>  </Table.Cell>
// const countryOptions = [
//   { key: 'US', value: 'US', flag: 'us', text: 'US'}
// ]
