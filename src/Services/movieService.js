import http from '../Services/http';
const endPoint = 'http://localhost:8000/api/movies';
export function getMovies() {
    return http.get(endPoint);
}
export async function getMovie(id) {
    const { data } = await http.get(`${endPoint}/${id}`);
    console.log(data);

    return data;
    //data.find(m => m._id === id);
}
export async function deleteMovie(id) {
    const result = await http.delete(`${endPoint}/${id}`);
    return result;
}
export function saveMovie(movie) {
    if (movie._id) {
        const body = { ...movie };
        delete body._id;
        return http.put(`http://localhost:8000/api/movies/${movie._id}`, body);
    }
    return http.post('http://localhost:8000/api/movies/', movie);
}