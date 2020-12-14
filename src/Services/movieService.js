import http from '../Services/http';
const endPoint = 'http://localhost:8000/api/movies';
export function getMovies() {
    return http.get(endPoint);
}
export async function getMovie(id) {
    const { data } = await http.get(endPoint);

    return data.find(m => m._id === id);
}
export async function deleteMovie(id) {
    const result = await http.delete(`${endPoint}/${id}`);
    return result;
}