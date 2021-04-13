import React from 'react';
import {render} from "react-dom";
import ReactDOM from "react-dom";
import Header from './components/Header'
import Products from './components/Products'
//import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {DataProvider} from './components/DataProvider'
import Details from './components/Details'
import Cart from './components/Cart'
import Logout from './components/Logout';
import Register from './components/Register';
import Login from './components/Login';
import { Router } from "@reach/router";


const App = () =>{
  return (
    <DataProvider>
      <div className="App">
        <Router>
          <Header path="/"/>
          
          
              
              <Products path="/products"  />
              <Details path="/products/:id"/>
              <Cart path="/cart"/>
              <Login path="/login"/>
              <Logout path="/logout"/>
              <Register path="/register"/>
              
              {/* <Route path="products/:id" element={ <Details /> } />
              <Route path="cart" element={ <Cart /> } />
              <Route path="login" element={ <Login />}/>
              <Route path="logout" element={ <Logout />}/>
              <Route path="register" element={ <Register />}/> */}
              
            
          
        </Router>
      </div>
    </DataProvider>
  );
};

render(<App />, document.getElementById("root"));
