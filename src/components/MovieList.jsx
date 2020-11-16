import React, { Component } from 'react'
import { getMovies } from '../Services/fakeMovieService'
import '../Services/css/MovieList.css'

class MovieList extends Component {
    constructor(props) {
        super(props)
        let movie = getMovies();
        movie = [...movie];
        this.state = {
            movie: movie
        }
    }
    // deleteHandler = (id) => {
    //     const { movie } = this.state;
    //     const Movie = [...movie];
    //     let movieInDb = Movie.find(m => m._id === id);
    //     Movie.splice(Movie.indexOf(movieInDb), 1);
    //     this.setState({ movie: movieInDb })


    // }

    render() {
        const { movie } = this.state;


        return (

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Genre</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {movie.map((movie) => {
                        return <tr>
                            <th scope="row">{movie.title}</th>
                            <td>{movie.genre.name}</td>
                            <td>{movie.numberInStock}</td>
                            <td>{movie.dailyRentalRate}</td>
                        </tr>
                    })}


                </tbody>
            </table>




            // {List}         
        )
    }
}
export default MovieList