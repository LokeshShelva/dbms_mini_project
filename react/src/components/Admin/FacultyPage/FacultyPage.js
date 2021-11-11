import { useEffect, useState } from "react";
import { Navigate } from "react-router";

function FacultyPage({ role }) {
    if (role === "teacher") {
        return <Navigate to="/students"></Navigate>
    }

    return (

        <h1>Hi</h1>
    )
}

export default FacultyPage;