import { useEffect, useState } from "react";
import { styled, tableCellClasses, FormControl, InputLabel, Select, MenuItem, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { Navigate } from "react-router";
import checkToken from "../../../services/Utils";
import axios from "axios";
import "./StudentPageStyle.css";

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

function StudentTable({ students }) {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <StyledTableCell>No</StyledTableCell>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>DOB</StyledTableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {students &&
                    students.map(
                        (val, index) =>
                            <StyledTableRow key={index}>
                                <StyledTableCell>{index + 1}</StyledTableCell>
                                <StyledTableCell>{val.name}</StyledTableCell>
                                <StyledTableCell>{val.dob}</StyledTableCell>
                            </StyledTableRow>

                    )
                }
            </TableBody>
        </Table>
    )
}


function StudentPage() {
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);
    const [students, setSetudents] = useState([]);

    useEffect(() => {
        axios.get('/api/general/class').then((classes) => setClasses(classes.data))
    }, []);

    const selectClass = (cls) => {
        axios.get(`/api/general/section/${cls}`).then((val) => setSections(val.data))
    }

    useEffect(() => {
        if (selectedClass && selectedSection) {
            axios.get(`/api/student/class/${selectedClass}?section_id=${selectedSection.section_id}`).then((val) => setSetudents(val.data))
        }
    }, [, selectedSection])

    return (
        <div className="student-admin-container">
            <div className="student-admin-btn-container">
                <div className="student-admin-btn">
                    <FormControl>
                        <InputLabel id="student-admin-class">Class</InputLabel>
                        <Select labelId="student-admin-class" label="Class" value={selectedClass} onChange={(e) => { selectClass(e.target.value); setSelectedClass(e.target.value) }} color="primary">
                            {classes.map(
                                (cls, i) => {
                                    return (
                                        <MenuItem value={cls.class} key={i}>Class {cls.class}</MenuItem>
                                    )
                                }
                            )}
                        </Select>
                    </FormControl>
                </div>
                <div className="student-admin-btn">
                    <FormControl>
                        <InputLabel id="student-admin-section">Section</InputLabel>
                        <Select labelId="student-admin-section" label="Section" value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} color="primary">
                            {sections.map(
                                (sec) => {
                                    return (
                                        <MenuItem value={sec} key={sec.section_id}>Section {sec.section}</MenuItem>
                                    )
                                }
                            )}
                        </Select>
                    </FormControl>
                </div>
            </div>
            <StudentTable students={students}></StudentTable>
        </div>
    )
}

export default StudentPage;