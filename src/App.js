import React, { Component } from 'react'
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

import LogOut from './components/common/LogOut';
import LocalStroageContainer from './Services/LocalStroageContainer';
import ProtectedRoute from './components/common/protectedRoute';



class App extends Component {
  state = {};
  componentDidMount() {
    try {
      const user = LocalStroageContainer.getCurrentUser();
      this.setState({ user })
    } catch (error) { }

  }
  render() {
    // const { user } = this.state.user;
    return (
      <div className="container">
        <ToastContainer />
        <NavBar user={this.state.user} />

        <Switch>
          {/* <Route path="/movies/:id" render={props => {
            if (!this.state.user)
              return <Redirect to="/login" />

            return <MovieForm {...props} />
          }} /> */}
          <ProtectedRoute
            path="/movies/:id"
            component={MovieForm}
          />
          <Route path="/movies"
            render={props => <MovieList {...props} user={this.state.user} />}
          />
          <Route path="/rentals" component={Rentals} />
          <Route path="/customers" component={Customers} />
          <Route path="/notfound" component={NotFound} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={LogOut} />
          <Route path="/signup" component={SignUpForm} />

          <Redirect from="/" exact to="/movies" />
          <Redirect to="/notfound" />
        </Switch>

      </div>
    )
  }
}

export default App


