// import './App.css';
import LoginRegisterPage from  './components/pages/LoginRegisterPage';
import Dashboard from  './components/pages/Dashboard';

import {Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App container">
      <Switch>
        <Route exact={true} path="/">
          <LoginRegisterPage/>
        </Route>
        <Route exact={true} path="/dashboard">
          <Dashboard/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
