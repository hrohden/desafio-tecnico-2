import React, { Component } from "react";
import Form from "./Form";
import { consultar } from "./operacoes";

export default class Editar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cliente: {},
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;
    consultar(id).then((result) => {
      this.setState({
        isLoaded: true,
        cliente: result,
      });
    });
  }

  render() {
    return (
      <div>
        <h1>Editar...</h1>
        {this.state.isLoaded && (
          <div>
            <h2>{this.state.cliente.id}</h2>
            <Form cliente={this.state.cliente} />
          </div>
        )}
      </div>
    );
  }
}
