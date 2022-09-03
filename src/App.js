import React, {useState, useEffect} from "react";
import { Route, Switch, withRouter } from 'react-router-dom';
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./components/Register";
import Login from "./components/Login";
import {register, authorize, createLink, getStat} from "./utils/api";
import Header from "./components/Header";
import CreateLink from "./components/CreateLink";

function App({history}) {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const handleGetStat = async () => {
      try {
        const res = await getStat(token)
        console.log(res);
      } catch {
        console.log('ошибка')
      }
    }
    handleGetStat()
    if (token) {
      setLoggedIn(true);
      history.push('/');
    }
  }, []);

  const handleSignIn = async ({username, password}) => {
    try{
      const res = await authorize(username, password);
      localStorage.setItem('token', res.access_token);
      setLoggedIn(true);
      history.push('/');
      console.log(res)
    } catch {
      console.log('Ошибка');
    }
  }

  const handleRegistration = async ({username, password}) => {
    try{
      const res = await register(username, password);
      handleSignIn(username, password);
    } catch {
      console.log('ошибка регистрации');
    }
  }

  const handleSignOut = () => {
    if(localStorage.getItem('token')) {
      localStorage.removeItem('token')
      setLoggedIn(false)
    }
  }

  const handleCreateLink = async ({link}) => {
    const newLink = link.split('')
                    .map(i => {
                      switch(i) {
                        case ':':
                          return i = '%3A';
                        case '/':
                          return i = '%2F';
                        default: 
                          return i;
                      }
                    })
                    .join('');

    const token = localStorage.getItem('token');
    try {
      const res = await createLink(newLink, token);
      console.log(res);
    } catch {
      console.log('ошибка');
    }
  }


  return (
    <Switch>
      <ProtectedRoute
        exact path="/" 
        loggedIn={loggedIn} 
      >
        <Header linkTitle="Выйти" link="/sign-in" loggedIn={loggedIn} onSignOut={handleSignOut}/>
        <CreateLink onSubmit={handleCreateLink}/>
      </ProtectedRoute>
      <Route path="/sign-up">
        <Register onRegistration={handleRegistration} loggedIn={loggedIn}/>
      </Route>
      <Route path="/sign-in">
        <Login onLogIn={handleSignIn} loggedIn={loggedIn}/>
      </Route>
    </Switch>
  );
}

export default withRouter(App);
