import { useEffect, useState } from "react";
import { styled, Button, tableCellClasses, FormControl, InputLabel, Select, MenuItem, Table, TableHead, TableRow, TableCell, TableBody, Typography } from "@mui/material";
import { Dialog, DialogTitle, Divider, DialogContent } from "@mui/material";
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

function StudentDetails({ student, onClose, open }) {
    return (
        <Dialog onClose={onClose} open={open} style={{ minWidth: "50%" }}>
            <DialogTitle>{student.name}</DialogTitle>
            <Divider />
            <DialogContent>
                <div className="grid-container">
                    <Typography variant="h6" className="center">Dob</Typography>
                    <Typography variant="subtitle1" className="center">{student.dob}</Typography>
                    <Typography variant="h6" className="center">Fees</Typography>
                    <Typography variant="subtitle1" className="center">Rs. {student.fee}</Typography>
                    <Typography variant="h6" className="center">Scholarship</Typography>
                    <Typography variant="subtitle1" className="center">RS. {student.scholarship}</Typography>
                    <Typography variant="h6" className="center">Blood Group</Typography>
                    <Typography variant="subtitle1" className="center">{student.blood_group}</Typography>
                    <Typography variant="h6" className="center">Admission date</Typography>
                    <div className="center">
                        <Typography variant="subtitle1">{student.admission_date}</Typography>
                        <br />
                    </div>
                    <Typography variant="h6">Address</Typography>
                    <div>
                        <Typography variant="subtitle1" className="center">{student.house_no},</Typography>
                        <Typography variant="subtitle1" className="center">{student.street_name},</Typography>
                        <Typography variant="subtitle1" className="center">{student.city},</Typography>
                        <Typography variant="subtitle1" className="center">{student.state}</Typography>
                        <br />
                    </div>
                    <Typography variant="h6">Parents</Typography>
                    <div>
                        {student.parents &&
                            student.parents.map(
                                (val) =>
                                    <>
                                        <Typography variant="subtitle1" className="center">{val.name}</Typography>
                                        <Typography variant="subtitle1" className="center">{val.occupation}</Typography>
                                        <Typography variant="subtitle1" className="center">{val.phone}</Typography>
                                        <Typography variant="subtitle1" className="center">{val.email}</Typography>
                                        <br />
                                    </>
                            )
                        }
                    </div>

                </div>
            </DialogContent>

        </Dialog>
    )
}

function StudentTable({ students }) {

    const [open, setOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState({});

    const formatDate = (date) => {
        let d = new Date(parseFloat(date)).toISOString();
        d = d.split('T')[0].split('-').reverse().join("/")
        return d;
    }

    const onDetail = (student_id) => {
        axios.get(`/api/student/${student_id}`).then(
            (val) => {
                axios.get(`/api/student/${val.data[0].id}/parents`).then(
                    (par) => {
                        val.data[0]['dob'] = formatDate(val.data[0].dob)
                        val.data[0]['admission_date'] = formatDate(val.data[0].admission_date);
                        setSelectedStudent({ ...val.data[0], parents: par.data })
                        setOpen(true);
                    }
                )
            }
        )
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        students && students.length !== 0 ? <div className="table-cont box-shadow">
            <div className="table-cont-inner">
                <Table className="box-shadow">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>No</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>DOB</StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {students && students.length !== 0 ?
                            students.map(
                                (val, index) =>
                                    <StyledTableRow key={index}>
                                        <StyledTableCell>{index + 1}</StyledTableCell>
                                        <StyledTableCell>{val.name}</StyledTableCell>
                                        <StyledTableCell>{formatDate(val.dob)}</StyledTableCell>
                                        <StyledTableCell><Button key={val.id} onClick={() => onDetail(val.id)}>details</Button></StyledTableCell>
                                    </StyledTableRow>
                            )
                            :
                            <> </>
                        }
                    </TableBody>
                    <StudentDetails open={open} onClose={handleClose} student={selectedStudent}></StudentDetails>
                </Table>
            </div>
        </div> :
            <div className="empty-state-container">
                <Typography variant="h5">
                    Select a Class and Section
                </Typography>
            </div>
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
    }, [selectedSection])

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