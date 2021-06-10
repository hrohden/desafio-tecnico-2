import React, { Component } from "react";
import { Link } from "react-router-dom";
import { hasLocalStorage } from "./operacoes";

export default class Navbar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isAuthenticated: false
        }
    }

    componentDidMount() {
        this.setState({
            isAuthenticated: hasLocalStorage()
        })
    }
    
  render() {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/">Início</Link>
          </li>
          {this.state.isAuthenticated && (
            <li>
              <Link to="/lista">Lista</Link>
            </li>
          )}
          {this.state.isAuthenticated && (
            <li>
              <Link to="/adicionar">Adicionar</Link>
            </li>
          )}
          {this.state.isAuthenticated && (
            <li>
              <Link to="/logout">Sair</Link>
            </li>
          )}
        </ul>
      </nav>
    );
  }
}
