import React, { Component } from 'react'
import LoginForm from './LoginForm'

export default class Home extends Component {
    render() {
        return (
            <div>
                <h1>Início</h1>
                <LoginForm />
            </div>
        )
    }
}
