import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'

import TaskList from '../task-list'
import NewTaskForm from '../new-task-form'
import Footer from '../footer'

export default class App extends Component {
  state = {
    todoData: [],

    currentFilter: 'all',
  }

  componentDidMount() {
    if (localStorage.getItem('data')) {
      this.setState(() => {
        return {
          todoData: JSON.parse(localStorage.getItem('data')),
        }
      })
    }
  }

  componentDidUpdate() {
    localStorage.setItem('data', JSON.stringify(this.state.todoData))
  }

  createTask(label, leftTime) {
    return {
      label,
      createTime: new Date().toJSON(),
      done: false,
      id: uuidv4(),
      leftTime,
    }
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const newData = todoData.filter((el) => el.id !== id)

      return {
        todoData: newData,
      }
    })
  }

  toggleProperty(arr, id, propName) {
    return arr.map((item) => {
      if (item.id === id) {
        return { ...item, [propName]: !item[propName] }
      }
      return item
    })
  }

  addItem = (text, leftTime) => {
    this.setState(({ todoData }) => {
      const newState = [...todoData]
      const newItem = this.createTask(text, leftTime)
      newState.unshift(newItem)
      return {
        todoData: newState,
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done'),
      }
    })
  }

  clearCompleted = () => {
    const { todoData } = this.state
    const newArray = todoData.filter((el) => !el.done)

    this.setState({
      todoData: newArray,
    })
  }

  onChangeFilter = (filter) => {
    this.setState({
      currentFilter: filter,
    })
  }

  filterTasks = (items, filter) => {
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

  editItem = (id, text) => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.map((item) => {
          if (item.id === id) {
            return { ...item, label: text }
          }
          return item
        }),
      }
    })
  }

  onTimer = (id, leftTime) => {
    this.setState(({ todoData }) => {
      return {
        todoData: todoData.map((item) => {
          if (item.id === id) {
            return { ...item, leftTime: leftTime }
          }
          return item
        }),
      }
    })
  }

  render() {
    const { todoData, currentFilter } = this.state
    const activeItemsLeft = todoData.filter((el) => !el.done).length

    const renderingItems = this.filterTasks(todoData, currentFilter)

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onItemAdded={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            todoData={renderingItems}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            editItem={this.editItem}
            onTimer={this.onTimer}
          />
          <Footer
            activeItemsLeft={activeItemsLeft}
            onClearCompleted={this.clearCompleted}
            onChangeFilter={this.onChangeFilter}
          />
        </section>
      </section>
    )
  }
}
