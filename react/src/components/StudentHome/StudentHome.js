import React, { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { tableCellClasses } from "@mui/material";
import { Table, TableBody, TableCell, TableHead, TableRow, styled, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import "./StudentHome.css";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

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
        <Table sx={{ width: 800 }} className="box-shadow">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell>Subject</StyledTableCell>
              <StyledTableCell>Score</StyledTableCell>
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



export default function StudentHome({ user }) {

  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedExam, setSelectedExam] = useState(null);

  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [bloodgroup, setBloodgroup] = useState("");
  const [id, setId] = useState();
  const [parent, setParent] = useState("");
  const [no, setNo] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [contact, setContact] = useState();

  const [exams, setExams] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [results, setResults] = useState([]);

  const navigate = useNavigate();


  useEffect(() => {
    axios.get('api/general/exam').then((val) => setExams(val.data))
    axios.get('api/general/academic_year').then((val) => setAcademicYears(val.data))
  }, []);

  const toSentanceCase = (string) => {
    return string[0].toUpperCase() + string.substring(1, string.length);
  }

  const onLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  const fetchStudents = () => {
    axios.get(`api/student/${id}/result?${selectedYear != null ? `academic_year_id=${selectedYear.id}` : ''}${selectedExam != null ? `&exam_id=${selectedExam.id}` : ''}`).then(
      (val) => {
        setResults(val.data.map(
          (res) => {
            res['subject'] = toSentanceCase(res.subject);
            return res;
          }
        ))
      }
    ))
  }
    )
}


// const [scoreP, setScoreP] = useState();
// const [scoreC, setScoreC] = useState();
// const [scoreM, setScoreM] = useState();
// const [scoreB, setScoreB] = useState();
// const [scoreE, setScoreE] = useState();

// const [gradeP, setGradeP] = useState("");
// const [gradeC, setGradeC] = useState("");
// const [gradeM, setGradeM] = useState("");
// const [gradeB, setGradeB] = useState("");
// const [gradeE, setGradeE] = useState("");


useEffect(
  () => {
    if (user !== undefined) {
      axios.get(`/api/student/user_id/${user.id}`).then((val) => {
        setName(val.data[0].name);
        setDob(formatDate(val.data[0].dob));
        setBloodgroup(val.data[0].blood_group);
        setId(val.data[0].id);
        setNo(val.data[0].house_no);
        setStreet(val.data[0].street_name);
        setCity(val.data[0].city);
        setState(val.data[0].state);
        // axios.get(`/api/student/${id}/parents`).then((res) => {
        //   setParent(res.data[0].name);
        //   setContact(res.data[0].phone);
        // })
      })
    }
  }, [user])

// useEffect(
//   () => {
//       if(user !== undefined){
//         axios.get(`/api/student/user_id/${user.id}/result?`).then((val) => {
//             val.data.map((datas)=>{
//               if(datas.exam==="First-Quarterly"){
//                   let subjectName = datas.subject;
//                   switch(subjectName) { 
//                     case "physics":
//                       setScoreP(datas.score);
//                       setGradeP(datas.grade);
//                       break;
//                     case "chemistry":
//                       setScoreC(datas.score);
//                       setGradeC(datas.grade);
//                       break;
//                     case "maths":
//                       setScoreM(datas.score);
//                       setGradeM(datas.grade);
//                       break;
//                     case "biology":
//                       setScoreB(datas.score);
//                       setGradeB(datas.grade);
//                       break;
//                     case "english":
//                       setScoreE(datas.score);
//                       setGradeE(datas.grade);
//                       break;
//                     default:
//                       break;
//                   }                        
//               }
//             })
//           })
//     }
//   }, [user])


const formatDate = (date) => {
  const d = new Date(parseFloat(date))
  return `${d.getUTCDate()}/${d.getUTCMonth()}/${d.getUTCFullYear()}`
}

//   const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     [`&.${tableCellClasses.head}`]: {
//         backgroundColor: "#E0EBFF",
//         color: "#256EFF",
//         fontSize: 16,
//     },
//     [`&.${tableCellClasses.body}`]: {
//         fontSize: 16,
//     },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     '&:nth-of-type(odd)': {
//         backgroundColor: "rgba(0,0,0,0.04)",
//     },
//     '&:nth-of-type(even)': {
//         backgroundColor: "#ffffff",
//     },
// }));

// function createData(no, subject, score, grade) {
//   return { no, subject, score, grade};
// }

// const rows = [
//   createData(1,'Physics',scoreP,gradeP),
//   createData(2,'Chemistry',scoreC,gradeC),
//   createData(3,'Maths',scoreM,gradeM),
//   createData(4,'Biology',scoreB,gradeB),
//   createData(5,'English',scoreE,gradeE),
// ];

return (
  <div>
    <div className="titleContainer">
      <Typography variant="h3" className="title" color="primary">
        STUDENT DASHBOARD
      </Typography>
    </div>
    <div class="content">
      <div class="contentLeft">
        <div className="studentCard">
          <Typography variant="h6" color="primary" className="name">
            {name}
          </Typography>
        </div>
        <div className="studentDetail">
          <Typography
            variant="subtitle2"
            color="primary"
            className="question"
          >
            DOB:<span className="answer">{dob}</span>
          </Typography>
          {/* <Typography
              variant="subtitle2"
              color="primary"
              className="question"
            >
              Parent's Name:<span className="answer">{parent}</span>
            </Typography> */}
          <Typography
            variant="subtitle2"
            color="primary"
            className="question"
          >
            Address:
            <span className="answer">
              {no}, {street}, {city}, {state}
            </span>
          </Typography>
          <Typography
            variant="subtitle2"
            color="primary"
            className="question"
          >
            Blood Group:<span className="answer">{bloodgroup}</span>
          </Typography>
          {/* <Typography
              variant="subtitle2"
              color="primary"
              className="question"
            >
              Contact:<span className="answer">{contact}</span>
            </Typography>
            </div>
          <Button variant="contained" onClick={onLogout}>LOGOUT</Button>
        </div>
        <div className="contentRight">
          <div className="dropSelect">
            <Box sx={{ width: "20%" }}>
              <FormControl style={{ "width": "50%" }}>
                <InputLabel>Year</InputLabel>
                <Select label="Year" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                  {academicYears.map((year, i) => {
                    return <MenuItem value={year} key={1}>{year.academic_year}</MenuItem>
                  })
                  }
                  {/* return (
                                        <MenuItem value={2020}>2020</MenuItem>
                                        <MenuItem value={2021}>2021</MenuItem>
                                    ) */}
        </Select>
      </FormControl>
    </Box>
    <Box sx={{ width: "35%" }}>
      <FormControl style={{ "width": "50%" }}>
        <InputLabel>Exam</InputLabel>
        <Select label="exam" value={selectedExam} onChange={(e) => setSelectedExam(e.target.value)}>
          {exams.map(
            (exam) => {
              return (
                <MenuItem value={exam} key={exam.id}>{exam.exam}</MenuItem>
              )
            }
          )}
          {/* return (
                                        <MenuItem value="First Quaterly">First Quaterly</MenuItem>
                                        <MenuItem value="Mid Term">Mid-Term</MenuItem>
                                        <MenuItem value="Second Quaterly">Second Quaterly</MenuItem>
                                        <MenuItem value="End Term">End-Term</MenuItem>
                                    ) */}
        </Select>
      </FormControl>
    </Box>
    <div className="student-admin-btn">
      <Button className="resultButton" variant="outlined" onClick={fetchStudents}>Get Result</Button>
    </div>
  </div>
          {/* <div className="student-table">
            <TableContainer className="student-tableContainer"  component={Paper}>
                <Table sx={{width: 800}} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>NO</StyledTableCell>
                      <StyledTableCell align="center">SUBJECT</StyledTableCell>
                      <StyledTableCell align="center">SCORE</StyledTableCell>
                      <StyledTableCell align="center">GRADE</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <StyledTableRow key={row.no}>
                        <StyledTableCell component="th" scope="no">
                          {row.no}
                        </StyledTableCell>
                        <StyledTableCell align="center">{row.subject}</StyledTableCell>
                        <StyledTableCell align="center">{row.score}</StyledTableCell>
                        <StyledTableCell align="center">{row.grade}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
            </TableContainer>
            </div> */}
<ResultTable results={results}></ResultTable>
        </div >
      </div >
    </div >
  );
}
