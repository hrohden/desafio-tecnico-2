import React, { Component } from "react";
import "./App.css";
import Lista from "./Lista";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Adicionar from "./Adicionar";
import Home from "./Home";
import Editar from "./Editar";
import GuardedRoute from "./GuardedRoute";
import { hasLocalStorage } from "./operacoes";
import Sair from "./Sair";
import Navbar from "./Navbar";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />

          {/* A <Switch> looks through its children <Route>s and
                    renders the first one that matches the current URL. */}
          <Switch>
            <GuardedRoute path="/lista" auth={hasLocalStorage()}>
              <Lista />
            </GuardedRoute>
            <GuardedRoute path="/adicionar" auth={hasLocalStorage()}>
              <Adicionar />
            </GuardedRoute>
            <GuardedRoute
              auth={hasLocalStorage()}
              exact
              path="/editar/:id"
              render={(props) => <Editar {...props} />}
            />
            <GuardedRoute path="/logout" auth={hasLocalStorage()}>
              <Sair />
            </GuardedRoute>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
