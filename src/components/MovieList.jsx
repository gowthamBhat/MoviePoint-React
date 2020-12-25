import React, { Component } from 'react'
import { getMovies, deleteMovie } from '../Services/movieService';
import { toast } from 'react-toastify';

import Paggination from "./common/Paggination"
import { paginate } from './utitls/paginate';
import { getGenres } from '../Services/genreService';
import ListGroup from './common/ListGroup';
import MovieListTable from './MovieListTable';
import SearchBox from './SearchBox';
import { Link } from 'react-router-dom';


class MovieList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            movie: [],
            genres: [],
            currentPage: 1,
            pageSize: 5,
            selectedGenre: null,
            searchQuery: ""
        }
    }
    async componentDidMount() {
        const { data } = await getGenres();
        var genres = [{ _id: "", name: "All genres" }, ...data];
        let movie = await getMovies();
        movie = movie.data

        this.setState({ genres, movie })
    }
    deleteHandler = async (movies) => {
        const previousMovieState = this.state.movie;
        const movie = this.state.movie.filter((x) => x._id !== movies._id) //filtering the movie except the one that clicked delete button
        this.setState({ movie: movie });
        try {
            await deleteMovie(movies._id);
        } catch (e) {

            toast.error('Something went wrong while Deleting Movie');
            this.setState({ movie: previousMovieState });
        }



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
        //There is no Like route for making this happen in backend
        //it's a future feature to develop
    }
    pageNumberClickHandler = page => {
        this.setState({ currentPage: page })
    }
    onGenreClick = (genre) => {
        this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" })
    }
    onSearch = (e) => {
        const { movie } = this.state
        let filteredNames = movie.filter((x) => {
            const list = x.title.toLowerCase();
            let typedWord = e.currentTarget.value
            typedWord = typedWord.toLowerCase();
            return list.match(typedWord);
        });
        //  filteredNames;
        this.setState({ searchQuery: filteredNames, currentPage: 1, selectedGenre: null });

    }



    render() {
        const { user } = this.props;
        const { movie, currentPage, pageSize, selectedGenre, searchQuery } = this.state;
        if (movie.length === 0)
            return (<React.Fragment>
                <h5 style={{ textAlign: 'center' }}>There Are No Movies In The List</h5>
                <br />
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" style={{ width: "3rem", height: "3rem" }} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>

            </React.Fragment>)


        //const allGenreFilter = movie.filter(x => x.genre._id === selectedGenre._id) function return the list of movies accroding to the user onClick event on the Genre List

        let filter = movie;
        if (searchQuery)
            filter = searchQuery;

        else if (selectedGenre && selectedGenre._id)
            filter = movie.filter(x => x.genre._id === selectedGenre._id)

        const movies = paginate(filter, currentPage, pageSize);



        return (
            <div>
                <SearchBox onSearch={this.onSearch} />

                <div className="row">
                    <div className="col-2" style={{ marginTop: "90px" }}>
                        <ListGroup
                            genres={this.state.genres}
                            onGenreClick={this.onGenreClick}
                            selectedGenre={this.state.selectedGenre}
                        />


                    </div>

                    <div className="col">
                        <h5> {filter.length} Movies in the database</h5>

                        {user && <Link
                            to={"/movies/new"}
                            className="btn btn-primary"
                            style={{ marginBottom: 20 }}
                        >
                            New Movie
                       </Link>}

                        <MovieListTable
                            movies={movies}
                            toggleLiked={this.toggleLiked}
                            deleteHandler={this.deleteHandler}
                            user={user}
                        />
                    </div>
                </div>
                <div className="row-2">
                    <Paggination
                        onClickPageNumber={this.pageNumberClickHandler}
                        itemCount={filter.length}
                        // itemCount={searchBox.length}
                        currentPage={currentPage}
                        pageSize={pageSize} />
                </div>


            </div>
        )

    }//  this.toggleLiked(movie) alli movie reference na pass madbodu
    /*showing the movie with map method, movie state should be a array to map over it */
}
export default MovieList