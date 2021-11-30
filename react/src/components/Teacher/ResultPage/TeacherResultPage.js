import axios from "axios";
import { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, Button, TextField } from "@mui/material";
import { styled, tableCellClasses, Table, TableBody, TableRow, TableHead, TableCell, Typography } from "@mui/material";

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


function ResultTable({ results }) {
    return (
        results && results.length !== 0 ? <div className="table-cont">
            <div className="table-cont-inner">
                <Table className="box-shadow">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>No</StyledTableCell>
                            <StyledTableCell>Student</StyledTableCell>
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
                                        <StyledTableCell>{val.name}</StyledTableCell>
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

function AddResultTable({ class_id, subject, selectedExam, selectedYear, finished }) {
    const [students, setStudents] = useState([]);
    const [addedResult, setAddedResult] = useState({});

    useEffect(() => {
        axios.get(`/api/student/class_id/${class_id}`).then((val) => setStudents(val.data))
    }, [class_id])

    useEffect(() => {
        if (students.length != 0) {
            let tmp = {}
            students.forEach((stu) => {
                tmp[stu.id] = {
                    grade: "",
                    score: null
                }
            })
            setAddedResult(tmp);
        }
    }, [students])

    const setGrade = (id, grade) => {
        setAddedResult((prev) => {
            prev[id].grade = grade.toUpperCase();
            return prev;
        })
    }

    const setScore = (id, score) => {
        setAddedResult((prev) => {
            prev[id].score = parseInt(score);
            return prev;
        })
    }

    const Validite = () => {
        for (let res in addedResult) {
            if (addedResult[res].grade == "" || addedResult[res].score == null) {
                return false;
            }
        }
        return true;
    }

    const onSubmit = () => {
        if (Validite()) {
            let finisedResult = {
                academic_year_id: parseInt(selectedYear.id),
                exam_id: parseInt(selectedExam.id),
                subject_id: parseInt(subject.subject_id),
                data: addedResult
            };

            axios.post('/api/general/result', finisedResult).then(
                () => { finished() }
            )
        }
    }

    return (
        students && students.length != 0 ?
            <div className="table-cont">
                <div className="table-cont-inner">
                    <Table className="box-shadow">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>No</StyledTableCell>
                                <StyledTableCell>Student</StyledTableCell>
                                <StyledTableCell>Exam</StyledTableCell>
                                <StyledTableCell>Year</StyledTableCell>
                                <StyledTableCell>Score</StyledTableCell>
                                <StyledTableCell>Grade</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students && students.length !== 0 ?
                                students.map(
                                    (val, index) =>
                                        <StyledTableRow key={index}>
                                            <StyledTableCell>{index + 1}</StyledTableCell>
                                            <StyledTableCell>{val.name}</StyledTableCell>
                                            <StyledTableCell>{selectedExam.exam}</StyledTableCell>
                                            <StyledTableCell>{selectedYear.academic_year}</StyledTableCell>
                                            <StyledTableCell>
                                                <TextField label="Score" type="number" onChange={(e) => setScore(val.id, e.target.value)}></TextField>
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <TextField label="Grade" onChange={(e) => setGrade(val.id, e.target.value)}></TextField>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                )
                                : <> </>
                            }
                        </TableBody>
                    </Table>
                </div>
                <div className="btn-cont">
                    <Button onClick={onSubmit}>Save</Button>
                </div>
            </div>
            :
            <div className="empty-state-container">
                <Typography variant="h5">
                    Select data
                </Typography>
            </div>
    )
}


export default function TeacherResultPage({ user }) {
    const [allClasses, setAllClasses] = useState([]);
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [results, setResults] = useState([]);
    const [selectedExam, setSelectedExam] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [exams, setExams] = useState([]);
    const [academicYears, setAcademicYears] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [disabled, setDisabled] = useState(true);
    // const [classId, setClassId] = useState(null);

    useEffect(() => {
        if (user != null && classes.length == 0) {
            axios.get(`/api/faculty/user_id/${user.id}/class`).then((val) => setAllClasses(val.data))
            axios.get('api/general/exam').then((val) => setExams(val.data))
            axios.get('api/general/academic_year').then((val) => setAcademicYears(val.data))
        }
    }, [user])

    useEffect(() => {
        let cls = [];
        for (let c of allClasses) {
            if (!cls.includes(c.class)) {
                cls.push(c.class)
            }
        }
        setClasses(cls);
    }, [allClasses])

    useEffect(() => {
        let subject = allClasses.filter((val) => val.class == selectedClass && val.section == selectedSection)
        setSubjects(subject);
    }, [selectedSection])

    const selectClass = (cls) => {
        let cc = allClasses.filter((val) => val.class == cls);
        let filteredClass = [];
        for (let c of cc) {
            if (!filteredClass.includes(c.section)) {
                filteredClass.push(c.section)
            }
        }
        setSections(filteredClass);
    }

    const toSentanceCase = (str) => {
        return str[0].toUpperCase() + str.substring(1);
    }

    const fetchData = () => {
        let final;
        if (selectedClass && selectedSection && selectedSubject) {
            allClasses.forEach((val) => {
                if (val.class == selectedClass && val.section == selectedSection && val.subject == selectedSubject.subject) {
                    final = val;
                    return;
                }
            })
            if (final) {
                axios.get(`/api/general/result/${final.class_id}/${final.subject_id}?${selectedYear != null ? `academic_year_id=${selectedYear.id}` : ''}${selectedExam != null ? `&exam_id=${selectedExam.id}` : ''}`).then((val) => setResults(val.data))
            }
        }
    }

    const finished = () => {
        setIsEditing(false);
        fetchData();
    }

    useEffect(() => {
        if (selectedClass && selectedExam && selectedSection && selectedSubject && selectedYear) {
            setDisabled(false);
        }
    }, [selectedClass, selectedExam, selectedSection, selectedSubject, selectedYear])

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
                                        <MenuItem value={cls} key={i}>Class {cls}</MenuItem>
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
                                (sec, i) => {
                                    return (
                                        <MenuItem value={sec} key={i}>Section {sec}</MenuItem>
                                    )
                                }
                            )}
                        </Select>
                    </FormControl>
                </div>
                <div className="student-admin-btn">
                    <FormControl>
                        <InputLabel id="student-admin-section">Subject</InputLabel>
                        <Select labelId="student-admin-section" label="Section" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} color="primary">
                            {subjects.map(
                                (sec, i) => {
                                    return (
                                        <MenuItem value={sec} key={i}>{toSentanceCase(sec.subject)}</MenuItem>
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
                            {academicYears.map((year, i) => {
                                return <MenuItem value={year} key={1}>{year.academic_year}</MenuItem>
                            })
                            }
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
                    <Button variant="outlined" onClick={() => { fetchData(); setIsEditing(false) }}>Get Result</Button>
                </div>
                <div className="student-admin-btn">
                    <Button variant="outlined" disabled={disabled} onClick={() => setIsEditing(true)}>Add Result</Button>
                </div>
            </div>
            {
                isEditing ? <AddResultTable class_id={selectedSubject.class_id} finished={finished} subject={selectedSubject} selectedExam={selectedExam} selectedYear={selectedYear}></AddResultTable> :
                    <ResultTable results={results}></ResultTable>
            }
        </div>
    )
}