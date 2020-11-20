import React, { Component } from 'react'
import { getMovies } from '../Services/fakeMovieService'  //importing all the movies from the fake movie list
import Like from "../common/Like";

class MovieList extends Component {
    constructor(props) {
        super(props)

        // let movie = getMovies();

        this.state = {
            movie: getMovies()
        }
    }
    deleteHandler = (movies) => {
        const movie = this.state.movie.filter((x) => x._id !== movies._id) //filtering the movie except the one that clicked delete button
        this.setState({ movie: movie });
    }
    toggleLiked = (likedMovie) => {
        let movie = this.state.movie.map((stateMovie) => {
            if (stateMovie === likedMovie)
                stateMovie.liked = !stateMovie.liked

            return stateMovie
        })
        this.setState({ movie })
    }

    render() {
        const { movie } = this.state;
        if (movie.length === 0)
            return (<h5>there are no movies in the list</h5>)

        return (
            <React.Fragment>
                <h5>There are {movie.length} in the database</h5>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Genre</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Rate</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {movie.map((movie) => {
                            return <tr key={movie._id}>
                                <th scope="row">{movie.title}</th>
                                <td>{movie.genre.name}</td>
                                <td>{movie.numberInStock}</td>
                                <td>{movie.dailyRentalRate}</td>
                                <td><Like toggleLiked={() => this.toggleLiked(movie)} liked={movie} /></td>

                                <td><button onClick={() => this.deleteHandler(movie)} className="btn btn-danger btn-sm">Delete</button> </td>
                            </tr>
                        })}


                    </tbody>
                </table>
            </React.Fragment>
        )
    }//  this.toggleLiked(movie) alli movie reference na pass madbodu
    /*showing the movie with map method, movie state should be a array to map over it */
}
export default MovieList