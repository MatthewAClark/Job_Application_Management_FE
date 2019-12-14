import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import 'bulma/css/bulma.css';
import api_url from "./apiConfig";

import AddAdvert from './addAdvert';
import Applications from './Applications';
import Advert from './Advert';




class App extends Component {
  state = {
    adverts: []
  }

  componentDidMount() {

    // Fetch all the live adverts and put them on the state
    fetch(`${api_url}/api/adverts/live`)
            .then(res => {
                    return res.json();
            })
            .then(body => {

                    console.log(body)
                    this.setState({
                            adverts: body

                    })
            })
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
                 
                  {/* <Link className="navbar-item bg-dark text-white" to="/addCompany">Add Company</Link>
                  <Link className="navbar-item bg-dark text-white" to="/addAddress">Add Address</Link>
                  <Link className="navbar-item bg-dark text-white" to="/addContact">Add Contact</Link>
                  <Link className="navbar-item bg-dark text-white" to="/addContract">Add Contract</Link> */}
                  
                    </div>
                  
                  </nav>
                  
            </section>
           
          </header>

          <Route exact path="/Applications" render={(props) => (
            <Applications {...props} adverts={this.state.adverts}/>)} />

<Route exact path="/AddAdvert" render={(props) => (
            <AddAdvert {...props} />)} />
{/* 
<Route exact path="/Adverts/:advert_id" render={(props) => (
             <AddCompany {...props} />)} /> */}

<Route exact path="/applications/:advert_id" component={Advert} />
{/* 
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