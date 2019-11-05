import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import 'bulma/css/bulma.css';

import AddApplication from './addApplication';



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
                  
                    </div>
                  
                  </nav>
                  
            </section>
           
          </header>

          <Route exact path="/addApplication" render={(props) => (
            <AddApplication {...props} />)} />

         

<footer className="bg-dark"></footer>
        </div>
       
      </ BrowserRouter>
      
    );
  }
}

export default App;