import React, { Component } from 'react'
import { Redirect } from 'react-router';
import { removeLocalStorage } from './operacoes'

export default class Sair extends Component {

    componentDidMount() {
        removeLocalStorage();
    }
    
    
    render() {
        return <Redirect to='/' />
    }
}
