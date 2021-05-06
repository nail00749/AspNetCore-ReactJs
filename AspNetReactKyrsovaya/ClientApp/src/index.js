import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Router } from "react-router-dom"
import {createBrowserHistory} from "history";
//import registerServiceWorker from './registerServiceWorker';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

const history = createBrowserHistory()


  /*<BrowserRouter basename={baseUrl}>
    <App />
  </BrowserRouter>,*/
    ReactDOM.render((
            <Router history={history}>
                <App/>
            </Router>
        ), document.getElementById('root')
    );

// Uncomment the line above that imports the registerServiceWorker function
// and the line below to register the generated service worker.
// By default create-react-app includes a service worker to improve the
// performance of the application by caching static assets. This service
// worker can interfere with the Identity UI, so it is
// disabled by default when Identity is being used.
//
//registerServiceWorker();

