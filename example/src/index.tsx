import 'react-app-polyfill/ie11';
import * as React from 'react';
import { Suspense } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { RouteSwitcher } from '../../.'

import { routes } from './routes'

const App = () => (
  <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
      <RouteSwitcher routes={routes} />
    </Suspense>
  </BrowserRouter>
);



ReactDOM.render(<App />, document.getElementById('root'));
