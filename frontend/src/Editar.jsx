import React, { Component } from "react";

export default class Editar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cliente: {},
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    fetch("http://localhost:3000/api/clientes/" + id, {
      headers: new Headers({
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBdXRlbnRpY2HDp8OjbyIsImlhdCI6MTYyMzI2MDgwMiwiZXhwIjoxNjIzMzQ3MjAyLCJzdWIiOiJhZG1pbiJ9.2NKHtgmfjn368BiZfaPKFD6I8NQwMd4jfOdHFBGNOMU",
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            cliente: result,
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
        <h1>Editar...</h1>
        {this.state.cliente && <h2>{this.state.cliente.nome}</h2>}
      </div>
    );
  }
}
