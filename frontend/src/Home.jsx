import React, { Component } from 'react'
import axios from 'axios';
import LinhaCliente from './LinhaCliente';
import { Link } from 'react-router-dom';
import Titulo from './Titulo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AuthenticationService from './AuthenticationService'

export class Home extends Component {

    state = {
        clientes: []
    }

    componentDidMount() {
        axios.get("/api/clientes").then(response => {
            this.setState({ clientes: response.data });
        })
    }

    render() {
        return (
            <div>
                <Titulo>Clientes</Titulo>
                {AuthenticationService.hasAdminPrivileges() &&
                <p>
                    <Link to={'/adicionar'} className="btn btn-primary"><FontAwesomeIcon fixedWidth icon={"plus"} className="mr-1" />Adicionar cliente</Link>
                </p>
                }
                {this.state.clientes.length > 0 ? (
                    <>
                        {this.state.clientes.map(cliente => {
                            return <LinhaCliente cliente={cliente} key={cliente.id} onDelete={() => {
                                axios.delete(`/api/clientes/${cliente.id}`)
                                    .then(() => {
                                        const clientes = this.state.clientes.filter(c => c.id !== cliente.id);
                                        this.setState({ clientes });
                                    })
                            }} />
                        })}
                    </>
                ) : (
                    <div className="card">
                        <div className="card-body text-center">
                            Não há clientes cadastrados no momento.
                            {AuthenticationService.hasAdminPrivileges() &&
                            <>
                            <br/>
                            <Link to="/adicionar">Adicione um novo cliente</Link> para exibir a lista de clientes cadastrados.
                            </>
                            }
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default Home
