import React, { Component } from "react";
import { Link } from "react-router-dom";
import { listar, remover } from "./operacoes";

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
    remover(id).then((result) => {
      this.setState({
        isLoaded: true,
        clientes: result,
      });
    });
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
