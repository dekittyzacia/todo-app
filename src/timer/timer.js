import React, { Component } from 'react'

export default class Timer extends Component {
  timer = null

  state = {
    currentTimer: this.props.leftTime,
  }

  startTimer = () => {
    if (!this.timer && this.state.currentTimer) {
      this.timer = setInterval(this.timerCount, 1000)
    }
  }

  stopTimer = () => {
    clearInterval(this.timer)
    this.timer = false
  }

  timerCount = () => {
    const { currentTimer } = this.state
    if (!currentTimer || this.props.done) {
      this.stopTimer()
      return
    }
    this.setState({
      currentTimer: currentTimer - 1,
    })
    this.props.onTimer(this.props.id, currentTimer - 1)
  }

  timerView = (time) => {
    let minutes = Math.floor(time / 60)
    minutes = (minutes + '').length == 1 ? `0${minutes}` : minutes
    let seconds = Math.floor(time % 60)
    seconds = (seconds + '').length == 1 ? `0${seconds}` : seconds
    return `${minutes}:${seconds}`
  }

  render() {
    const { currentTimer } = this.state

    return (
      <span className="description">
        <button className="icon icon-play" onClick={this.startTimer}></button>
        <button className="icon icon-pause" onClick={this.stopTimer}></button>
        <span className="timertext">{this.timerView(currentTimer)}</span>
      </span>
    )
  }
}
