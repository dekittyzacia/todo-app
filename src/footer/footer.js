import React, {Component} from "react";
import FooterTaskFilter from "../footer-tasks-filter";
import PropTypes from 'prop-types';

export default class Footer extends Component {

    static defaultProps = {
        itemsLeft: 0,
        onChangeFilter: () => {},
        onClearCompleted: () => {}
    }

    static propTypes = {
        itemsLeft: PropTypes.number,
        onChangeFilter: PropTypes.func,
        onClearCompleted: PropTypes.func
    }

    buttonData = [
        {filter: 'all', label: 'All'},
        {filter: 'active', label: 'Active'},
        {filter: 'completed', label: 'Completed'}
    ]    

    render() {
        const { itemsLeft, onClearCompleted, onChangeFilter } = this.props; 

        const buttons = this.buttonData.map(item => {

            const { filter, label } = item;

            return (
                <FooterTaskFilter onChangeFilter={() => onChangeFilter(filter)}
                                  key={filter}
                                  label={label}/>
            )
        })

        return (
            <footer className='footer'>
                <span className='todo-count'>{itemsLeft} items left</span>
                <ul className='filters'>
                    {buttons}
                </ul>
                <button className='clear-completed'
                        onClick={onClearCompleted}>Clear completed</button>
            </footer>
        )
    }
}