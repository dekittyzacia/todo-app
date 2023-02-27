import React, { useState } from 'react'
import PropTypes from 'prop-types'

const NewTaskForm = ({ onItemAdded }) => {
  const [label, setLabel] = useState('')
  const [timerMin, setTimerMin] = useState('')
  const [timerSec, setTimerSec] = useState('')

  const stateFunctions = {
    label: setLabel,
    timerMin: setTimerMin,
    timerSec: setTimerSec,
  }

  const onInputChange = (e) => {
    stateFunctions[e.target.name](e.target.value)
  }

  const onFormSubmit = (e) => {
    e.preventDefault()
    const leftTime = +timerMin * 60 + +timerSec

    onItemAdded(label, leftTime)
    setLabel('')
    setTimerMin('')
    setTimerSec('')
  }

  return (
    <form onSubmit={onFormSubmit} className="new-todo-form">
      <input type="submit" hidden />
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        name={'label'}
        onChange={onInputChange}
        value={label}
      ></input>
      <input
        className="new-todo-form__timer"
        placeholder="Min"
        autoFocus
        type="number"
        name={'timerMin'}
        onChange={onInputChange}
        value={timerMin}
      />
      <input
        className="new-todo-form__timer"
        placeholder="Sec"
        autoFocus
        type="number"
        name={'timerSec'}
        onChange={onInputChange}
        value={timerSec}
      ></input>
    </form>
  )
}

export default NewTaskForm

NewTaskForm.defaultProps = {
  onItemAdded: () => {},
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func,
}
