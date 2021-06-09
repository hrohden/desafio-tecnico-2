import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Adicionar extends Component {
  static propTypes = {
    prop: PropTypes,
  };

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('enviou...');
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
