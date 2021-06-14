import React, { Component } from 'react'
import Titulo from './Titulo';
import FormularioCliente from './FormularioCliente';

export class AdicionarCliente extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            emails: [{
                index: 1,
                email: ''
            }],
            enderecoCep: '',
            enderecoLogradouro: '',
            enderecoBairro: '',
            enderecoCidade: '',
            enderecoUf: '',
            enderecoComplemento: '',
            telefones: [{
                index: 1,
                tipo: 'Celular',
                ddd: '',
                numero: ''
            }]
        }
    }

    render() {
        return (
            <div>
                <Titulo>Adicionar cliente</Titulo>
                <FormularioCliente cliente={this.state} />
            </div>
        )
    }
}

export default AdicionarCliente
