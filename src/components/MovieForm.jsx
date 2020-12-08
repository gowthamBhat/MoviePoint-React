import React from 'react'

function MovieForm({ match, history }) {
    return (
        <div>
            <p>Movie ID {match.params.id}</p>
            <button className="btn btn-primary" onClick={() => history.push('/movies')}>Go Back</button>
        </div>
    )
}

export default MovieForm
