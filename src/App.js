import React from 'react';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from './components/Header';
import Routes from './routes';

import GlobalStyle from './styles/global';
import 'react-toastify/dist/ReactToastify.css';

import history from './services/history';

function App() {
  return (
    <Router history={history}>
      <Header />
      <Routes />
      <ToastContainer autoClose={3000} />
      <GlobalStyle />
    </Router>
  );
}

export default App;
