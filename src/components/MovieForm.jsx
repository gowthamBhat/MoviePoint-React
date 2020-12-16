// import React from 'react'
// import { getMovie } from './../Services/movieService';

// function MovieForm({ match, history }) {
//     const movieId = getMovie(match.params.id);
//     if (!movieId)
//         history.push('/notfound');

//     return (
//         <div>
//             <p>Movie ID {match.params.id}</p>
//             <button className="btn btn-primary" onClick={() => history.push('/movies')}>Go Back</button>
//         </div>
//     )
// }

// export default MovieForm

import React from "react";

import Form from "../components/common/form";
import Joi from "joi-browser";

import { getGenres } from "../Services/genreService";
import { getMovie, saveMovie } from "../Services/movieService";

class MovieForm extends Form {
    state = {
        genres: [],
        data: {
            title: "",
            genreId: "",
            numberInStock: "",
            dailyRentalRate: ""
        },
        errors: {}
    };

    async populateGenres() {
        const { data: genres } = await getGenres();
        this.setState({ genres });
    }

    async populateMovie() {
        try {
            const movieId = this.props.match.params.id;
            // console.log(movieId);

            if (movieId === "new") return;
            const movie = await getMovie(movieId);


            this.setState({ data: this.mapToViewModel(movie) });
        } catch (error) {
            if (error.response && error.response.status === 404) {
                this.props.history.replace("/notfound");
            }
        }
    }

    async componentDidMount() {
        await this.populateGenres();
        await this.populateMovie();
    }

    mapToViewModel = movie => {
        return {
            _id: movie._id,
            title: movie.title,
            genreId: movie.genre._id,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate
        };
    };

    schema = {
        _id: Joi.string(),
        title: Joi.string()
            .required()
            .label("Title"),
        genreId: Joi.string()
            .required()
            .label("Genre"),
        numberInStock: Joi.number()
            .required()
            .min(0)
            .max(100)
            .label("Number in stock"),
        dailyRentalRate: Joi.number()
            .required()
            .min(1)
            .max(100)
    };

    doSubmit = async () => {
        await saveMovie(this.state.data);

        this.props.history.push("/movies");
    };

    render() {
        return (
            <React.Fragment>
                <h1>Movie Form</h1>
                <div>
                    <form>
                        {this.renderInput("title", "Title")}
                        {this.renderListBox("genreId", "Genre", this.state.genres)}
                        {this.renderInput("numberInStock", "Number in Stock", "number")}
                        {this.renderInput("dailyRentalRate", "Rate", "number")}
                        {this.renderButton('Save')}
                    </form>
                </div>

                {/* <button
          onClick={() => this.doSubmit()}
          className="btn btn-primary btn-sm"
        >
          save
        </button> */}
            </React.Fragment>
        );
    }
}

export default MovieForm;

