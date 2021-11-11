import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import "./LoginStyles.css";
import { Navigate } from 'react-router';


function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [token, setToken] = useState("")

    const onsubmit = (e) => {
        if (email === "") {
            setEmailError("Email cannot be empty")
            return;
        }

        if (password === "") {
            setPasswordError("Password cannot be empty");
            return;
        }

        axios.post("/auth/login", JSON.stringify({ email, password }), { headers: { 'Content-type': 'application/json' } }).then((val) => {
            const res = val.data;
            if (res.errors) {
                res.errors.map((val) => {
                    if (val.includes("password")) {
                        setPasswordError(val);
                    } else {
                        setEmailError(val);
                    }
                })
            } else {
                localStorage.setItem('token', res.token)
                window.location.href = "/";
            }
        })
    }

    useEffect(() => setToken(localStorage.getItem('token')), [])

    return (
        <div className="login-container">
            {token !== null ?
                <Navigate to="/" />
                :
                <div className="inner">
                    <div>
                        <Typography variant="h5" className="title" color="primary">LOGIN</Typography>
                    </div>
                    <TextField error={emailError != "" ? true : false} helperText={emailError} className="mui-input" placeholder="Email" value={email} onChange={(e) => { setEmailError(""); setEmail(e.target.value) }}></TextField>
                    <TextField error={passwordError != "" ? true : false} helperText={passwordError} className="mui-input password" placeholder="Password" type="password" value={password} onChange={(e) => { setPasswordError(""); setPassword(e.target.value) }}></TextField>
                    <Button variant="contained" onClick={onsubmit}>LOGIN</Button>
                </div>
            }
        </div>
    )
}

export default LoginPage;