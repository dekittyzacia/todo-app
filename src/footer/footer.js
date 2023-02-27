import React from 'react'
import PropTypes from 'prop-types'

import FooterTaskFilter from '../footer-tasks-filter'

const buttonData = [
  { filter: 'all', label: 'All' },
  { filter: 'active', label: 'Active' },
  { filter: 'completed', label: 'Completed' },
]

const Footer = ({ activeItemsLeft, onClearCompleted, onChangeFilter }) => {
  const buttons = buttonData.map((item) => {
    const { filter, label } = item

    return <FooterTaskFilter onChangeFilter={() => onChangeFilter(filter)} key={filter} label={label} />
  })

  return (
    <footer className="footer">
      <span className="todo-count">{activeItemsLeft} items left</span>
      <ul className="filters">{buttons}</ul>
      <button className="clear-completed" onClick={onClearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer

Footer.propTypes = {
  itemsLeft: PropTypes.number,
  onChangeFilter: PropTypes.func,
  onClearCompleted: PropTypes.func,
}

Footer.defaultProps = {
  itemsLeft: 0,
  onChangeFilter: () => {},
  onClearCompleted: () => {},
}
