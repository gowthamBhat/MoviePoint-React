// import React, { Component } from 'react'
import http from './http';

// class GenreService extends Component {
//     async componentDidMount() {
//         this.getGenre();
//     }
//     getGenre = async () => {
//         const { data } = await http.get('http://localhost:8000/api/genres');
//         return data;
//     }

// }

// export default GenreService;

// import http from './http';

// export default async function getGenre() {
//     const { data } = await http.get('http://localhost:8000/api/genres');
//     const result = await data.filter((x) => x);
//     return result;
// }
export function getGenres() {
    return http.get('http://localhost:8000/api/genres');
}

