import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Cart from './pages/Cart/Cart';
import Orders from './pages/Orders/Orders';
import Nav from './components/Nav/Nav';
import isUserLogged from './services/isUserLogged';
import Admin from './pages/admin/Admin';

function App() {

  return (
    <>
      <Nav/>
      <main>
        <div id="container">
          <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home/>}/>
                {
                  isUserLogged()?(
                  <>
                    <Route path="cart" element={<Cart />}/>
                    <Route path="orders" element={<Orders />}/>
                  </>):
                  <>
                    <Route path="login" element={<Login/>}/>
                    <Route path="register" element={<Register/>}/>
                  </>
                }
                <Route path='/admin' element={<Admin/>}/>
              </Routes>
            </BrowserRouter>
        </div>
      </main>
      <footer>
        Wiktor Gruszczyński 2024
      </footer>
    </>
  );
}

export default App;
