import React, { Component } from 'react';

import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';

import './custom.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";

import UpdateFilm from "./components/UpdateFilm";
import BuyTicket from "./components/BuyTicket";
import AddSession from "./components/AddSession";
import {NavMenu} from "./components/NavMenu";
import Test from "./components/Test";
import Roles from "./components/Roles";
import Test1 from "./components/Test1";
import AdminPanel from "./components/Admin/AdminPanel";
import AddRole from "./components/Admin/AddRole";
import ListUsers from "./components/Admin/ListUsers";

class App extends Component {
    static displayName = App.name;
    constructor(props) {
        super(props);

    }


  render () {
    const {history} = this.props

    return (

      <div>
          <NavMenu/>
          <Switch>
             <Route history={history} path='/home' component={Home}/>
             <Route history={history} path='/UpdateFilm/:id?' component={UpdateFilm}/>
             <Route history={history} path='/AddSession' component={AddSession}/>
             <Route history={history} path='/BuyTicket/:id' component={BuyTicket}/>
             <Route history={history} path='/Roles' component={Roles}/>
             <Route history={history} path='/test' component={Test1}/>
             <Route history={history} path='/admin' component={AdminPanel}/>
             <Route history={history} path='/addRole' component={AddRole}/>
             <Route history={history} path='/users' component={ListUsers}/>


              <AuthorizeRoute path='/fetch-data' component={FetchData} />
              <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
            <Redirect from='/' to='/home'/>
          </Switch>
      </div>

    );
  }
}
export default withRouter(App)