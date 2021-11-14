import { useState, useEffect } from "react";
import { MenuItem, FormControl, InputLabel, Select, Button } from "@mui/material";
import { styled, tableCellClasses, Table, TableBody, TableRow, TableHead, TableCell, Typography } from "@mui/material";
import axios from "axios";

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

function ResultTable({ results }) {
    return (
        results && results.length !== 0 ? <div className="table-cont">
            <div className="table-cont-inner">
                <Table className="box-shadow">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>No</StyledTableCell>
                            <StyledTableCell>Subject</StyledTableCell>
                            <StyledTableCell>Score</StyledTableCell>
                            <StyledTableCell>Exam</StyledTableCell>
                            <StyledTableCell>Year</StyledTableCell>
                            <StyledTableCell align="center">Grade</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {results && results.length !== 0 ?
                            results.map(
                                (val, index) =>
                                    <StyledTableRow key={index}>
                                        <StyledTableCell>{index + 1}</StyledTableCell>
                                        <StyledTableCell>{val.subject}</StyledTableCell>
                                        <StyledTableCell>{val.score}</StyledTableCell>
                                        <StyledTableCell>{val.exam}</StyledTableCell>
                                        <StyledTableCell>{val.academic_year}</StyledTableCell>
                                        <StyledTableCell align="center">{val.grade}</StyledTableCell>
                                    </StyledTableRow>
                            )
                            : <> </>
                        }
                    </TableBody>
                </Table>
            </div>
        </div> :
            <div className="empty-state-container">
                <Typography variant="h5">
                    No Result
                </Typography>
            </div>
    )
}

export default function ResultPage() {
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [exams, setExams] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null)
    const [selectedExam, setSelectedExam] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [students, setSetudents] = useState([]);
    const [results, setResults] = useState([]);

    useEffect(() => {
        axios.get('/api/general/class').then((classes) => setClasses(classes.data))
        axios.get('api/general/exam').then((val) => setExams(val.data))
    }, []);

    const selectClass = (cls) => {
        axios.get(`/api/general/section/${cls}`).then((val) => setSections(val.data))
    }

    const toSentanceCase = (string) => {
        return string[0].toUpperCase() + string.substring(1, string.length);
    }

    useEffect(() => {
        if (selectedClass && selectedSection) {
            axios.get(`/api/student/class/${selectedClass}?section_id=${selectedSection.section_id}`).then((val) => setSetudents(val.data))
        }
    }, [selectedSection])

    const fetchStudents = () => {
        if (selectedClass && selectedSection && selectedStudent) {
            axios.get(`api/student/${selectedStudent.id}/result?${selectedYear != null ? `academic_year=${selectedYear}` : ''}${selectedExam != null ? `&exam_id=${selectedExam.id}` : ''}`).then(
                (val) => {
                    setResults(val.data.map(
                        (res) => {
                            res['subject'] = toSentanceCase(res.subject);
                            return res;
                        }
                    ))
                }
            )
        }
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
                    <FormControl>
                        <InputLabel id="student-admin-section">Student</InputLabel>
                        <Select labelId="student-admin-section" label="Student" value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} color="primary">
                            {students.map(
                                (stu) => {
                                    return (
                                        <MenuItem value={stu} key={stu.id}>{stu.name}</MenuItem>
                                    )
                                }
                            )}
                        </Select>
                    </FormControl>
                </div>
                <div className="student-admin-btn">
                    <FormControl>
                        <InputLabel id="student-admin-section">Academic year</InputLabel>
                        <Select labelId="student-admin-section" label="Academic year" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} color="primary">
                            <MenuItem value={2020} key={1}>2020</MenuItem>
                            <MenuItem value={2021} key={2}>2021</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="student-admin-btn">
                    <FormControl>
                        <InputLabel id="student-admin-section">Exam</InputLabel>
                        <Select labelId="student-admin-section" label="Exam" value={selectedExam} onChange={(e) => setSelectedExam(e.target.value)} color="primary">
                            {exams.map(
                                (exam) => {
                                    return (
                                        <MenuItem value={exam} key={exam.id}>{exam.exam}</MenuItem>
                                    )
                                }
                            )}
                        </Select>
                    </FormControl>
                </div>
                <div className="student-admin-btn">
                    <Button variant="outlined" onClick={fetchStudents}>Get Result</Button>
                </div>
            </div>
            <ResultTable results={results}></ResultTable>
        </div>
    )
}