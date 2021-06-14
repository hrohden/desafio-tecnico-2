import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './Navbar';
import AdicionarCliente from './AdicionarCliente';
import EditarCliente from './EditarCliente';
import ConsultarCliente from './ConsultarCliente';
import Home from './Home';
import LoginComponent from './LoginComponent';
import AuthenticatedRoute from './AuthenticatedRoute'
import Logout from './Logout'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faIdCard } from '@fortawesome/free-solid-svg-icons'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

library.add(fas,
  faCheck,
  faKey,
  faUser,
  faPowerOff,
  faPlus,
  faTrashAlt,
  faIdCard,
  faMapMarkerAlt,
  faEnvelope,
  faEdit
)

class App extends React.Component {

  render() {
    return (
      <div>
        <Router>
          <>
          <Navbar />
          <div className='container'>
            <div className='row'>
              <div className='col'>
                <Switch>
                  <Route exact path='/login' component={LoginComponent} />
                  <AuthenticatedRoute exact path='/' component={Home} />
                  <AuthenticatedRoute path='/adicionar' component={AdicionarCliente} />
                  <AuthenticatedRoute path='/:id/editar' component={EditarCliente} />
                  <AuthenticatedRoute path='/consultar' component={ConsultarCliente} />
                  <AuthenticatedRoute path='/logout' component={Logout} />
                </Switch>
              </div>
            </div>
          </div>
          </>
        </Router>
      </div>
    );
  }
}

export default App;
