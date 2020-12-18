import MovieList from './components/MovieList'
import { Redirect, Route, Switch } from "react-router-dom"
import Rentals from './components/Rentals';
import Customers from './components/Customers';
import NotFound from './components/NotFound';
import NavBar from './components/common/NavBar';
import MovieForm from './components/MovieForm';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import { ToastContainer } from 'react-toastify';
import './App.css';
import jwt from 'jwt-decode'
import React, { Component } from 'react'

class App extends Component {
  state = {};
  componentDidMount() {
    try {
      const embeddedToken = localStorage.getItem('token');
      const user = jwt(embeddedToken);

      this.setState({ user })
    } catch (error) { }

  }
  render() {
    return (
      <div className="container">
        <ToastContainer />
        <NavBar user={this.state.user} />

        <Switch>
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies" component={MovieList} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/customers" component={Customers} />
          <Route path="/notfound" component={NotFound} />
          <Route path="/login" component={LoginForm} />
          <Route path="/signup" component={SignUpForm} />

          <Redirect from="/" exact to="/movies" />
          <Redirect to="/notfound" />
        </Switch>

      </div>
    )
  }
}

export default App


