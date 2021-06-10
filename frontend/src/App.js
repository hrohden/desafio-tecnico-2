import "./App.css";
import Lista from "./Lista";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Adicionar from "./Adicionar";
import Home from "./Home";
import Editar from "./Editar";
import GuardedRoute from "./GuardedRoute";
import { hasLocalStorage } from "./operacoes";
import Sair from "./Sair";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Início</Link>
            </li>
            {hasLocalStorage() && (
              <li>
                <Link to="/lista">Lista</Link>
              </li>
            )}
            {hasLocalStorage() && (
            <li>
              <Link to="/adicionar">Adicionar</Link>
            </li>
            )}
            {hasLocalStorage() && (
            <li>
              <Link to="/logout">Sair</Link>
            </li>
            )}
          </ul>
        </nav>

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

export default App;
