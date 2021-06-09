import React, { Component } from "react";

export default class Adicionar extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("enviou...");
    const body = {
      nome: "Meu teste",
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
    fetch("http://localhost:3000/api/clientes", {
      method: "post",
      body: JSON.stringify(body),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBdXRlbnRpY2HDp8OjbyIsImlhdCI6MTYyMzI2MDgwMiwiZXhwIjoxNjIzMzQ3MjAyLCJzdWIiOiJhZG1pbiJ9.2NKHtgmfjn368BiZfaPKFD6I8NQwMd4jfOdHFBGNOMU",
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result,
          });
        },
        // Nota: É importante lidar com os erros aqui
        // em vez de um bloco catch() para não recebermos
        // exceções de erros dos componentes.
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    return (
      <div>
        <h1>Adicionar</h1>
        <button onClick={this.handleSubmit}>Adicionar cliente</button>
      </div>
    );
  }
}
