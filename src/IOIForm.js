
import React, { Component } from 'react'
import { Dropdown, Button, Segment, Header, Form } from 'semantic-ui-react'

class IOIForm extends Component {
  constructor(){
    super()
    this.state = {
      sponsors: [],
      title: 'New IOI',
      side: '',
      stock: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.IOI) {
      this.setState({title: "Edit IOI"})
      this.setState({sponsors: nextProps.IOI.ranked_agents.map(agent => agent.name)})
      this.setState({side: nextProps.IOI.side})
      this.setState({stock: nextProps.IOI.stock.name})
    } else {
      this.setState({IOIFormTitle: "New IOI"})
      this.setState({sponsors: []})
      this.setState({side: ''})
      this.setState({stock: ''})
    }
  }

  handleChange = (e, {name, value}) => {
    this.setState({[name]: value})
    console.log (name, value)
  }

  stocks = () => (
     this.props.stocks.map(s => {
        let obj = {key:`${s.exch_code}`, value:`${s.exch_code}`, text:`${s.exch_code}`}
        return obj
    }))

  sponsors = () => (
    this.props.sponsors.map(sp => {
      let obj = {key:`${sp.name}`, value:`${sp.name}`, text:`${sp.name}`}
      return obj
    }))


  sortAlpha = (array) => array.sort((a, b) => a.text.localeCompare(b.text))

  render(){
    const sideOptions = [
      {key: 'Buy', value: 'Buy', text: 'Buy'},
      {key: 'Sell', value: 'Sell', text: 'Sell'}
      ]
    const stockOptions = this.sortAlpha(this.stocks())
    const sponsorsOptions =this.sortAlpha(this.sponsors())

    return (
    <Segment.Group>
      <Segment>
        <Header> {this.state.title} </Header>
      </Segment>
      <Segment>
        <Form>
          <Form.Select
            value={this.state.side}
            placeholder='Side'
            name='side'
            options={sideOptions}
            onChange={this.handleChange}
          />
          <Form.Dropdown search selection
            value={this.state.stock}
            placeholder='Stock'
            name='stock'
            options={stockOptions}
            onChange={this.handleChange}
          />
          <Form.Dropdown multiple selection
            value={this.state.sponsors}
            placeholder='Ranked Brokers'
            name='sponsors'
            options={sponsorsOptions}
            onChange={this.handleChange}
          />
            <Form.Button content="Submit" />
        </Form>

    </Segment>
    </Segment.Group>
    )
  }


}

export default IOIForm
