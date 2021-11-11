import jwt from "jsonwebtoken";

export default function checkToken() {
    const token = localStorage.getItem('token');

    if (token === null || token === "null") {
        return null;
    }

    return jwt.decode(token)
}