import http from '../Services/http';
const endPoint = 'http://localhost:8000/api/users';

export function register(user) {
    return http.post(endPoint, {
        name: user.name,
        email: user.email,
        password: user.password
    })
}