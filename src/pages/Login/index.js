import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import _ from 'lodash'
import { CREATE_USER_TOKEN } from '@query'

import './index.css'

class Login extends Component {
  constructor (props) {
    super(props) 
    this.state = {
      username: '',
      password: '',
      error: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit () {
    const { username, password } = this.state
    this.props.login({
      variables: {
        name: username,
        password
      } 
    }).then(({ data }) => {
      const token = _.get(data, 'createUserToken')
      if (!token) {
        this.setState({ error: '您输入的账号或者密码有误' })         
      } else {
        this.setState({ error: '' }) 
        this.props.history.push('/')
      }
    })
  }

  render() {
    return (
      <div className="login">
        {
          this.state.error &&
          <div className="login-error">{this.state.error}</div>
        }
        <input className="login-input" placeholder="Name" onChange={e => this.setState({ username: e.target.value })} autoFocus />
        <input className="login-input" type="password" placeholder="Password" onChange={e => this.setState({ password: e.target.value})} />
        <div className="login-button" onClick={this.handleSubmit}>Login</div>
      </div>
    )
  }
}

export default compose(
  graphql(CREATE_USER_TOKEN, {
    name: 'login' 
  })
)(Login)
