import React from 'react'
import Like from "./common/Like";
import { Link } from 'react-router-dom'

function MovieListTable(props) {
    const { movies, toggleLiked, deleteHandler, user } = props;
    return (
        <div>
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
                    {movies.map((movie) => {
                        return <tr key={movie._id}>
                            <th scope="row"><Link to={`/movies/${movie._id}`}>{movie.title} </Link></th>
                            <td>  {movie.genre.name}  </td>
                            <td>{movie.numberInStock}</td>
                            <td>{movie.dailyRentalRate}</td>
                            <td><Like toggleLiked={() => toggleLiked(movie)} liked={movie} /></td>

                            {user && user.isAdmin && <td><button onClick={() => deleteHandler(movie)} className="btn btn-danger btn-sm">Delete</button> </td>}
                        </tr>
                    })}


                </tbody>
            </table>
        </div>
    )
}

export default MovieListTable
