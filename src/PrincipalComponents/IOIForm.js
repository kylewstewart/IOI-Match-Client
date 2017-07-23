
import React, { Component } from 'react'
import { Divider, Container, Button, Segment, Header, Form } from 'semantic-ui-react'

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

    if (nextProps.principal !== this.props.principal) this.props.resetIOIProp()
  }

  handleChange = (e, {name, value}) => this.setState({[name]: value})

  onSubmitButton = () => {
    this.state.disableButton ? this.props.createIOI(this.setIOI()) : this.props.updateIOI(this.setIOI())
    this.props.resetIOIProp()
  }

  onClearBrokersButton = () => this.setState({rankedAgents: []})

  onNewButton = () => this.props.resetIOIProp()

  handleDestroy = (e, {value}) => {
    this.props.destroyIOI(value)
    this.props.resetIOIProp()
  }

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
      <Segment>
        <Header> {this.state.title} </Header>
        <Divider />
        <Segment basic>
          <Form>
            <Form.Select
              value={this.state.side}
              placeholder='Side'
              name='side'
              options={sideOptions}
              onChange={this.handleChange}
              disabled={!this.props.sponsors.length}
              />
            <Form.Dropdown search selection
              value={this.state.stock}
              placeholder='Stock'
              name='stock'
              options={stockOptions}
              onChange={this.handleChange}
              disabled={!this.props.sponsors.length}
              />
            <Container>
              <Form.Group >
                <Form.Dropdown multiple selection
                  closeOnChange={true}
                  value={this.state.rankedAgents}
                  placeholder='Ranked Brokers'
                  name='rankedAgents'
                  options={sponsorsOptions}
                  onChange={this.handleChange}
                  disabled={!this.props.sponsors.length}
                  />
                <Form.Button
                  icon='erase'
                  onClick={this.onClearBrokersButton}
                  disabled={!this.state.rankedAgents.length}
                  />
              </Form.Group>
            </Container>
            <Button
              name='submit'
              content="Submit"
              value={this.state.disableButton}
              onClick={this.onSubmitButton}
              disabled={!this.state.side || !this.state.stock || !this.state.rankedAgents.length}
              />
            <Button
              name='newIOI'
              disabled={this.state.disableButton}
              content="New"
              onClick={this.onNewButton}
              />
            <Button
              icon='trash'
              value={this.props.IOI.id}
              disabled={!this.props.IOI}
              onClick={this.handleDestroy}
              />
          </Form>
        </Segment>
      </Segment>
    )
  }


}

export default IOIForm
