import React, { Component } from "react";
import { Link } from "react-router-dom";
import { listar } from "./operacoes";

export default class Lista extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      clientes: [],
    };
  }

  componentDidMount() {
    listar().then((result) => {
      this.setState({
        isLoaded: true,
        clientes: result,
      });
    });
  }

  remover = (id) => {
    fetch("http://localhost:3000/api/clientes/" + id, {
      method: "delete",
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
            clientes: result,
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
  };

  render() {
    return (
      <div>
        <div>Lista de clientes...</div>
        {this.state.isLoaded && (
          <ul>
            {this.state.clientes.map((item) => (
              <li key={item.id}>
                {item.nome} ({item.id}) -{" "}
                <Link to={"/editar/" + item.id}>Editar</Link> -{" "}
                <button onClick={() => this.remover(item.id)}>Remover</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
