import React, { Component } from 'react'
import Titulo from './Titulo'
import axios from 'axios'
import FormularioCliente from './FormularioCliente'

export class EditarCliente extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cliente: null
        }
    }

    componentDidMount() {
        if (!this.state.cliente) {
            axios.get('/api/clientes/' + this.props.match.params.id)
                .then(response => {
                    this.setState({
                        cliente: response.data
                    });
                })
                .catch(response => {
                    console.log(response)
                })
        }
    }

    render() {
        return !this.state.cliente ? (<p>Carregando...</p>) : (
            <div>
                <Titulo subtitulo="Editar informações">{this.state.cliente.nome}</Titulo>
                <FormularioCliente cliente={this.state.cliente} />
            </div>
        )
    }
}

export default EditarCliente
