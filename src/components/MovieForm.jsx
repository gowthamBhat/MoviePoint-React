import React from 'react'
import { getMovie } from './../Services/fakeMovieService';

function MovieForm({ match, history }) {
    const movieId = getMovie(match.params.id);
    if (!movieId)
        history.push('/notfound');

    return (
        <div>
            <p>Movie ID {match.params.id}</p>
            <button className="btn btn-primary" onClick={() => history.push('/movies')}>Go Back</button>
        </div>
    )
}

export default MovieForm
