import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import 'bulma/css/bulma.css';

import AddApplication from './addApplication';
import AddCompany from './addCompany';
import AddAddress from './addAddress';
import AddContact from './addContact';




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
                  <Link className="navbar-item bg-dark text-white" to="/addApplication">Add Application</Link>
                  <Link className="navbar-item bg-dark text-white" to="/addCompany">Add Company</Link>
                  <Link className="navbar-item bg-dark text-white" to="/addAddress">Add Address</Link>
                  <Link className="navbar-item bg-dark text-white" to="/addContact">Add Contact</Link>
                  
                    </div>
                  
                  </nav>
                  
            </section>
           
          </header>

          <Route exact path="/addApplication" render={(props) => (
            <AddApplication {...props} />)} />

<Route exact path="/addCompany" render={(props) => (
             <AddCompany {...props} />)} />

<Route exact path="/addAddress" render={(props) => (
             <AddAddress {...props} />)} />

<Route exact path="/addContact" render={(props) => (
             <AddContact {...props} />)} />
         

<footer className="bg-dark"></footer>
        </div>
       
      </ BrowserRouter>
      
    );
  }
}

export default App;