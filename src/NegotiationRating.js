import React, { Component } from 'react'
import { Rating } from 'semantic-ui-react'

class NegotiationRating extends Component {
  constructor(props){
    super(props)
    this.state = {
      rating: props.rating}
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.rating !== this.state.rating) this.setState({ rating: nextProps.rating })
  }

  handleRate = (e, { rating }) => {
    this.setState({ rating })
    this.props.updateRating(this.props.negID, this.props.prinID, rating)
  }

  render = () =>
    (
      <Rating
        maxRating={5}
        rating={this.state.rating}
        onRate={this.handleRate}
        disabled={this.props.rating === null}
        clearable
      />
    )
}

export default NegotiationRating