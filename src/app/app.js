import React, { Component } from 'react'

import TaskList from '../task-list'
import NewTaskForm from '../new-task-form'
import Footer from '../footer'

export default class App extends Component {
  maxId = 10

  state = {
    todoData: [this.createTask('First task'), this.createTask('Second task'), this.createTask('Third task')],

    currentFilter: 'all',
  }

  createTask(label) {
    return {
      label,
      createTime: new Date(),
      done: false,
      id: this.maxId++,
    }
  }

  deleteItem = (id) => {
    this.setState((state) => {
      const i = state.todoData.findIndex((el) => el.id === id)

      const newData = [...state.todoData.slice(0, i), ...state.todoData.slice(i + 1)]

      return {
        todoData: newData,
      }
    })
  }

  toggleProperty(arr, id, propName) {
    const index = arr.findIndex((el) => el.id === id)
    const oldItem = arr[index]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }

    return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)]
  }

  addItem = (text) => {
    const newItem = this.createTask(text)

    this.setState((state) => {
      const newState = [newItem, ...state.todoData]
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
    switch (filter) {
      case 'all': {
        return items
      }

      case 'active': {
        return items.filter((item) => !item.done)
      }

      case 'completed': {
        return items.filter((item) => item.done)
      }

      default: {
        return items
      }
    }
  }

  editItem = (id, text) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((el) => el.id === id)
      const currentItem = todoData.filter((el) => el.id === id)[0]
      currentItem.label = text

      return [...todoData.slice(0, index), currentItem, ...todoData.slice(index + 1)]
    })
  }

  render() {
    const { todoData, currentFilter } = this.state
    const leftTodo = todoData.filter((el) => !el.done).length

    const renderingItems = this.filterTasks(todoData, currentFilter)

    return (
      <section className="todoapp">
        <NewTaskForm onItemAdded={this.addItem} />
        <section className="main">
          <TaskList
            todoData={renderingItems}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            editItem={this.editItem}
          />
          <Footer itemsLeft={leftTodo} onClearCompleted={this.clearCompleted} onChangeFilter={this.onChangeFilter} />
        </section>
      </section>
    )
  }
}
