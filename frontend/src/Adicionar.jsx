import React, { Component } from "react";
import Form from "./Form";

export default class Adicionar extends Component {

  render() {
    const cliente = {
      nome: "",
      cpf: "00000000000",
      cep: "99999999",
      logradouro: "Teste",
      complemento: "Teste",
      bairro: "Teste",
      cidade: "Teste",
      uf: "Teste",
      emails: [
        {
          endereco: "teste@teste.com.br",
        },
      ],
      telefones: [
        {
          numero: "99999999",
          tipo: "RESIDENCIAL",
        },
      ],
    };

    return (
      <div>
        <h1>Adicionar</h1>
        <Form cliente={cliente} />
      </div>
    );
  }
}
