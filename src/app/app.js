import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import TaskList from '../task-list'
import NewTaskForm from '../new-task-form'
import Footer from '../footer'

const App = () => {
  const [todoData, setTodoData] = useState([])
  const [currentFilter, setCurrentFilter] = useState('all')

  // useEffect(() => {
  //   if (localStorage.getItem('data')) {
  //     setTodoData(JSON.parse(localStorage.getItem('data')))
  //   }
  // }, [])

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(todoData))
  }, [todoData])

  const createTask = (label, leftTime) => {
    return {
      label,
      createTime: new Date().toJSON(),
      done: false,
      id: uuidv4(),
      leftTime,
    }
  }

  const deleteItem = (id) => {
    setTodoData((todoData) => {
      return todoData.filter((el) => el.id !== id)
    })
  }

  const toggleProperty = (arr, id, propName) => {
    return arr.map((item) => {
      if (item.id === id) {
        return { ...item, [propName]: !item[propName] }
      }
      return item
    })
  }

  const addItem = (text, leftTime) => {
    setTodoData((todoData) => {
      const newState = [...todoData]
      const newItem = createTask(text, leftTime)
      newState.unshift(newItem)
      return newState
    })
  }

  const onToggleDone = (id) => {
    setTodoData((todoData) => {
      toggleProperty(todoData, id, 'done')
    })
  }

  const clearCompleted = () => {
    setTodoData(todoData.filter((el) => !el.done))
  }

  const onChangeFilter = (filter) => {
    setCurrentFilter(filter)
  }

  const filterTasks = (items, filter) => {
    const filters = {
      all: 'all',
      active: 'active',
      completed: 'completed',
    }

    switch (filter) {
      case filters.all: {
        return items
      }

      case filters.active: {
        return items.filter((item) => !item.done)
      }

      case filters.completed: {
        return items.filter((item) => item.done)
      }

      default: {
        return items
      }
    }
  }

  const editItem = (id, text) => {
    setTodoData(() => {
      todoData.map((item) => {
        if (item.id === id) {
          return { ...item, label: text }
        }
        return item
      })
    })
  }

  const onTimer = (id, leftTime) => {
    setTodoData((todoData) => {
      return todoData.map((item) => {
        if (item.id === id) {
          return { ...item, leftTime: leftTime }
        }
        return item
      })
    })
  }

  const activeItemsLeft = todoData.filter((el) => !el.done).length
  const renderingItems = filterTasks(todoData, currentFilter)

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onItemAdded={addItem} />
      </header>
      <section className="main">
        <TaskList
          onTimer={onTimer}
          todoData={renderingItems}
          onDeleted={deleteItem}
          onToggleDone={onToggleDone}
          editItem={editItem}
        />
        <Footer activeItemsLeft={activeItemsLeft} onClearCompleted={clearCompleted} onChangeFilter={onChangeFilter} />
      </section>
    </section>
  )
}

export default App
