import React, { Component } from "react";
import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';

export default class Task extends Component {

    static defaultProps = {
        createTime: new Date(),
        done: false,
        id: (Math.trunc(Math.random() * 10)),
        label: 'task',
        editItem: () => {},
        onDeleted: () => {},
        onToggleDone: () => {}
    }

    static propTypes = {
        createTime: PropTypes.object,
        done: PropTypes.bool,
        id: PropTypes.number,
        label: PropTypes.string,
        editItem: PropTypes.func,
        onDeleted: PropTypes.func,
        onToggleDone: PropTypes.func
    }
    
    state = {
        editing: false,
        inputValue: ''
    }

    toggleEditing = () => {
        this.setState({
            editing: !this.state.editing
        })
    }

    editTask = (e) => {
        e.preventDefault();
        if (this.state.inputValue) {
            this.props.editItem(this.props.id, this.state.inputValue)
            this.setState({
                editing: false,
                inputValue: ''
            })
        } 
    }

    onChangeInputValue = (e) => {
        this.setState({
            inputValue: e.target.value
        })
    }

    render() {
        const { label, createTime, onDeleted, done, onToggleDone } = this.props;

        let classNames;

        if (done) {
            classNames = 'completed'
        }

        if (this.state.editing) {
            classNames = 'editing'
        }

        return (
            <li className={classNames}>
                <div className='view'>
                <input className='toggle' 
                       type='checkbox'  
                       onChange={onToggleDone}
                       defaultChecked={done}></input>
                <label>
                    <span className='description'>{label}</span>
                    <span className='created date'>{`created ${formatDistanceToNow(createTime, {includeSeconds: true})} ago`}</span>
                </label>
                <button className='icon icon-edit'
                        onClick={this.toggleEditing}></button>
                <button className='icon icon-destroy'
                        onClick={onDeleted}></button>
             </div>
             <form onSubmit={this.editTask}>
                <input type='text' 
                       className='edit' 
                       placeholder={`Old name is ${label}. New is...`} 
                       onChange={this.onChangeInputValue}
                       autoFocus 
                       value={this.state.inputValue}/>
             </form>
            </li>
        )
    }
}