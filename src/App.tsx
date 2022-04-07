import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import SecretAdd from './pages/SecretAdd';
import SecretGet from './pages/SecretGet';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact={true}>
          <Home />
        </Route>
        <Route path="/secret/add">
          <SecretAdd />
        </Route>
        <Route path="/secret/get">
          <SecretGet />
        </Route>
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
