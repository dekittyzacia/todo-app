import React from "react";
import Task from "../task";
import PropTypes from 'prop-types';

const TaskList = ({ todoData, onDeleted, onToggleDone, editItem }) => {

    const tasks = todoData.map(item => {

        const { id, ...itemProps} = item;

        return (
            <Task {...itemProps}
                  onDeleted={() => onDeleted(id)}
                  onToggleDone={() => onToggleDone(id)}
                  editItem={editItem}
                  id={id}
                  key={id} />
        )
    })

    return (
        <ul className='todo-list'>
            {tasks}
        </ul>
    )
}

TaskList.defaultProps = {
    editItem: () => {},
    onDeleted: () => {},
    onToggleDone: () => {},
    todoData: {}
}

TaskList.propTypes = {
    editItem: PropTypes.func,
    onDeleted: PropTypes.func,
    onToggleDone: PropTypes.func,
    todoData: PropTypes.arrayOf(PropTypes.shape({
        createTime: PropTypes.object,
        done: PropTypes.bool,
        id: PropTypes.number,
        label: PropTypes.string
    }))
}

export default TaskList;