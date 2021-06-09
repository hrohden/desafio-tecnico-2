import "./App.css";
import Lista from "./Lista";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Adicionar from "./Adicionar";
import Home from "./Home";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Início</Link>
            </li>
            <li>
              <Link to="/lista">Lista</Link>
            </li>
            <li>
              <Link to="/adicionar">Adicionar</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/lista">
            <Lista />
          </Route>
          <Route path="/adicionar">
            <Adicionar />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
