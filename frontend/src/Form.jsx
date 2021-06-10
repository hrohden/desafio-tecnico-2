import React, { Component } from "react";
import { salvar } from "./operacoes";

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      cliente: this.props.cliente,
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const body = { ...this.state.cliente };
    salvar(body).then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result,
        });
      }
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="nome">
            Nome:
            <input
              type="text"
              value={this.state.cliente.nome}
              onChange={(event) => {
                this.setState({
                  cliente: { ...this.state.cliente, nome: event.target.value },
                });
              }}
            />
          </label>
        </div>
        <div>
          <button type="submit">Adicionar cliente</button>
        </div>
      </form>
    );
  }
}
