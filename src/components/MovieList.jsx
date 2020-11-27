import React, { Component } from 'react'
import { getMovies } from '../Services/fakeMovieService'  //importing all the movies from the fake movie list

import Paggination from "../common/Paggination"
import { paginate } from '../utitls/paginate';
import { getGenres } from '../Services/fakeGenreService';
import ListGroup from './../common/ListGroup';
import MovieListTable from './MovieListTable';

class MovieList extends Component {
    constructor(props) {
        super(props)

        var genre = [{ _id: "77algen", name: "All genres" }, ...getGenres()];

        this.state = {
            movie: getMovies(),
            genres: genre,
            currentPage: 1,
            pageSize: 5,
            selectedGenre: ""
        }
    }
    deleteHandler = (movies) => {
        const movie = this.state.movie.filter((x) => x._id !== movies._id) //filtering the movie except the one that clicked delete button
        this.setState({ movie: movie });

    }
    toggleLiked = (likedMovie) => {

        //! this method is also valid but have to gone through a loop
        // let movie = this.state.movie.map((stateMovie) => {
        //     if (stateMovie === likedMovie)
        //         stateMovie.liked = !stateMovie.liked

        //     return stateMovie
        // })
        // this.setState({ movie }) 

        //! this is best for performance
        const movies = [...this.state.movie];
        const index = movies.indexOf(likedMovie);
        movies[index] = { ...movies[index] };
        movies[index].liked = !movies[index].liked;
        this.setState({ movie: movies });

    }
    pageNumberClickHandler = page => {
        this.setState({ currentPage: page })
    }
    onGenreClick = (genre) => {
        this.setState({ selectedGenre: genre, currentPage: 1 })
    }

    render() {
        const { movie, currentPage, pageSize, selectedGenre } = this.state;
        if (movie.length === 0)
            return (<h5>there are no movies in the list</h5>)


        const allGenreFilter = movie.filter((x) => {
            if (selectedGenre.name === "All genres")
                return x;
            return x.genre._id === selectedGenre._id;
        }) //function return the list of movies accroding to the user onClick event on the Genre List

        const filter = selectedGenre ? allGenreFilter : movie;
        const movies = paginate(filter, currentPage, pageSize);

        return (
            <div>
                <div className="row">
                    <div className="col-2" style={{ marginTop: "90px" }}>
                        <ListGroup
                            genres={this.state.genres}
                            onGenreClick={this.onGenreClick}
                            selectedGenre={this.state.selectedGenre} />
                    </div>
                    <div className="col">
                        <h5>There are {filter.length} in the database</h5>
                        <MovieListTable
                            movies={movies}
                            toggleLiked={this.toggleLiked}
                            deleteHandler={this.deleteHandler} />
                    </div>
                </div>


                <Paggination
                    onClickPageNumber={this.pageNumberClickHandler}
                    itemCount={filter.length}
                    currentPage={currentPage}
                    pageSize={pageSize} />
            </div>
        )

    }//  this.toggleLiked(movie) alli movie reference na pass madbodu
    /*showing the movie with map method, movie state should be a array to map over it */
}
export default MovieList