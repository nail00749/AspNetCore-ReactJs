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
            <Route history={history} path='/Test/' component={Test}/>

              <AuthorizeRoute path='/fetch-data' component={FetchData} />
              <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
            <Redirect from='/' to='/home'/>
          </Switch>
      </div>

    );
  }
}

export default withRouter(App)


/*<Layout>
          <Route exact path='/' component={Home} />
          <Route path='/counter' component={Counter} />
          <Route path='/BuyTicket' component={BuyTicket}/>
          <Route path='/UpdateFilm' component={UpdateFilm}/>
          <Route path='/AddSession' component={AddSession}/>
          <AuthorizeRoute path='/fetch-data' component={FetchData} />
          <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      </Layout>*/