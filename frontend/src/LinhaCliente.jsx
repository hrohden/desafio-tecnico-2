import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AuthenticationService from './AuthenticationService'

export class LinhaCliente extends Component {

    render() {
        return (
            <div className="card mb-3 shadow-sm">
                <div className="card-body">
                    <h5>{this.props.cliente.nome} <small className="text-muted">({this.props.cliente.cpf})</small></h5>
                    <div className="text-muted">{this.props.cliente.enderecoLogradouro}. {this.props.cliente.enderecoCidade}, {this.props.cliente.enderecoUf}. CEP {this.props.cliente.enderecoCep}</div>
                    <div className="text-muted">
                        {this.props.cliente.emails.map(email => {
                            return <div key={email.id}><small>{email.email}</small></div>
                        })}
                    </div>
                    <div className="text-muted">
                        {this.props.cliente.telefones.map(telefone => {
                            return <div key={telefone.id}><small>({telefone.ddd}) {telefone.numero}</small></div>
                        })}
                    </div>
                </div>
                {AuthenticationService.hasAdminPrivileges() &&
                <div className="card-footer text-right">
                    <Link to={'/' + this.props.cliente.id + '/editar'} className="btn btn-sm btn-outline-primary mr-1"><FontAwesomeIcon fixedWidth icon={"edit"} className="mr-1" />Editar</Link>
                    <button className="btn btn-sm btn-outline-primary" onClick={this.props.onDelete}><FontAwesomeIcon fixedWidth icon={"trash-alt"} className="mr-1" />Remover</button>
                </div>
                }
            </div>
        )
    }
}

export default LinhaCliente
