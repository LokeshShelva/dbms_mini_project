import React from "react";
import { Navigate } from "react-router-dom";
import StudentHome from "./StudentHome/StudentHome";
import axios from "axios";
import jwt from 'jsonwebtoken';

function Home() {
    const [token, setToken] = React.useState("");
    const [loading, setLoading] = React.useState(true);

    const checkUser = () => {
        const token = localStorage.getItem('token');
        setToken(token);
        setLoading(false);
        console.log(jwt.decode(token))
    }

    React.useEffect(checkUser, [])

    return (
        !loading && (token == null || token === "null") ? <Navigate to="/login"></Navigate> : (
            token && jwt.decode(token).role == 'student' ? <StudentHome userId={jwt.decode(token).id}></StudentHome> : <div>Hi</div>
        )
    )
}

export default Home;
