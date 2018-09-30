import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { TODOS } from '@query'

import _ from 'lodash'

import './index.css'

class Todos extends Component {
  constructor (props) {
    super(props) 
    this.state = {
    }
  }

  render() {
    const { todos } = this.props
    return (
      <div className="todos container">
        <input className="todos-input" placeholder="Add Todo" />
        <ul>
          {
            todos.map(todo => (
              <li className="todos-item" key={todo.id}>
                { todo.name }
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
        todos: _.get(data, 'me.todos', []) 
      }
    }
  })
)(Todos)
