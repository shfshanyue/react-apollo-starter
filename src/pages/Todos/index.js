import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { TODOS, CREATE_TODO, UPDATE_TODO } from '@query'

import _ from 'lodash'

import './index.css'

class Todos extends Component {
  constructor (props) {
    super(props) 
    this.state = {
      newTodoName: '',
      updateTodoId: -1,
      updateTodoName: '',
      updateTodoStatus: 'UNDO'
    }
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleItemKeyPress = this.handleItemKeyPress.bind(this)
    this.handleItemClick = this.handleItemClick.bind(this)
  }

  handleKeyPress (e) {
    const { newTodoName } = this.state
    if (e.charCode === 13 && newTodoName) {
      this.props.createTodo({
        variables: {
          todo: {
            name: newTodoName,
          }
        } 
      }).then(({ data }) => {
        this.setState({
          newTodoName: '' ,
        })
        this.props.refetch()
      })
    }
  }

  handleItemKeyPress (e) {
    const { updateTodoName, updateTodoId } = this.state
    if (e.charCode === 13 && updateTodoName) {
      this.props.updateTodo({
        variables: {
          todo: {
            id: updateTodoId,
            name: updateTodoName
          }
        } 
      }).then(({ data }) => {
        this.setState({
          updateTodoId: -1 
        })
        this.props.refetch()
      })
    }
  }

  handleItemClick (e) {
  
  }

  render() {
    const { todos } = this.props
    const { newTodoName, updateTodoName, updateTodoId } = this.state
    return (
      <div className="todos container">
        <input
          className="todos-input"
          placeholder="Add Todo"
          onKeyPress={this.handleKeyPress}
          onChange={e => this.setState({ newTodoName: e.target.value })}
          value={newTodoName}
        />
        <ul>
          {
            todos.map(todo => (
              <li
                className="todos-item"
                key={todo.id}
                onDoubleClick={() => this.setState({ updateTodoId: todo.id, updateTodoName: todo.name, updateTodoStatus: todo.status })}
              >
                {
                  todo.id === updateTodoId ? 
                    <input value={updateTodoName} onChange={e => this.setState({ updateTodoName: e.target.value }) } onKeyPress={this.handleItemKeyPress} /> :
                    <div style={{ textDecoration: todo.status === 'DONE' ? 'line-through' : 'normal' }} onClick={this.handleItemClick}>{ todo.name }</div>
                }
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default compose(
  graphql(TODOS, {
    props ({ data }) {
      return {
        ...data,
        todos: _.get(data, 'me.todos', []) 
      }
    }
  }),
  graphql(CREATE_TODO, {
    name: 'createTodo'
  }),
  graphql(UPDATE_TODO, {
    name: 'updateTodo'
  })
)(Todos)
