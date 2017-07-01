import React, { Component } from 'react'
import { Container, Dropdown, Button, Segment, Header, Form } from 'semantic-ui-react'

class IOIForm extends Component {
  constructor(){
    super()
    this.state ={
      side: 'Buy',
      stock: '',
      sponsors: []

    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e, {name, value}) {
    this.setState({[name]: value})
  }

  stockOptions() {
    const stocks = this.props.stocks.map(s => s.exch_code).sort()
    return stocks.map(s => {
      const el = {}
      el.key = `${s}`
      el.value = `${s}`
      el.text = `${s}`
      return el
     })
     return stocks
    }

    sponsorOptions() {
      const sponsors = this.props.sponsors.map(sp => sp.name).sort()
      return sponsors.map(sp => {
        const el = {}
        el.key = `${sp}`
        el.value = `${sp}`
        el.text = `${sp}`
        return el
      })
      return sponsors
    }


  render(){
    const sideOptions = [
      {key: 'Buy', value: 'Buy', text: 'Buy'},
      {key: 'Sell', value: 'Sell', text: 'Sell'}
      ]
    // const rankedBrokers = this.props.IOI.ranked_agents.map(agent => agent.name)



    return (
    <Segment.Group>
      <Segment>
        <Header> IOI Detail </Header>
      </Segment>
      <Segment>
        <Form>
          <Form.Dropdown placeholder='Ranked Brokers' name='sponsor' multiple selection
            options={this.sponsorOptions()} onChange={this.handleChange}/>
          <Form.Group inline>
            <Form.Select placeholder='Side' name='side'
              options={sideOptions} onChange={this.handleChange}/>
            <Form.Dropdown placeholder='Stock' name='stock' search selection
              options={this.stockOptions()} onChange={this.handleChange}/>
            <Form.Button content="Submit" />
          </Form.Group>
        </Form>

    </Segment>
    </Segment.Group>
    )
  }


}

export default IOIForm
