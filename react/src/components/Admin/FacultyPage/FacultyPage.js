import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { Table, TableBody, TableCell, TableHead, TableRow, styled, tableCellClasses, Button, CircularProgress } from "@mui/material";
import axios from "axios";
import "./FacultyPageStyles.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#E0EBFF",
        color: "#256EFF",
        fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: "rgba(0,0,0,0.04)",
    },
    '&:nth-of-type(even)': {
        backgroundColor: "#ffffff",
    },
    // hide last border
    // '&:last-child td, &:last-child th': {
    //     border: 0,
    // },
}));

function FacultyPage({ role }) {
    const [faculty, setFaculty] = useState([]);

    useEffect(() => {
        axios.get('/api/faculty/all?small=true').then(
            (val) => {
                const data = val.data.map(
                    (faculty) => {
                        let dob = faculty.dob.slice(0, 10).split("-").reverse().join(".");
                        faculty['dob'] = dob;
                        return faculty;
                    })
                setFaculty(data);
            }
        )
    }, [])

    if (role === "teacher") {
        return <Navigate to="/students"></Navigate>
    }

    return (
        <div className="container">
            <div className="inner-container">
                {faculty.length !== 0 ?
                    <>
                        <Table className="table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>No</StyledTableCell>
                                    <StyledTableCell>Name</StyledTableCell>
                                    <StyledTableCell>D.O.B</StyledTableCell>
                                    <StyledTableCell>Salary</StyledTableCell>
                                    <StyledTableCell></StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    faculty.map(
                                        (val) => {
                                            return (
                                                <StyledTableRow key={val.id}>
                                                    <StyledTableCell>{val.id}</StyledTableCell>
                                                    <StyledTableCell>{val.name}</StyledTableCell>
                                                    <StyledTableCell>{val.dob}</StyledTableCell>
                                                    <StyledTableCell>{val.salary}</StyledTableCell>
                                                    <StyledTableCell><Button>details</Button></StyledTableCell>
                                                </StyledTableRow>
                                            )
                                        }
                                    )
                                }
                            </TableBody>
                        </Table>
                        <Button className="faculty-btn" variant="contained">add faculty</Button>
                    </> :
                    <div style={{ "width": "fit-content", "margin": "auto" }}>
                        <CircularProgress />
                    </div>
                }

            </div>
        </div >
    )
}

export default FacultyPage;