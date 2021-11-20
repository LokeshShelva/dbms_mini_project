import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import App from './App';

axios.defaults.baseURL = "https://dbms-api-server.herokuapp.com/";
const token = localStorage.getItem('token');
if (token != null) {
    axios.defaults.headers.common['Authorization'] = `bearer ${token}`
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);