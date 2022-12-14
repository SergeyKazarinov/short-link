import React, {useState, useEffect, useCallback} from "react";
import { Route, Switch, withRouter } from 'react-router-dom';
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./components/Register";
import Footer from "./components/Footer";
import Login from "./components/Login";
import {register, authorize, createLink, getStat, getCurrentStat} from "./utils/api";
import Header from "./components/Header";
import CreateLink from "./components/CreateLink";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import Popup from "./components/Popup";

function App({history}) {
  const [token, setToken] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [dataLink, setDataLink] = useState([]);
  const [defaultStat, setDefaultStat] = useState([])
  const [currentStat, setCurrentStat] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [shortLink, setShortLink] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [linksPerPage] = useState(50);
  const [orderForSort, setOrderForSort] = useState(null);
  const lastLinkIndex = currentPage * linksPerPage;
  const firstLinkIndex = lastLinkIndex - linksPerPage;

  useEffect(() => {
    const token = localStorage.getItem('token')
    
    if (token) {
      setToken(token)
      setLoggedIn(true);
      handleGetStat(token);
      handlePageNavigation();
      history.push('/');
    }
  }, []);

  const handleSignIn = useCallback(async ({username, password}) => {
    try{
      const res = await authorize(username, password);
      localStorage.setItem('token', res.access_token);
      setLoggedIn(true);
      handleGetStat(res.access_token);
      handlePageNavigation()
      history.push('/');
    } catch {
      console.log('Ошибка');
    }
  }, [])

  const handleRegistration = useCallback(async ({username, password}) => {
    try{
      const res = await register(username, password);
      handleSignIn(username, password);
    } catch {
      console.log('ошибка регистрации');
    }
  }, [])

  const handleSignOut = useCallback(() => {
    if(localStorage.getItem('token')) {
      localStorage.removeItem('token')
      setToken('');
      setLoggedIn(false)
    }
  }, [])

  
  const closePopup= () =>{
    setIsPopupOpen(false);
  }

  useEffect(() => {
    handlePageNavigation();
  }, [currentPage, orderForSort])

  const handlePageNavigation = async () => {
    try {
      const res = await getCurrentStat(token, linksPerPage, firstLinkIndex, orderForSort)
      setCurrentStat(res);
      setDefaultStat(res);
    } catch {
      console.log('ошибка')
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

    try {
      const res = await createLink(newLink, token);
      handlePageNavigation();
      setShortLink(res);
      setIsPopupOpen(true);
    } catch {
      console.log('ошибка');
    }
  }

  const handleGetStat = async (token) => {
    try {
      const res = await getStat(token)
      setDataLink(res);
    } catch {
      console.log('ошибка')
    }
  }

  const handleSortStat = (value) => {
    
    if (value === "shortRise") {
      setOrderForSort(`&order=asc_short`);
    } else if (value === "shortDown") {
      setOrderForSort(`&order=desc_short`);
    } else if (value === "targetRise") {
      setOrderForSort(`&order=asc_target`);
    } else if (value === "targetDown") {
      setOrderForSort(`&order=desc_target`);
    } else if (value === "counterRise") {
      setOrderForSort(`&order=asc_counter`);
    } else if (value === "counterDown") {
      setOrderForSort(`&order=desc_counter`);
    } else {
      setOrderForSort(null)
    }
  }
  
  const handleSearchLink = (value) => {
    if(value) {
      const sortStat = dataLink.filter((item) => {
        return (item.counter == value || item.short.includes(value) || item.target.includes(value))
      })
      setCurrentStat(sortStat);
    } else {
      setCurrentStat(defaultStat)
    }
  }

  const handleChangeCurrentPage = (pageNumber) => {
    setCurrentPage(state => state = pageNumber);
  } 

  return (
    <>
      <Switch>
        <ProtectedRoute
          exact path="/" 
          loggedIn={loggedIn} 
        >
          <Header 
            linkTitle="Выйти"
            link="/sign-in"
            loggedIn={loggedIn}
            onSignOut={handleSignOut}
          />
          <CreateLink onSubmit={handleCreateLink}/>
          <Table 
            dataLink={currentStat}
            onChange={handleSortStat} 
            firstLinkIndex={firstLinkIndex} 
            onSearch={handleSearchLink}
          />
          <Pagination 
            linksPerPage={linksPerPage} 
            totalLinks={dataLink.length} 
            paginate={handleChangeCurrentPage}
          />
          <Footer />
        </ProtectedRoute>
        <Route path="/sign-up">
          <Register onRegistration={handleRegistration} loggedIn={loggedIn}/>
        </Route>
        <Route path="/sign-in">
          <Login onLogIn={handleSignIn} loggedIn={loggedIn}/>
        </Route>
      </Switch>

      <Popup 
        name="info"
        nameContainer="popup__container-info"
        link={shortLink}
        isOpen={isPopupOpen}
        onClose={closePopup}
      />
    </>
  );
}

export default withRouter(App);
