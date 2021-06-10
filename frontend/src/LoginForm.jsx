import React, { Component } from "react";
import { login } from "./operacoes";

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      username: "admin",
      password: "123456",
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const body = { ...this.state };
    login(body).then((result) => {
      this.setState({
        isLoaded: true,
        items: result,
      });
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="username">
          Usuário
          <input
            type="text"
            value={this.state.username}
            onChange={(event) => {
              this.setState({
                username: { ...this.state.username, nome: event.target.value },
              });
            }}
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            type="password"
            value={this.state.password}
            onChange={(event) => {
              this.setState({
                password: { ...this.state.password, nome: event.target.value },
              });
            }}
          />
        </label>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    );
  }
}
