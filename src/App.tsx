import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import SecretNew from './pages/SecretNew';
import SecretRead from './pages/SecretRead';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <div className="App">
      <Header />

      <Switch>
        <Route path="/" exact={true}>
          <Home />
        </Route>
        <Route path="/secret/new">
          <SecretNew />
        </Route>
        <Route path="/secret/read">
          <SecretRead />
        </Route>
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
