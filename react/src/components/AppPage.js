import { Outlet, Navigate } from "react-router-dom";
import FacultyPage from "./Admin/FacultyPage/FacultyPage";
import Sidebar from "../shared/Sidebar/Sidebar";
import Topbar from "../shared/Topbar/Topbar";
import { useEffect, useState } from "react";
import checkToken from "../services/Utils";
import "./AppStyles.css";

export default function AppPage({ role }) {
    const [token, setToken] = useState("");

    useEffect(() => setToken(checkToken()), [])

    if (role === "student") {
        return <Navigate to="/student_result"></Navigate>
    }

    return (
        <div className="outer">
            <div className="side">
                <Sidebar role={token !== null ? token.role : null}></Sidebar>
            </div>
            <div className="top">
                <Topbar></Topbar>
            </div>
            <Outlet />
        </div>
    )
}