import http from '../Services/http';
const endPoint = 'http://localhost:8000/api/auth/';

export function logging(email, password) {
    return http.post(endPoint, {
        email, password
    })
}