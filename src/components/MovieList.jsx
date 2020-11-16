import React, { Component } from 'react'
import { getMovies } from '../Services/fakeMovieService'
import '../Services/css/MovieList.css'

class MovieList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            movie: getMovies()
        }
    }

    render() {
        const { movie } = this.state;
        return (
            <div className='starter-template'>
                {movie.map((movie) => <p>{movie.title}</p>)}
            </div>
        )
    }
}
export default MovieList