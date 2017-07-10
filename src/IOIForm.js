
import React, { Component } from 'react'
import { Container, Button, Segment, Header, Form } from 'semantic-ui-react'

class IOIForm extends Component {
  constructor(){
    super()
    this.state = {rankedAgents: [], title: 'New IOI', side: '', stock: '',
      disableButton: true}
    this.handleChange = this.handleChange.bind(this)
    this.onClearBrokersButton = this.onClearBrokersButton.bind(this)
    this.onSubmitButton = this.onSubmitButton.bind(this)
    this.onNewButton = this.onNewButton.bind(this)
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.IOI) {
      this.setState({ title: "Edit IOI", rankedAgents: nextProps.IOI.ranked_agents,
        side: nextProps.IOI.side, stock: nextProps.IOI.stock, disableButton: false })
    } else {
      this.setState({ title: "New IOI", rankedAgents: [], side: '', stock: '', disableButton: true })
    }
  }

  handleChange = (e, {name, value}) => this.setState({[name]: value})

  onSubmitButton = () => this.state.disableButton ? this.props.createIOI(this.setIOI()) : this.props.updateIOI(this.setIOI())

  onClearBrokersButton = () => this.setState({rankedAgents: []})

  onNewButton = () => this.props.resetIOIProp()

  setIOI = () => {
    const IOI = { id: this.state.disableButton ? 0 : this.props.IOI.id, stock: this.state.stock,
      side: this.state.side, rankedAgents: this.state.rankedAgents }
      return IOI
    }

  stocks = () => ( this.props.stocks.map(s => {
        const obj = {key:`${s.exch_code}`, value:`${s.exch_code}`, text:`${s.exch_code}`}
        return obj
    }))

  sponsors = () => ( this.props.sponsors.map(sp => {
      const obj = {key:`${sp.id}`, value:`${sp.agent_name}`, text:`${sp.agent_name}`}
      return obj
    }))

  sortAlpha = (array) => array.sort((a, b) => a.text.localeCompare(b.text))

  render(){
    const sideOptions = [
      {key: 'Buy', value: 'Buy', text: 'Buy'},
      {key: 'Sell', value: 'Sell', text: 'Sell'}
      ]
    const stockOptions = this.sortAlpha(this.stocks())
    const sponsorsOptions = this.sortAlpha(this.sponsors())

    return (
      <Container>
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
        <Form.Dropdown multiple search selection
          value={this.state.rankedAgents}
          placeholder='Ranked Brokers'
          name='rankedAgents'
          options={sponsorsOptions}
          onChange={this.handleChange}
          />
          <Button
          name='submit'
          content="Submit"
          value={this.state.disableButton}
          onClick={this.onSubmitButton}
          />
          <Button
          content='Clear Brokers'
          onClick={this.onClearBrokersButton}
          />
          <Button
          name='newIOI'
          disabled={this.state.disableButton}
          content="New IOI"
          onClick={this.onNewButton}
          />
        </Form>
        </Segment>
        </Segment.Group>
      </Container>

    )
  }


}

export default IOIForm
