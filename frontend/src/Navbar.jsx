import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom';
import AuthenticationService from './AuthenticationService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class Navbar extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        const user = AuthenticationService.getAuthenticatedUser();

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 shadow">
                <div className="container">
                    <Link to={'/'} className="navbar-brand">
                        <img width="32" height="32" className="mr-1" alt="" src="data:image/png;base64,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" />
                        Surittec Cadastro de Clientes
                    </Link>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        <li className="navbar-text">{isUserLoggedIn && <div><FontAwesomeIcon fixedWidth icon={"user"} className="mr-1" />{user}</div>}</li>
                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}><FontAwesomeIcon fixedWidth icon={"power-off"} className="mr-1" />Sair</Link></li>}
                    </ul>
                </div>
            </nav>
        )
    }
}

export default withRouter(Navbar)