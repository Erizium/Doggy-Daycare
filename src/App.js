import logo from './logo.svg';
import './App.css';
import './components/DogInformation.css';
import React from 'react';
import UserList from './components/UserList';
import Welcome from './components/Welcome';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

const {useState, useEffect} = React;

//https://api.jsonbin.io/b/607eb43024143e5df089b745


function App() {  

  return (
    <div className="App">
      <header className="App-header">
      <Router>
        <Switch>
          <Route exact path="/">
            <Welcome />
          </Route>
          <Route path="/doginformations">
            <UserList />
          </Route>
        </Switch>
      </Router>

        
      </header>
    </div>
  );
}

export default App;
