import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import 'bulma/css/bulma.css';

import AddAdvert from './addAdvert';
import AddCompany from './addCompany';
import AddAddress from './addAddress';
import AddContact from './addContact';
import AddContract from './addContract';
import Applications from './Applications';




class App extends Component {
  state = {
    
  }



  render() {
    return (
      < BrowserRouter>
        <div>
          <header>

            {/* Navbar section */}
           
            <section className="is-dark">
            
             
                  
                  <nav className="navbar bg-dark">
                  <div className="container">
                  <Link className="navbar-item bg-dark text-white" to="/Applications">Application Management</Link>
                  <Link className="navbar-item bg-dark text-white" to="/AddAdvert">Add Job Advert</Link>
                  {/* <Link className="navbar-item bg-dark text-white" to="/addCompany">Add Company</Link>
                  <Link className="navbar-item bg-dark text-white" to="/addAddress">Add Address</Link>
                  <Link className="navbar-item bg-dark text-white" to="/addContact">Add Contact</Link>
                  <Link className="navbar-item bg-dark text-white" to="/addContract">Add Contract</Link> */}
                  
                    </div>
                  
                  </nav>
                  
            </section>
           
          </header>

          <Route exact path="/Applications" render={(props) => (
            <Applications {...props} />)} />

<Route exact path="/AddAdvert" render={(props) => (
            <AddAdvert {...props} />)} />

{/* <Route exact path="/addCompany" render={(props) => (
             <AddCompany {...props} />)} />

<Route exact path="/addAddress" render={(props) => (
             <AddAddress {...props} />)} />

<Route exact path="/addContact" render={(props) => (
             <AddContact {...props} />)} />

<Route exact path="/addContract" render={(props) => (
             <AddContract {...props} />)} /> */}
         

<footer className="bg-dark"></footer>
        </div>
       
      </ BrowserRouter>
      
    );
  }
}

export default App;