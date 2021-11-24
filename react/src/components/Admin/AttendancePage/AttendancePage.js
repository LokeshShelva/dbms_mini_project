import axios from "axios";
import { useEffect, useState } from "react";
import { Select, MenuItem, FormControl, InputLabel, TextField, Button } from "@mui/material";
import { tableCellClasses, Table, TableBody, TableCell, TableHead, TableRow, styled, Typography } from '@mui/material';
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import enLocale from 'date-fns/locale/en-US';

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

function AttendanceTable({ attendance, students }) {

    return (
        attendance && attendance.length !== 0 && students && students.length != 0 ? <div className="table-cont box-shadow">
            <div className="table-cont-inner">
                <Table className="box-shadow">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>No</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Attendance</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        {students && students.length !== 0 ?
                            students.map(
                                (val, index) =>
                                    <StyledTableRow key={index}>
                                        <StyledTableCell>{index + 1}</StyledTableCell>
                                        <StyledTableCell>{val.name}</StyledTableCell>
                                        <StyledTableCell>{attendance.find((name) => {
                                            if (name.id == val.id) {
                                                return true
                                            }
                                            return false
                                        }) ? 'P' : "A"}</StyledTableCell>
                                    </StyledTableRow>
                            )
                            :
                            <> </>
                        }
                    </TableBody>
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

function AddAttendanceTable({ students, date, reload }) {
    const [newAttendance, setNewAttendance] = useState([]);

    useEffect(() => {
        if (students) {
            let currAttendance = []
            students.forEach((val) => {
                currAttendance.push(val.id)
            })
            setNewAttendance(currAttendance)
        }
    }, [])

    const setAttendance = (id) => {
        if (newAttendance.includes(id)) {
            let tmp = []
            newAttendance.forEach((val) => {
                if (val != id) {
                    tmp.push(val)
                }
            })
            setNewAttendance(tmp)
        } else {
            let tmp = []
            newAttendance.forEach((val) => tmp.push(val))
            tmp.push(id)
            setNewAttendance(tmp)
        }
    }

    const submit = () => {
        const attendance = []
        const d = new Date(date);
        newAttendance.forEach((val) => {
            attendance.push({
                student_id: val,
                date: Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())
            })
        })

        axios.post('/api/attendance/attendance', attendance).then((val) => {
            reload()
        })
    }

    return (
        newAttendance && newAttendance.length !== 0 && students && students.length != 0 ? <div className="table-cont box-shadow">
            <div className="table-cont-inner">
                <Table className="box-shadow">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>No</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Attendance</StyledTableCell>
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
                                        <StyledTableCell>{newAttendance.includes(val.id) ? 'P' : "A"}</StyledTableCell>
                                        <StyledTableCell>
                                            <Button variant="outlined" onClick={() => setAttendance(val.id)}>
                                                {
                                                    newAttendance.includes(val.id) ? "Set Absent" : "Set Present"
                                                }
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                            )
                            :
                            <> </>
                        }
                    </TableBody>
                </Table>
            </div>
            <Button onClick={submit}>Save</Button>
        </div> :
            <div className="empty-state-container">
                <Typography variant="h5">
                    Select a Class and Section
                </Typography>
            </div>
    )
}

export default function AttendancePage() {
    const [classes, setClasses] = useState([])
    const [sections, setSections] = useState([])
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [attendance, SetAttendance] = useState([]);
    const [students, setStudents] = useState([]);
    const [editAttendace, setEditAttendance] = useState(false);

    useEffect(() => {
        axios.get('/api/general/class').then((val) => setClasses(val.data))
    }, [])

    const selectClass = (cls) => {
        axios.get(`/api/general/section/${cls}`).then((val) => setSections(val.data))
    }

    // useEffect(() => {
    //     if (selectedClass && selectedSection && selectedDate) {
    //         let d = new Date(selectedDate).toISOString()
    //             .split('T')[0]
    //             .split('-')
    //             .reverse()
    //             .join('/');
    //         axios.get(`/api/student/class/${selectedClass}?section_id=${selectedSection.section_id}`).then((res) => {
    //             setStudents(res.data);
    //         })
    //         axios.get(`/api/attendance/${selectedClass}/section/${selectedSection.section_id}?date=${d}`).then((val) => SetAttendance(val.data))
    //     }
    // }, [selectedDate])

    const getAttendance = () => {
        if (selectedClass && selectedSection && selectedDate) {
            console.log(selectedDate.toUTCString())
            let d = new Date(selectedDate.toUTCString());
            axios.get(`/api/student/class/${selectedClass}?section_id=${selectedSection.section_id}`).then((res) => {
                setStudents(res.data);
            })
            axios.get(`/api/attendance/${selectedClass}/section/${selectedSection.section_id}?date=${Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())}`).then((val) => SetAttendance(val.data))
        }
    }

    const openEditAttendance = () => {
        axios.get(`/api/student/class/${selectedClass}?section_id=${selectedSection.section_id}`).then((res) => {
            setStudents(res.data);
            setEditAttendance(true)
        })
    }

    const reload = () => {
        setEditAttendance(false)
        getAttendance()

    }

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
                <div className="student-admin-btn">
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={enLocale} className="faculty-page-date-field">
                        <DatePicker
                            value={selectedDate}
                            onChange={(val) => setSelectedDate(val)}
                            label="Date"
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>
                <div className="student-admin-btn">
                    <Button variant="outlined" onClick={getAttendance}>Get Attendance</Button>
                </div>
                <div className="student-admin-btn">
                    <Button variant="outlined" onClick={openEditAttendance} disabled={!(selectedClass && selectedDate && selectedSection)}>Add Attendance</Button>
                </div>
            </div>
            {
                editAttendace ? <AddAttendanceTable students={students} date={selectedDate} reload={reload}></AddAttendanceTable> : <AttendanceTable students={students} attendance={attendance}></AttendanceTable>
            }
        </div>
    )
}