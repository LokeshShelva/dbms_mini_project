import { Button, Typography } from "@mui/material";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import "./TopbarStyles.css"

export default function Topbar() {
    const match = useMatch(window.location.pathname);
    const navigate = useNavigate();

    const onLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');

    }

    return (
        <div className="top-container">
            <Typography variant="h3">{`${match.pathname.split('/')[1].substring(0, 1).toUpperCase()}${match.pathname.split('/')[1].substring(1, match.pathname.split('/')[1].length)}`}</Typography>
            <Button variant="outlined" className="btn" onClick={onLogout}>Logout</Button>
        </div>
    )
}