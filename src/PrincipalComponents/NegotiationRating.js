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
    this.props.updateRating(this.props.negPrinID, {rating: rating})
  }

  render = () =>
    (
      <Rating
        size='tiny'
        maxRating={5}
        rating={this.state.rating}
        onRate={this.handleRate}
        disabled={this.state.rating === 0}
        clearable={false}
      />
    )
}

export default NegotiationRating
