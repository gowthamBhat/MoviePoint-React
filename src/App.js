import './App.css';
import MovieList from './components/MovieList'
import { Redirect, Route, Switch } from "react-router-dom"
import Rentals from './components/Rentals';
import Customers from './components/Customers';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="container">
      <Switch>
        <Route path="/movies" component={MovieList} />
        <Route path="/rentals" component={Rentals} />
        <Route path="/customers" component={Customers} />
        <Route path="/notfound" component={NotFound} />

        <Redirect from="/" exact to="/movies" />
        <Redirect to="/notfound" />
      </Switch>



    </div>
  );
}

export default App;
