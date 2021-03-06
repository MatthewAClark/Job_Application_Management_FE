import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import 'bulma/css/bulma.css';
import api_url from "./apiConfig";

import AddAdvert from './addAdvert';
import EditAdvert from './editAdvert';
import Adverts from './Adverts';
// import Advert from './Advert';




class App extends Component {
  state = {
    allAdverts: []
  }

  componentDidMount() {

    // Fetch all the live adverts and put them on the state
    fetch(`${api_url}/api/adverts/live`)
      .then(res => {
        return res.json();
      })
      .then(body => this.setAllAdvertsState(body))
  }

  // Getters and setters. These are accessed at App level and passed down the classes
  getAllAdvertsState = () => this.state.allAdverts; // Gets the advert from the state

  updateAdvertState = (update) => { // Updates the state without writing over entire advert
    var advert = this.state.advert;
    advert = { ...advert, ...update }
    this.setState({ advert: advert });
  }

  setAllAdvertsState = (adverts) => this.setState({ allAdverts: adverts }); // writes over entire advert with new state


  render() {
    return (
      < BrowserRouter>
        <div>
          <header>

            {/* Navbar section */}

            <section className="is-dark">



              <nav className="navbar bg-dark">
                <div className="container">
                  <Link className="navbar-item bg-dark text-white" to="/Adverts">View Adverts</Link>

              

                </div>

              </nav>

            </section>

          </header>

          <Route exact path="/Adverts" render={(props) => (
            <Adverts {...props} getAllAdvertsState={this.getAllAdvertsState} />)} />

          <Route exact path="/AddAdvert" render={(props) => (
            <AddAdvert {...props} />)} />
        

          <Route exact path="/adverts/:advert_id" component={EditAdvert} />


          <footer className="bg-dark"></footer>
        </div>

      </ BrowserRouter>

    );
  }
}

export default App;