import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class NewTaskForm extends Component {
  static defaultProps = {
    onItemAdded: () => {},
  }

  static propTypes = {
    onItemAdded: PropTypes.func,
  }

  state = {
    label: '',
    timerMin: '',
    timerSec: '',
  }

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  onFormSubmit = (e) => {
    e.preventDefault()
    console.log('submit!')
    const { label, timerMin, timerSec } = this.state

    //if (label.trim() !== '') return

    const leftTime = +timerMin * 60 + +timerSec

    this.props.onItemAdded(label, leftTime)
    this.setState({
      label: '',
      timerMin: '',
      timerSec: '',
    })
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit} className="new-todo-form">
        <input type="submit" hidden /> {/*пашла нахуй дура */}
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          name={'label'}
          onChange={this.onInputChange}
          value={this.state.label}
        ></input>
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          autoFocus
          type="number"
          name={'timerMin'}
          onChange={this.onInputChange}
          value={this.state.timerMin}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          autoFocus
          type="number"
          name={'timerSec'}
          onChange={this.onInputChange}
          value={this.state.timerSec}
        ></input>
      </form>
    )
  }
}
