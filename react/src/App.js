import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FacultyPage from "./components/Admin/FacultyPage/FacultyPage";
import LoginPage from "./components/Login/LoginPage";
import StudentPage from "./components/Admin/StudentPage/StudentPage";
import AttendancePage from "./components/Admin/AttendancePage/AttendancePage";
// import ResultPage from "./components/Admin/ResultPage/ResultPage";
import AppPage from "./components/AppPage";
import checkToken from "./services/Utils";
import StudentHome from "./components/StudentHome/StudentHome";
// import TeacherResultPage from "./components/Teacher/ResultPage/TeacherResultPage";
import ResultPageRedirect from "./components/ResultPageRedirect";

const theme = createTheme({
    palette: {
        primary: {
            main: "#0052F5",
        }
    }
})
class App extends Component {

    constructor(props) {
        super(props);
        this.state = { token: "" }
    }

    componentDidMount() {
        this.setState({
            token: checkToken(),
        })
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <Routes>
                    {/* <Route exact path="/" element={<Home />} /> */}
                    <Route exact path="/" element={<AppPage role={this.state.token !== null ? this.state.token.role : null} />}>
                        <Route exact path="faculty" element={<FacultyPage role={this.state.token !== null ? this.state.token.role : null} />} />
                        <Route exact path="students" element={<StudentPage role={this.state.token !== null ? this.state.token.role : null} />} />
                        <Route exact path="attendance" element={<AttendancePage role={this.state.token !== null ? this.state.token.role : null} />} />
                        <Route exact path="result" element={<ResultPageRedirect user={this.state.token !== null ? this.state.token : null} />} />
                    </Route>
                    <Route exact path="/student_result" element={<StudentHome user={this.state.token} />} />

                    {/* <Route exact path="/students" element={<Home />} />
                    <Route exact path="/result" element={<Home />} />
                    <Route exact path="/fee" element={<Home />} />
                    <Route exact path="/attendance" element={<Home />} />*/}
                    <Route exact path="/login" element={<LoginPage />} />
                </Routes>
            </ThemeProvider>
        )
    }
}

export default App;