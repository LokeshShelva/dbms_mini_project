import { useEffect, useState } from "react";
import { Button, TextField, Typography } from '@mui/material';
import axios from "axios";
import "./StudentHome.css";
import { width } from "@mui/system";

function StudentHome({ userId }) {

    // useEffect(
    //     () => {
    //         axios.get(`/api/student/userId/${userId}`).then((val) => console.log(val.data))
    //     }, [])

    return (
        <div>
            <div className="titleContainer">
                <Typography variant="h3" className="title" color="primary">STUDENT DASHBOARD</Typography>
            </div>
            <div class="content">
                <div class="contentLeft">
                    <div className="studentCard">
                        <Typography variant="h5" color="primary"  className ="name">Lokesh Selva</Typography>
                        <Typography variant="subtitle1" fontWeight="500" color="primary" className="name">CS19B1034</Typography>
                    </div>
                    <div className="studentDetail">
                        <Typography variant="subtitle2" color="primary" className="question">DOB:<span className="answer">10.10.2001</span></Typography>
                        <Typography variant="subtitle2" color="primary" className="question">Address:<span className="answer">16, Vettaikaran street,Thalatheru Karaikal</span></Typography>
                        <Typography variant="subtitle2" color="primary" className="question">Blood Group:<span className="answer">O+ve</span></Typography>
                        <Typography variant="subtitle2" color="primary" className="question">Contact:<span className="answer">9874563210</span></Typography>
                        <Typography variant="subtitle2" color="primary" className="question">DOB:<span className="answer">10.10.2001</span></Typography>
                    </div>
                </div>
                <div className="contentRight">

                </div>
            </div>
        </div>
        // <div style={{"width": "100%", "height": "100%", "display": "flex", "justifyContent": "center"}}>
        //     <Typography variant="h3" className="title" color="primary">STUDENT DASHBOARD</Typography>
        // </div>        
    )
}

export default StudentHome;