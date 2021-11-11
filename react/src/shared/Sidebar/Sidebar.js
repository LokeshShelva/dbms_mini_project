import { Button, Typography } from "@mui/material";
import { Person, Group, Article, Mode, MonetizationOn } from "@mui/icons-material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import './SidebarStyle.css';

function Sidebar({ role }) {
    const location = useLocation();
    const navigate = useNavigate();

    const navClick = (link) => {
        navigate(`/${link}`)
    }

    return (
        role !== "student" ?
            (<div className="sidebar-container">
                <div className="title">
                    <Typography variant="h5" color="primary">
                        SCHOOL MANAGEMENT SYSTEM
                    </Typography>
                </div>
                <nav>
                    {role === "admin" ? <div className={`nav-container ${location.pathname.includes('faculty') ? 'active' : ''}`} onClick={() => navClick('faculty')}>
                        <Person className="icon" />
                        <p className="nav-item">Faculty</p>
                    </div> : <></>}
                    <div className={`nav-container ${location.pathname.includes('students') ? 'active' : ''}`} onClick={() => navClick('students')}>
                        <Group className="icon" />
                        <p className="nav-item">Students</p>
                    </div>
                    <div className={`nav-container ${location.pathname.includes('result') ? 'active' : ''}`} onClick={() => navClick('result')}>
                        <Article className="icon" />
                        <p className="nav-item">Result</p>
                    </div>
                    <div className={`nav-container ${location.pathname.includes('attendance') ? 'active' : ''}`} onClick={() => navClick('attendance')}>
                        <Mode className="icon" />
                        <p className="nav-item">Attendance</p>
                    </div>
                    {role === "admin" ? <div className={`nav-container ${location.pathname.includes('fee') ? 'active' : ''}`} onClick={() => navClick('fee')}>
                        <MonetizationOn className="icon" />
                        <p className="nav-item">Fee</p>
                    </div> : <></>}
                </nav>
            </div>) : <></>
    )
}

export default Sidebar;