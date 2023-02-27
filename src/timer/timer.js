import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Timer = ({ leftTime, done, onTimer, id }) => {
  const [currentTimer, setCurrentTimer] = useState(leftTime)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (done) setIsRunning(false)
    if (!currentTimer) setIsRunning(false)
    const timer = setInterval(() => {
      if (isRunning && !done) {
        setCurrentTimer(currentTimer - 1)
      }
    }, 1000)
    if (!isRunning) clearInterval(timer)
    onTimer(id, currentTimer - 1)

    return () => clearInterval(timer)
  }, [done, isRunning, currentTimer])

  const startTimer = () => {
    setIsRunning(true)
  }

  const stopTimer = () => {
    setIsRunning(false)
  }

  const timerView = (time) => {
    let minutes = Math.floor(time / 60)
    minutes = (minutes + '').length == 1 ? `0${minutes}` : minutes
    let seconds = Math.floor(time % 60)
    seconds = (seconds + '').length == 1 ? `0${seconds}` : seconds
    return `${minutes}:${seconds}`
  }

  return (
    <span className="description">
      <button className="icon icon-play" onClick={startTimer}></button>
      <button className="icon icon-pause" onClick={stopTimer}></button>
      <span className="timertext">{timerView(currentTimer)}</span>
    </span>
  )
}

export default Timer

Timer.propTypes = {
  leftTime: PropTypes.number,
}

Timer.defaultProps = {
  leftTime: 0,
}
