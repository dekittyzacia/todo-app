import React, { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Timer from '../timer'

const Task = ({ label, createTime, onDeleted, done, onToggleDone, leftTime, id, onTimer, editItem }) => {
  const [editState, setEditState] = useState(false)
  const [inputValue, setInputValue] = useState('')

  let taskClasses = classNames({
    completed: done,
    editing: editState,
  })

  const editTask = () => {
    if (inputValue) {
      editItem(id, inputValue)
      setEditState(false)
      setInputValue('')
    }
  }

  const toggleEditing = () => {
    setEditState(!editState)
    setInputValue(label)
  }

  const onChangeInputValue = (e) => {
    setInputValue(e.target.value)
  }

  return (
    <li className={taskClasses}>
      <div className="view">
        <input className="toggle" type="checkbox" onChange={onToggleDone} defaultChecked={done}></input>
        <label>
          <span className="title">{label}</span>
          <Timer leftTime={leftTime} id={id} onTimer={onTimer} done={done} />
          <span className="description">{`created ${formatDistanceToNow(Date.parse(createTime), {
            includeSeconds: true,
          })} ago`}</span>
        </label>
        <button className="icon icon-edit" onClick={toggleEditing}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
      <form onSubmit={editTask}>
        <input type="text" className="edit" onChange={(e) => onChangeInputValue(e)} autoFocus value={inputValue} />
      </form>
    </li>
  )
}

export default Task

Task.defaultProps = {
  createTime: new Date(),
  done: false,
  id: Math.trunc(Math.random() * 10),
  label: 'task',
  timer: 0,
  editItem: () => {},
  onDeleted: () => {},
  onToggleDone: () => {},
}

Task.propTypes = {
  createTime: PropTypes.string,
  done: PropTypes.bool,
  id: PropTypes.string,
  label: PropTypes.string,
  editItem: PropTypes.func,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
}
