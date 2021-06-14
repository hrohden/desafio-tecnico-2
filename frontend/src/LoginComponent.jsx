import React, { Component } from 'react'
import AuthenticationService from './AuthenticationService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: 'admin',
            password: '123456',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    loginClicked() {
        AuthenticationService
            .executeBasicAuthenticationService(this.state.username, this.state.password)
            .then((response) => {
                AuthenticationService.registerSuccessfulLogin(this.state.username, response.data.key);
                this.props.history.push('/')
            }).catch(() => {
                this.setState({ showSuccessMessage: false })
                this.setState({ hasLoginFailed: true })
            })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4 offset-4">
                        <div className="card shadow-sm">
                            <h5 className="card-header">Acesso restrito</h5>
                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor="user">Usuário</label>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><FontAwesomeIcon fixedWidth icon={"user"} /></span>
                                        </div>
                                        <input type="text" name="username" id="user" className="form-control" value={this.state.username} onChange={this.handleChange} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Senha</label>
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text"><FontAwesomeIcon fixedWidth icon={"key"} /></span>
                                        </div>
                                        <input type="password" name="password" id="password" className="form-control" value={this.state.password} onChange={this.handleChange} />
                                    </div>
                                </div>
                                {this.state.showSuccessMessage && <div className="alert alert-success">Acesso permitido!</div>}
                                {this.state.hasLoginFailed && <div className="alert alert-danger">Credenciais inválidas</div>}
                            </div>
                            <div className="card-footer">
                                <button className="btn btn-primary btn-block" onClick={this.loginClicked}><FontAwesomeIcon fixedWidth icon={"check"} className="mr-1" />Entrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginComponent
