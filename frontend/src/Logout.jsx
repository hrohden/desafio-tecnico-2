import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import AuthenticationService from './AuthenticationService';

export class Logout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            logout: false
        };
    }

    componentDidMount() {
        if (!this.state.logout) {
            AuthenticationService.logout();
            this.setState({
                logout: true
            })
        }
    }

    render() {
        return this.state.logout ? (
            <Redirect to="/login" />
        ) : (
            <div>
                Logout
            </div>
        )
    }
}

export default Logout
